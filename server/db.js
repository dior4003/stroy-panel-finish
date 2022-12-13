const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const DB =mongoose
  .connect(
    "mongodb+srv://stroy-PANEL:stroy-PANEL88127413@cluster0.yu6yop1.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
module.exports= DB