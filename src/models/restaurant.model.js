const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const secret = process.env.SECRET;
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
    minlength: 10,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  owner: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

restaurantSchema.virtual("dishes", {
  ref: "Dish",
  localField: "_id",
  foreignField: "restaurant",
});

restaurantSchema.statics.checkCredentials = async (email, password) => {
  try {
    const res = await Restaurant.findOne({ email });
    if (res != null) {
      const r = await bcryptjs.compare(password, res.password);
      return r ? res : null;
    }
    return null;
  } catch (e) {
    return null;
  }
};

restaurantSchema.methods.toJSON = function () {
  const res = this.toObject();
  delete res.password;
  delete res.__v;
  return res;
};
restaurantSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 8);
  }
  next();
});

restaurantSchema.methods.getJWT = function () {
  const token = jsonwebtoken.sign({ _id: this._id }, secret);
  return token;
};

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
