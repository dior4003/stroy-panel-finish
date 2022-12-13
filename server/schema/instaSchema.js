const mongoose = require("mongoose");

const Insta = mongoose.Schema(
  {
    insta:Object
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("insta", Insta);
