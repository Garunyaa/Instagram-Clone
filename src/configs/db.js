const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () =>
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connected Successfully");
    })
    .catch((error) => {
      console.log("Connection failed", error);
    });

module.exports = connectDB;
