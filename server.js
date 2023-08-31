const express = require("express");
const mongoose = require("mongoose");
const Product = require("./model/productModel");
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/product", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ product });
  } catch (error) {
    console.log(error.message);
  }
});
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://evaristustambua:Evaevaevaeva1997@cluster0.axq7odf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => console.log(err));
