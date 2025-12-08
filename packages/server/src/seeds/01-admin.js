/**
 * Seed Admin User
 * Run: node seeds/01-admin.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const {userModel} = require("../db/models/");
const passwordUtil = require("../utils/passwords");

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("📌 Connected to MongoDB");

    const adminEmail = "admin@example.com";

    // Check existed
    const existed = await userModel.findOne({ email: adminEmail });
    if (existed) {
      console.log("⚠️ Admin already exists.");
      process.exit(0);
    }

    const salt = await passwordUtil.GenerateSalt();
    const hashedPassword = await passwordUtil.GeneratePassword("Admin@123", salt);

    const admin = new userModel({
      fullname: "Super Admin",
      username: "admin",
      email: adminEmail,
      password: hashedPassword,
      salt,
      role: "admin",
      type: "system",
      avatar: "https://res.cloudinary.com/v-webdev/image/upload/v1661947123/v-chat-app/profile-user_p2khhu.png"
    });

    await admin.save();

    console.log("🎉 Admin account created successfully");
    console.log("👉 Email:", adminEmail);
    console.log("👉 Password: Admin@123");

    process.exit(0);

  } catch (error) {
    console.error("❌ Seed admin failed:", error);
    process.exit(1);
  }
}

seedAdmin();
