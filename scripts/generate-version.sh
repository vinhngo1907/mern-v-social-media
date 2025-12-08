#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output (moved to top)
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Add --dry-run flag support
DRY_RUN=false
if [[ "$1" == "--dry-run" ]]; then
    DRY_RUN=true
    print_info "Running in dry-run mode"
fi

# Get the current branch
CURRENT_BRANCH="${GITHUB_REF#refs/heads/}"

# If not running in GitHub Actions, get branch from git
if [[ -z "$CURRENT_BRANCH" || "$CURRENT_BRANCH" == "${GITHUB_REF}" ]]; then
    CURRENT_BRANCH=$(git branch --show-current)
fi

print_info "Current branch: $CURRENT_BRANCH"

# Determine environment suffix based on branch first
case "$CURRENT_BRANCH" in
    "production")
        ENVIRONMENT_TAG=""
        ENVIRONMENT_NAME="production"
        ;;
    "staging")
        ENVIRONMENT_TAG="-beta"
        ENVIRONMENT_NAME="beta"
        ;;
    "main")
        ENVIRONMENT_TAG="-alpha"
        ENVIRONMENT_NAME="alpha"
        ;;
    *)
        print_error "Unsupported branch: $CURRENT_BRANCH"
        exit 1
        ;;
esac

# Get the last tag for the current environment
if [[ -n "$ENVIRONMENT_TAG" ]]; then
    # For non-production branches, get the latest tag with the environment suffix
    LAST_TAG=$(git tag -l "*${ENVIRONMENT_TAG}" | sort -V | tail -1)
    if [[ -z "$LAST_TAG" ]]; then
        # If no environment-specific tag exists, get the latest production tag
        LAST_TAG=$(git tag -l "v[0-9]*.[0-9]*.[0-9]*" | grep -v -- "-" | sort -V | tail -1 || echo "v0.0.0")
    fi
else
    # For production, get the latest production tag (without suffix)
    LAST_TAG=$(git tag -l "v[0-9]*.[0-9]*.[0-9]*" | grep -v -- "-" | sort -V | tail -1 || echo "v0.0.0")
fi

if [[ -z "$LAST_TAG" ]]; then
    LAST_TAG="v0.0.0"
fi

print_info "Last tag for $ENVIRONMENT_NAME: $LAST_TAG"

# Get commits since last tag
if [[ "$LAST_TAG" == "v0.0.0" ]]; then
    # If no previous tags, get all commits
    COMMITS_SINCE_TAG=$(git log --oneline --format="%s" || echo "")
else
    # Get commits since last tag
    COMMITS_SINCE_TAG=$(git log "${LAST_TAG}..HEAD" --oneline --format="%s" || echo "")
fi

if [[ -z "$COMMITS_SINCE_TAG" ]]; then
    print_warn "No commits since last tag"
else
    print_info "Commits since last tag:"
    echo "$COMMITS_SINCE_TAG" | while read -r commit; do
        echo "  - $commit"
    done
fi

# Parse current version
CURRENT_VERSION=$(echo $LAST_TAG | sed 's/^v//')
if [[ ! $CURRENT_VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+(-.*)?$ ]]; then
    print_warn "Invalid version format, starting from 0.0.0"
    CURRENT_VERSION="0.0.0"
fi

# Extract base version (remove any pre-release suffix)
BASE_VERSION=$(echo $CURRENT_VERSION | sed 's/-.*$//')

# Split version into parts
IFS='.' read -r -a VERSION_PARTS <<< "$BASE_VERSION"
MAJOR=${VERSION_PARTS[0]}
MINOR=${VERSION_PARTS[1]}
PATCH=${VERSION_PARTS[2]}

print_info "Current version: $MAJOR.$MINOR.$PATCH"

# Initialize version bump flags
HAS_BREAKING_CHANGE=false
HAS_FEATURE=false
HAS_FIX=false

# Analyze commits for version bumps
if [[ -n "$COMMITS_SINCE_TAG" ]]; then
    print_info "Analyzing commits for version bumps..."

    # Check each commit
    while IFS= read -r commit; do
        if [[ -n "$commit" ]]; then
            print_info "Analyzing: $commit"

            # Check for breaking changes (BREAKING CHANGE in footer or ! after type)
            if [[ "$commit" =~ BREAKING\ CHANGE ]] || [[ "$commit" =~ ^[a-zA-Z]+.*!: ]]; then
                HAS_BREAKING_CHANGE=true
                print_info "  → Breaking change detected"
            # Check for features
            elif [[ "$commit" =~ ^feat ]]; then
                HAS_FEATURE=true
                print_info "  → Feature detected"
            # Check for fixes
            elif [[ "$commit" =~ ^fix ]]; then
                HAS_FIX=true
                print_info "  → Fix detected"
            # Check for performance improvements (should bump minor)
            elif [[ "$commit" =~ ^perf ]]; then
                HAS_FEATURE=true
                print_info "  → Performance improvement detected (treated as feature)"
            # Check for other types that might indicate changes
            elif [[ "$commit" =~ ^(build|ci|docs|style|refactor|test|chore) ]]; then
                print_info "  → Other change type detected: $commit"
            fi
        fi
    done <<< "$COMMITS_SINCE_TAG"
fi

# Debug output
print_info "Version bump analysis:"
print_info "  HAS_BREAKING_CHANGE: $HAS_BREAKING_CHANGE"
print_info "  HAS_FEATURE: $HAS_FEATURE"
print_info "  HAS_FIX: $HAS_FIX"

