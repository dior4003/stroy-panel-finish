const mongoose = require("mongoose");

const Banner = mongoose.Schema(
  {
    img: String,
    title: String,
    decr: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("banner", Banner);
