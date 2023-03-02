const mongoose = require("mongoose");
const url =
  "mongodb+srv://harrypotterface:20194371@cluster0.hvfzkdw.mongodb.net/BE-WORK?retryWrites=true&w=majority";
async function connectDB() {
  try {
    await mongoose
      .connect(url)
      .then(() => console.log("Connected to DB!"))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB
