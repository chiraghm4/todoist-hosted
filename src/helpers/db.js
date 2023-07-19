const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL

const connectDB = async () => {
  const conn = await mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log(`Connected To Mongodb Database`);
    })
    .catch((err) => {
      console.log(`Error in Mongodb ${err}`);
    });
};

module.exports = connectDB;