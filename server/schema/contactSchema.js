const mongoose = require("mongoose");

const Contact = mongoose.Schema(
  {
    name: String,
    email: String,
    massage: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", Contact);
