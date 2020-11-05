const jsonwebtoken = require("jsonwebtoken");
const User = require("./models/user.model");
const Restaurant = require("./models/restaurant.model");
const secret = process.env.SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) throw new Error();
    req._id = jsonwebtoken.decode(token, secret)._id;
    return next();
  } catch (e) {
    res.status(401).json({ error: "Unauthorized Request." });
  }
};
const userMiddleware = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req._id });
    if (user == null) throw new Error();
    req.user = user;
    return next();
  } catch (e) {
    res.status(401).json({ error: "Unauthorized Request." });
  }
};
const restaurantMiddleware = async (req, res, next) => {
  try {
    const rest = await Restaurant.findOne({ _id: req._id });
    if (rest == null) throw new Error();
    req.restaurant = rest;
    return next();
  } catch (e) {
    res.status(401).json({ error: "Unauthorized Request." });
  }
};

module.exports = { authMiddleware, userMiddleware, restaurantMiddleware };
