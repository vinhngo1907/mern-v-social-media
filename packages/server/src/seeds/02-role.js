/**
 * Seed Roles & Capacities
 * Run: node seeds/02-role.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const {userModel, capacitiesModel, roleModel} = require("../db/models");

async function seedRoles() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("📌 Connected to MongoDB");

        // ========= CAPACITIES SEED ==========
        const capacitiesData = [
            { name: "Create User", slug: "create-user" },
            { name: "Edit User", slug: "edit-user" },
            { name: "Delete User", slug: "delete-user" },
            { name: "View User", slug: "view-user" },

            { name: "Create Role", slug: "create-role" },
            { name: "Edit Role", slug: "edit-role" },
            { name: "Delete Role", slug: "delete-role" },
            { name: "View Role", slug: "view-role" },

            { name: "Create Post", slug: "create-post" },
            { name: "Edit Post", slug: "edit-post" },
            { name: "Delete Post", slug: "delete-post" },
            { name: "View Post", slug: "view-post" }
        ];

        // Clear old data
        await capacitiesModel.deleteMany({});
        console.log("🧹 Cleared existing capacities");

        const capacities = await capacitiesModel.insertMany(capacitiesData);
        console.log(`✅ Inserted ${capacities.length} capacities`);

        // ========= ROLE SEED ==========
        await roleModel.deleteMany({});
        console.log("🧹 Cleared existing roles");

        const adminRole = await roleModel.create({
            name: "Administrator",
            slug: "admin",
            capacities: capacities.map(c => c._id),
            createdBy: "system"
        });

        await roleModel.create({
            name: "User",
            slug: "user",
            capacities: capacities
                .filter(c => ["view-user", "view-post", "create-post"].includes(c.slug))
                .map(c => c._id),
            createdBy: "system"
        });

        console.log("🎉 Roles created successfully");

        // ========= ASSIGN ADMIN ROLE ==========
        const adminUser = await userModel.findOne({ email: "admin@example.com" });

        if (adminUser) {
            adminUser.roles = [adminRole._id];
            adminUser.root = "admin";
            await adminUser.save();

            console.log("👑 Admin role assigned to admin@example.com");
        } else {
            console.log("⚠️ Admin user not found. Run 01-admin.js first!");
        }

        console.log("🎉 Seed completed successfully!");
        process.exit(0);

    } catch (error) {
        console.error("❌ Seed failed:", error);
        process.exit(1);
    }
}

seedRoles();
