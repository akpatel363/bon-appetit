const mongoose = require("mongoose");
const Dish = require("./dish.model");

const orderSchema = new mongoose.Schema({
  dishes: [
    {
      dish: {
        type: mongoose.Types.ObjectId,
        ref: "Dish",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

orderSchema.statics.placeOrder = async (body, user) => {
  if (!body.dishes) throw new Error("No dishes selected");
  const time = new Date();
  var total = 0;
  const d = body.dishes.map((e) => e.dish);
  const dishes = await Dish.find({ _id: { $in: d } }).select("price");
  if (dishes.length != body.dishes.length) throw new Error("Invalid Dish");
  dishes.forEach((d) => {
    const ind = body.dishes.findIndex((e) => e.dish == d._id);
    body.dishes[ind].price = d.price;
    total += d.price * body.dishes[ind].quantity;
  });
  const order = new Order({ ...body, user: user._id, time, total });
  await order.save();
  return true;
};

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
