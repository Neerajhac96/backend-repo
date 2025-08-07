const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware"); // Step 1 ka code

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ msg:`Welcome to your dashboard, userId: ${req.user.userId}` });
});

module.exports = router;
