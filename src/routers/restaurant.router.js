const express = require("express");
const Restaurant = require("../models/restaurant.model");
const Dish = require("../models/dish.model");
const { authMiddleware, userMiddleware } = require("../middleware");
const { getPageNumber } = require("../utils");

const router = express.Router();

router.get("/", authMiddleware, userMiddleware, async (req, res) => {
  try {
    const p = getPageNumber(req.query.page);
    const rests = await Restaurant.find({ city: req.user.city })
      .skip(p * 12)
      .limit(12)
      .select("name address");
    res.json(rests);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const restaurant = await Restaurant.checkCredentials(
      req.body.email,
      req.body.password
    );
    if (restaurant != null) {
      return res.json({
        restaurant: { ...restaurant.toJSON(), isRestaurant: true },
        token: restaurant.getJWT(),
      });
    }
    res.status(400).json({ error: "Wrong username or password." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.json({
      restaurant: { ...restaurant.toJSON(), isRestaurant: true },
      token: restaurant.getJWT(),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/:id", authMiddleware, userMiddleware, async (req, res) => {
  try {
    const _id = req.params?.id;
    const restaurant = await Restaurant.findOne({
      _id,
      city: req.user.city,
    }).select("name email contact address owner");
    if (restaurant != null) {
      const dishes = await Dish.find({ restaurant: restaurant._id })
        .populate({ path: "restaurant", select: "name" })
        .exec();
      return res.json({ restaurant, dishes });
    }
    res.status(404).json({ error: "No Match Found." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
