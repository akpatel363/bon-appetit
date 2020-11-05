const express = require("express");
const Dish = require("../models/dish.model");
const {
  authMiddleware,
  restaurantMiddleware,
  userMiddleware,
} = require("../middleware");
const { getPageNumber } = require("../utils");

const router = express.Router();

router.get(
  "/search/:search",
  authMiddleware,
  userMiddleware,
  async (req, res) => {
    try {
      const p = getPageNumber(req.query.page);
      const regex = new RegExp(req.params.search, "i");
      const dishes = await Dish.find({ name: regex, city: req.user.city })
        .skip(p * 12)
        .limit(12)
        .populate({ path: "restaurant", select: "name" })
        .exec();
      res.json(dishes);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
);
router.get("/", authMiddleware, userMiddleware, async (req, res) => {
  try {
    const p = getPageNumber(req.query.page);
    const dishes = await Dish.find({ city: req.user.city })
      .skip(p * 12)
      .limit(12)
      .populate({ path: "restaurant", select: "name" })
      .exec();
    res.json(dishes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete(
  "/:id",
  authMiddleware,
  restaurantMiddleware,
  async (req, res) => {
    try {
      const did = req.params.id;
      const d = await Dish.deleteOne({
        _id: did,
        restaurant: req.restaurant._id,
      });
      res.json({ deleted: d.deletedCount == 1 ? true : false });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
);

router.post("/", authMiddleware, restaurantMiddleware, async (req, res) => {
  try {
    const dish = new Dish({
      ...req.body,
      restaurant: req.restaurant._id,
      city: req.restaurant.city,
    });
    await dish.save();
    res.json({ message: "Dish added to your restaurant." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
router.get("/our", authMiddleware, restaurantMiddleware, async (req, res) => {
  try {
    const p = req.query.page != undefined ? req.query.page - 1 : 0;
    const dishes = await Dish.find({ restaurant: req.restaurant._id })
      .skip(p * 12)
      .limit(12)
      .select("-restaurant -__v -city");
    res.json(dishes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
