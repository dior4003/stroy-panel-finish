const mongoose = require("mongoose");

const RuSchema = mongoose.Schema(
  {
    body:Object
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ru", Contact);