# Determine version bump
if [[ "$HAS_BREAKING_CHANGE" == "true" ]]; then
    MAJOR=$((MAJOR + 1))
    MINOR=0
    PATCH=0
    print_info "Bumping major version due to breaking change"
elif [[ "$HAS_FEATURE" == "true" ]]; then
    MINOR=$((MINOR + 1))
    PATCH=0
    print_info "Bumping minor version due to new feature"
elif [[ "$HAS_FIX" == "true" ]]; then
    PATCH=$((PATCH + 1))
    print_info "Bumping patch version due to fix"
else
    # For non-production branches, we might want to increment patch for any change
    if [[ "$CURRENT_BRANCH" != "production" && -n "$COMMITS_SINCE_TAG" ]]; then
        PATCH=$((PATCH + 1))
        print_info "Incrementing patch version for non-production branch with changes"
    else
        print_warn "No significant changes detected, keeping current version"

        # Check if we're trying to recreate an existing tag when there are no commits
        if [[ -z "$COMMITS_SINCE_TAG" ]]; then
            NEW_VERSION="${MAJOR}.${MINOR}.${PATCH}"
            FULL_VERSION="${NEW_VERSION}${ENVIRONMENT_TAG}"
            FULL_TAG="v${FULL_VERSION}"

            if git rev-parse "$FULL_TAG" >/dev/null 2>&1; then
                print_warn "No commits since last tag and tag $FULL_TAG already exists"
                print_info "Using existing version: $FULL_VERSION"

                # Output existing version info for GitHub Actions
                if [[ "${GITHUB_ACTIONS:-false}" == "true" ]]; then
                    echo "version=$FULL_VERSION" >> $GITHUB_OUTPUT
                    echo "tag=$FULL_TAG" >> $GITHUB_OUTPUT
                    echo "environment=$ENVIRONMENT_NAME" >> $GITHUB_OUTPUT
                    echo "major=$MAJOR" >> $GITHUB_OUTPUT
                    echo "minor=$MINOR" >> $GITHUB_OUTPUT
                    echo "patch=$PATCH" >> $GITHUB_OUTPUT
                fi

                print_info "Version generation completed successfully (no new changes)"
                exit 0
            fi
        fi
    fi
fi

NEW_VERSION="${MAJOR}.${MINOR}.${PATCH}"

FULL_VERSION="${NEW_VERSION}${ENVIRONMENT_TAG}"
FULL_TAG="v${FULL_VERSION}"

# Check if the tag already exists
if git rev-parse "$FULL_TAG" >/dev/null 2>&1; then
    print_warn "Tag $FULL_TAG already exists!"

    # For non-production branches, increment patch version if tag exists
    if [[ "$CURRENT_BRANCH" != "production" ]]; then
        print_info "Incrementing patch version to avoid conflict"
        PATCH=$((PATCH + 1))
        NEW_VERSION="${MAJOR}.${MINOR}.${PATCH}"
        FULL_VERSION="${NEW_VERSION}${ENVIRONMENT_TAG}"
        FULL_TAG="v${FULL_VERSION}"

        # Keep checking until we find an available version
        while git rev-parse "$FULL_TAG" >/dev/null 2>&1; do
            print_warn "Tag $FULL_TAG also exists, incrementing again"
            PATCH=$((PATCH + 1))
            NEW_VERSION="${MAJOR}.${MINOR}.${PATCH}"
            FULL_VERSION="${NEW_VERSION}${ENVIRONMENT_TAG}"
            FULL_TAG="v${FULL_VERSION}"
        done
    else
        print_error "Cannot create duplicate tag for production"
        exit 1
    fi
fi

print_info "Generated version: $FULL_VERSION"
print_info "Generated tag: $FULL_TAG"
print_info "Environment: $ENVIRONMENT_NAME"

# Output for GitHub Actions
if [[ "${GITHUB_ACTIONS:-false}" == "true" ]]; then
    echo "version=$FULL_VERSION" >> $GITHUB_OUTPUT
    echo "tag=$FULL_TAG" >> $GITHUB_OUTPUT
    echo "environment=$ENVIRONMENT_NAME" >> $GITHUB_OUTPUT
    echo "major=$MAJOR" >> $GITHUB_OUTPUT
    echo "minor=$MINOR" >> $GITHUB_OUTPUT
    echo "patch=$PATCH" >> $GITHUB_OUTPUT
fi

# Create and push tag for production releases
if [[ "$CURRENT_BRANCH" == "production" && "${GITHUB_ACTIONS:-false}" == "true" && "$DRY_RUN" == "false" ]]; then
    print_info "Creating and pushing production tag"
    git config user.name "github-actions[bot]"
    git config user.email "github-actions[bot]@users.noreply.github.com"

    # Create annotated tag with commit summary
    TAG_MESSAGE="Release $FULL_TAG

Changes since $LAST_TAG:
$COMMITS_SINCE_TAG"

    git tag -a "$FULL_TAG" -m "$TAG_MESSAGE"
    git push origin "$FULL_TAG"
    print_info "Tag $FULL_TAG created and pushed successfully"
elif [[ "$DRY_RUN" == "true" ]]; then
    print_info "DRY RUN: Would create tag $FULL_TAG for production"
fi

print_info "Version generation completed successfully"
