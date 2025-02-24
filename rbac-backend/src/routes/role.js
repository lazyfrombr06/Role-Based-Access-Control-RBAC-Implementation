const express = require("express");
const User = require("../models/User");
const { authMiddleware, roleMiddleware } = require("../middleware/auth");

const router = express.Router();

// Assign Role (Admin only)
router.put("/assign-role", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
  const { userId, role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
