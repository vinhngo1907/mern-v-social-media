# syntax=docker/dockerfile:1

# Base image configuration with fallback support
# Primary: docker.io/library/node:22.11-alpine (Docker Hub)
# Fallback: public.ecr.aws/docker/library/node:22.11-alpine (Amazon ECR Public Gallery)
# Override BASE_REGISTRY during build if Docker Hub is unavailable:
#   docker build --build-arg BASE_REGISTRY=public.ecr.aws/docker/library .
ARG BASE_REGISTRY=docker.io/library
ARG NODE_VERSION=22.11-alpine

# Stage 1: Dependencies
FROM ${BASE_REGISTRY}/node:${NODE_VERSION} AS deps
WORKDIR /app

# Install system dependencies in a single layer
RUN apk add --no-cache build-base dumb-init jq libc6-compat python3

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY prisma/schema.prisma ./prisma/schema.prisma
COPY prisma/schema.murror.prisma ./prisma/schema.murror.prisma

# Extract pnpm version and install dependencies with cache mounts
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/root/.pnpm-store \
    PNPM_VERSION=$(jq -r '.packageManager // "pnpm@latest"' package.json | sed 's/pnpm@//') && \
    npm install -g pnpm@${PNPM_VERSION} && \
    pnpm config set store-dir /root/.pnpm-store && \
    HUSKY=0 pnpm install --frozen-lockfile

# Stage 2: Builder
FROM ${BASE_REGISTRY}/node:${NODE_VERSION} AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./

# Copy source code (use .dockerignore to exclude unnecessary files)
COPY . .

ARG DATABASE_URL="file:./dev.db"
ARG MURROR_DATABASE_URL="file:./murror.db"
RUN npm run db:generate

# Build the application and clean up
RUN npm run build && \
    # Remove development files to reduce image size
    rm -rf src/ tsconfig*.json *.md .git* .env* && \
    # Keep only essential files
    find . -name "*.test.*" -delete && \
    find . -name "*.spec.*" -delete

# Stage 3: Production dependencies
# FROM ${BASE_REGISTRY}/node:${NODE_VERSION} AS prod-deps
# WORKDIR /app

# ENV NODE_ENV=production PORT=3000

# RUN apk add --no-cache build-base jq python3

# COPY package.json pnpm-lock.yaml ./

# Install only production dependencies with cache mounts
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/root/.pnpm-store \
    PNPM_VERSION=$(jq -r '.packageManager // "pnpm@latest"' package.json | sed 's/pnpm@//') && \
    npm install -g pnpm@${PNPM_VERSION} && \
    pnpm config set store-dir /root/.pnpm-store && \
    HUSKY=0 pnpm install --prod --frozen-lockfile

# Stage 4: Final runner
FROM ${BASE_REGISTRY}/node:${NODE_VERSION} AS runner
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S murror && \
    adduser -S be -u 1001 -G murror && \
    apk add --no-cache dumb-init

# Set environment variables
ENV NODE_ENV=production \
    PORT=3000 \
    NODE_OPTIONS="--max-old-space-size=1024"

# Copy production dependencies
COPY --from=prod-deps --chown=be:murror /app/node_modules ./node_modules
COPY --from=prod-deps --chown=be:murror /app/package.json ./

# Copy built application
COPY --from=builder --chown=be:murror /app/dist ./dist
# COPY --from=builder --chown=be:murror /app/node_modules/@prisma/client ./node_modules/@prisma/client
# COPY --from=builder --chown=be:murror /app/node_modules/.prisma/client ./node_modules/.prisma/client
# COPY --from=builder --chown=be:murror /app/node_modules/.pnpm/@prisma+client@6.10.1_prisma@6.10.1_typescript@5.8.3__typescript@5.8.3/node_modules/ ./node_modules/.pnpm/@prisma+client@6.10.1_prisma@6.10.1_typescript@5.8.3__typescript@5.8.3/node_modules/

# Switch to non-root user
USER be

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5001/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Expose port
EXPOSE 3000

# Use dumb-init as PID 1 for proper signal handling
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "dist/src/main.js"]
