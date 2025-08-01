const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // ✅ Corrected here
require("dotenv").config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const email = "test@gmail.com";
    const password = "test123";

    const exists = await User.findOne({ email });
    if (exists) {
      console.log("⚠️ User already exists.");
      process.exit();
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({
      name: "Test User",
      email,
      password: hashed,
    });

    console.log("✅ Test user created:", email, "/", password);
    process.exit();
  } catch (err) {
    console.error("Error seeding user:", err);
    process.exit(1);
  }
})();
