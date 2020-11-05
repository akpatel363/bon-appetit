const express = require("express");
const Order = require("../models/order.model");
const Dish = require("../models/dish.model");
const {
  authMiddleware,
  userMiddleware,
  restaurantMiddleware,
} = require("../middleware");
const { getPageNumber } = require("../utils");

const router = express.Router();

router.post("/place", authMiddleware, userMiddleware, async (req, res) => {
  try {
    const order = await Order.placeOrder(req.body, req.user);
    res.json({ orderPlaced: order });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
router.get("/user", authMiddleware, userMiddleware, async (req, res) => {
  try {
    const p = getPageNumber(req.query.page);
    const orders = await Order.find({ user: req.user._id })
      .skip(p * 12)
      .limit(12)
      .sort({ time: -1 })
      .populate({ path: "dishes.dish", select: "name price" })
      .select("-__v -user -dishes._id")
      .exec();
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
router.get(
  "/restaurant",
  authMiddleware,
  restaurantMiddleware,
  async (req, res) => {
    try {
      const p = getPageNumber(req.query.page);
      const dishes = await Dish.find({
        restaurant: req.restaurant._id,
      }).select("_id");
      const orders = await Order.find({
        "dishes.dish": { $in: dishes.map((e) => e._id) },
      })
        .skip(p * 12)
        .limit(12)
        .sort({ time: -1 })
        .populate({
          path: "dishes.dish",
          match: { restaurant: req.restaurant._id },
          select: "name price",
        })
        .populate({ path: "user", select: "name email" })
        .exec();
      res.json(orders);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
);
module.exports = router;
