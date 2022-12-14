const mongoose = require("mongoose");

const Product = mongoose.Schema(
  {
    image:String,
    decr:String,
    text: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", Product);
