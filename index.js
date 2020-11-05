const express = require("express");
const cors = require("cors");
require("./src/db");
const userRouter = require("./src/routers/user.router");
const restaurantRouter = require("./src/routers/restaurant.router");
const dishRouter = require("./src/routers/dish.router");
const orderRouter = require("./src/routers/order.router");

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/restaurant", restaurantRouter);
app.use("/order", orderRouter);
app.use("/dish", dishRouter);

app.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
