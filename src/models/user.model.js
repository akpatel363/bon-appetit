const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const secret = process.env.SECRET;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
});

userSchema.statics.checkCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (user != null) {
      const res = await bcryptjs.compare(password, user.password);
      return res ? user : null;
    }
    return null;
  } catch (e) {
    return null;
  }
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 8);
  }
  next();
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user._id;
  return user;
};

userSchema.methods.getJWT = function () {
  const token = jsonwebtoken.sign({ _id: this._id }, secret);
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
