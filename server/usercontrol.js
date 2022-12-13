// home page

const localStorage = require("./localStorage/localStotrage");
const bcrypt = require("bcrypt");
const testFolder = "./public/images/";
const Contact = require("./schema/contactSchema");
const fs = require("fs-extra");
const saltRounds = 10;
const TelegramBot = require("node-telegram-bot-api");

const Insta = require("./schema/instaSchema");
const axios = require("axios");
const token = "5777250834:AAGaNZDkl_Z8R-B6HonPYDV6_xJvqrM5ZSQ";

const bot = new TelegramBot(token, { polling: true });
const Admin = require("./schema/adminSchema");
exports.view = (req, res) => {
  let cards = [
    {
      image:
        "https://thumb.tildacdn.com/tild3739-3166-4833-b734-656331653566/-/cover/460x340/center/center/-/format/webp/Product_1.jpg",
      text: "Сэндвич-панели",
    },
    {
      image:
        "https://thumb.tildacdn.com/tild3430-6461-4836-b231-316563303364/-/cover/460x340/center/center/-/format/webp/montazh_postavka_kho.jpg",
      text: "Сэндвич-панели для холодильных камер",
    },
    {
      image:
        "https://thumb.tildacdn.com/tild3533-3630-4532-a434-623634396130/-/cover/460x340/center/center/-/format/webp/Product_4.jpg",
      text: "Стеновые сэндвич панели",
    },
    {
      image:
        "https://thumb.tildacdn.com/tild3030-3133-4535-b133-616334353534/-/cover/460x340/center/center/-/format/webp/Product_3.jpg",
      text: "Кровельные сэндвич панели",
    },
    {
      image:
        "https://thumb.tildacdn.com/tild6439-3739-4661-b538-316439656431/-/cover/460x340/center/center/-/format/webp/Product_2.jpg",
      text: "Профилированный лист",
    },
    {
      image:
        "https://thumb.tildacdn.com/tild6633-3238-4765-b938-363437653166/-/cover/460x340/center/center/-/format/webp/Product_5.jpg",
      text: "Тункабонд",
    },
  ];
  Insta.find().then((post) => {
    const posts = post[0].insta;
    res.render("home", { posts, cards });
    // console.log(posts);
  });
  // axios({
  //   method: "get",
  //   url: "https://v1.nocodeapi.com/stroypanel/instagram/KozEuMpXWFAYiMqF?limit=9999999",
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

  // res.render("home");
};
exports.updInsta = async (req, res) => {
  axios({
    method: "get",
    url:
      "https://v1.nocodeapi.com/stroypanel/instagram/KozEuMpXWFAYiMqF?limit=9999999",
    params: {},
  })
    .then(async function(response) {
      const insta = await new Insta({
        insta: response.data,
      });
      await insta.update(
        {
          status: "0",
        },

        function(err, result) {
          if (!err) {
            console.log("updated");
            res.render("dashboard", {
              msg: {
                type: true,
                img: false,
              },
            });
          }
        }
      );
      console.log("data successfuly update");
    })

    // handle success

    .catch(function(error) {
      // handle error
      console.log(error);
    });
};

exports.admin = (req, res) => {
  res.render("admin");
};
exports.setting = (req, res) => {
  const id = localStorage.getItem("admin");

  Admin.findOne({ _id: id }).then((user) => {
    if (!user) {
      res.render("setting", user);
    } else {
      res.render("setting", {
        msg: {
          type: false,
          img: false,
          text: "Admin is not defined",
          decr:
            "Please check your internet connection networks or check that the information is correct or contact the developer",
        },
      });
    }
  });
};
//
exports.login = async (req, res) => {
  const { login, password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  Admin.findOne({ login }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User not exist" });

    bcrypt.compare(password, user.password, (err, data) => {
      if (err) throw err;

      if (data) {
        localStorage.setItem("admin", user._id);
        console.log(user._id);
        return res.status(200).redirect("/dashboard");
      } else {
        return res.status(401).json({ msg: "Invalid credencial" });
      }
    });
  });

  // Save Note in the database
};
exports.notFound = async (req, res) => {
  res.status(200).render("page404");
};
exports.uploadGet = async (req, res) => {
  if (localStorage.getItem("admin")) {
    res.status(200).render("upload");
  } else {
    res.status(200).render("page404");
  }
};
exports.dashboard = async (req, res) => {
  if (localStorage.getItem("admin")) {
    res.status(200).render("dashboard");
  } else {
    res.status(200).render("page404");
  }
  console.log(localStorage.getItem("admin"));
};
exports.userContact = async (req, res) => {
  if (localStorage.getItem("admin")) {
    const { name, phone, message } = req.body;
    bot.on("message", (msg) => {
      bot.sendMessage(msg.chat.id);
      // console.log(msg);
    });
    bot.sendMessage(
      -838756959,
      ` #Contact 👋

  ${phone ? "📞Phone:  " + phone : "📞Phone: ☘️☘️☘️"}
  👨‍💼(💁‍♀️)Name :  ${name ? name : "###"}
  📖Team : ${message ? message : "###"}
  `
    );

    const note = await new Contact({
      name: name,
      massage: message,
      email: phone,
    });

    // Save Note in the database
    await note
      .save()
      .then((data) => {
        res.render("home", { success: true });
        console.log("post");
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Note.",
        });
      });
  } else {
    res.status(404).render("page404");
  }
  console.log(localStorage.getItem("admin"));
};

exports.logout = async (req, res) => {
  localStorage.clear();

  console.log(localStorage.getItem("admin"));
  res.status(200).redirect("login");
};

exports.allFiles = async (req, res) => {
  let image = [];
  fs.readdirSync(testFolder).forEach((file) => {
    image.push(file);
  });
  res.status(200).render("upload", { image });
};
exports.deleteImg = async (req, res) => {
  console.log(req.params.id);
  await fs.unlink(`./public/images/${req.params.id}`, function(err) {
    if (err) {
      console.error(err);
      console.log("File not found");
    } else {
      console.log("File Delete Successfuly");
    }
    res.status(200).redirect("/all");
  });
};
exports.imgone = async (req, res) => {
  console.log(req.params.id);
  let img = req.params.id;
  res.status(200).render("upload");
};
