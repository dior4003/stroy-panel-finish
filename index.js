const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const DB = require("./server/db");
const fileUpload = require("express-fileupload");
const localStorage = require("./server/localStorage/localStotrage");
var path = require("path"); //used for file path
var fs = require("fs-extra");
require("dotenv").config();
const admin = express();
// console.log(localStorage.getItem("admin"));
const port = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(fileUpload());
const handlebars = exphbs.create({ extname: ".hbs" });
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");
const routes = require("./server/router");
const adminRouter = require("./server/adminRouter");
const axios = require("axios");

// axios({
//   method: "get",
//   url: "https://v1.nocodeapi.com/by_diorr/instagram/UrUHNlNAWUFSeHwV",
//   params: {},
// })
//   .then(function(response) {
//     // handle success
//     console.log(response.data);
//   })
//   .catch(function(error) {
//     // handle error
//     console.log(error);
//   });

app.use("/", routes);
app.post("/upload-image", async (req, res) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + "/public/images/" + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  await sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    res.redirect(`/images/${sampleFile.name}`);
  });
});

app.listen(port, () => {
  console.log(`server started as port ${port}`);
});
