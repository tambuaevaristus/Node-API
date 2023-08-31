const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please ener a product name"],
    },
    quantity: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

const Prooduct = mongoose.model("Product", productSchema);
module.exports = Prooduct;
