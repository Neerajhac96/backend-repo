// routes/protected.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const User = require("../models/User"); // User model

router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const users = await User.find({}, "name email"); // Sirf name & email fields
    
    res.json({
      msg: `Welcome ${req.user.name}!`,        // Greeting
      totalUsers: users.length,                // Total user count
      recentActivities: 3,                      // Example static
      users: users                              // Table ke liye data
    });
  } catch (err) {
    console.error("Dashboard API error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

