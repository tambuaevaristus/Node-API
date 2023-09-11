const fs = require("fs");
const mongoose = require("mongoose");
const Tour = require("./../../model/tourModel");
const port = 8000;


mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://evaristustambua:Evaevaevaeva1997@cluster0.axq7odf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => console.log(err));

const tours = fs.readdirSync(`${__dirname}/tours-simple.json", "utf-8`);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data created successfully");
  } catch (e) {
    console.log(e);
  }
};

console.log(process.argv)