const mongoose = require("mongoose");

const Admin = mongoose.Schema(
  {
    login: String,
    password: String,
    logging:Object,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("admin", Admin);
