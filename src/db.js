const mongoose = require("mongoose");
const mongoDB = process.env.MONGO_URI;

async function connect() {
  const conn = await mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  if (conn) console.log("Connected.");
  else console.log("Error Connecting.");
}
connect();
