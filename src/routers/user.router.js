const express = require("express");
const User = require("../models/user.model");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.checkCredentials(req.body.email, req.body.password);
    if (user != null) {
      return res.json({ user, token: user.getJWT() });
    }
    res.status(400).json({ error: "Wrong email or password." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ user, token: user.getJWT() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
