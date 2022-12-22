// home page

const localStorage = require("./localStorage/localStotrage");
const bcrypt = require("bcrypt");
const testFolder = "./public/images/";
const Contact = require("./schema/contactSchema");
const fs = require("fs-extra");
const saltRounds = 10;
const Banner = require("./schema/bannerSchema");
const TelegramBot = require("node-telegram-bot-api");
const Product = require("./schema/productSchema");
const Insta = require("./schema/instaSchema");
const axios = require("axios");
const token = "5945996729:AAGnN4rnsPa1nCRbDw9-1l97xVgLj-tSyDA";

const bot = new TelegramBot(token, { polling: true });
const Admin = require("./schema/adminSchema");
exports.view = async (req, res) => {
  let cards = [
    {
      image:
        "https://thumb.tildacdn.com/tild3739-3166-4833-b734-656331653566/-/cover/460x340/center/center/-/format/webp/Product_1.jpg",
      text: "Сэндвич-панели",
      decr: "Сэндвич-панель - это современный материал, который отвечает всем стандартам качества и является экологически безопасным, поэтому отлично подходит для строительства производственных зданий и сооруженный любого назначения, заводов и объектов пищевой промышленности, сельскохозяйственных сооружений, автозаправочных станций, моек, при утеплении существующих зданий, а также при строительстве холодильных камер, камер глубокой заморозки, овощехранилищ.",
    },
    {
      image:
        "https://thumb.tildacdn.com/tild3430-6461-4836-b231-316563303364/-/cover/460x340/center/center/-/format/webp/montazh_postavka_kho.jpg",
      text: "Сэндвич-панели для холодильных камер",
      decr: "Среди большого количества изоляционных ресурсов именно сэндвич-панели признаны с лучшими показателями практичности и эффективности. Они применяются в холодильниках, объем которых варьируется в пределах нескольких кубометров до крупногабаритных складских агрегатов. Они предполагают довольно простой и эффективный монтаж холодильного оборудования. С их помощью снижается потребление электроэнергии, а значит существенно сокращаются расходы.",
    },
    {
      image:
        "https://thumb.tildacdn.com/tild3533-3630-4532-a434-623634396130/-/cover/460x340/center/center/-/format/webp/Product_4.jpg",
      text: "Стеновые сэндвич панели",
      decr: `Стеновые сэндвич панели
              Длина до: 13,000 мм;
              Ширина габаритная: 1210 мм;
              Ширина монтажная: 1200 мм;
              Толщина панели: 50-75-80-100-120-150;
              Внутренний слой: 3 вида - негорючая мин. вата (базальт), стекловата из кварцевого камня пенополистирол;
              Верхняя и нижняя облицовка: Металл с полимерным покрытием по RAL.`,
    },
    {
      image:
        "https://thumb.tildacdn.com/tild3030-3133-4535-b133-616334353534/-/cover/460x340/center/center/-/format/webp/Product_3.jpg",
      text: "Кровельные сэндвич панели",
      decr: `Кровельные сэндвич панели
                Длина до: 13,000 мм;
                Ширина габаритная: 1170 мм;
                Ширина монтажная: 1140 мм;
                Толщина панели: 50-75-80-100-120-150;
                Внутренний слой: 3 вида - негорючая мин. вата (базальт), стекловата из кварцевого камня, пенополистирол;
                Верхняя и нижняя облицовка: Металл с полимерным покрытием по RAL.`,
    },
    {
      image:
        "https://thumb.tildacdn.com/tild6439-3739-4661-b538-316439656431/-/cover/460x340/center/center/-/format/webp/Product_2.jpg",
      text: "Профилированный лист",
      decr: `Облицовочный стеновой или кровельный строительный материал, предназначенный для возведения наружных ограждений, стен и крыш.
  Представляет собой металлический лист, который изготавливается из листовой оцинкованной стали методом холодного проката.
  При изготовлении подвергается профилированию (приданию волнообразной, трапециевидной и т.п. формы) для повышения жесткости, Профилированный лист был создан в 1820 году английским инженером Генри Палмером.`,
    },
    {
      image:
        "https://thumb.tildacdn.com/tild6633-3238-4765-b938-363437653166/-/cover/460x340/center/center/-/format/webp/Product_5.jpg",
      text: "Тункабонд",
      decr: `Tуникабонд для потолка, стен и для фасада с квадратными потолочными панелями это экономичные потолочные решения, которые легко планировать. В дополнение к нашим стандартным размерам, индивидуальные сетки могут быть реализованы в соответствии с вашими потребностями.
  Доступны разные типы туникабондов. Мы производим качественные и недорогие туникабонды в Ташкенте.`,
    },
  ];
  let slider;
  // let slider = [
  //   {
  //     img: "./images/photo_2022-12-10_14-36-00.jpg",
  //     title: "your Title",
  //     decr: "your decription",
  //   },
  //   {
  //     img: "./images/photo_2022-12-10_14-36-11.jpg",
  //     title: "your Title",
  //     decr: "your decription",
  //   },
  //   {
  //     img: "./images/photo_2022-12-10_14-36-19.jpg",
  //     title: "your Title",
  //     decr: "your decription",
  //   },
  //   {
  //     img: "./images/photo_2022-12-10_14-36-02.jpg",
  //     title: "your Title",
  //     decr: "your decription",
  //   },
  //   {
  //     img: "./photo_2022-12-10_14-36-19.jpg",
  //     title: "your Title",
  //     decr: "your decription",
  //   },
  // ];
  // let cards;
  // await Product.find().then(async (card) => {
  //   cards = card;
  // });
  await Banner.find().then((slide) => {
    slider = slide;
  });
  console.log(slider);
  console.log(cards[0].image);
  await Insta.find().then((post) => {
    const posts = post[0].insta;
    res.render("home", { posts, cards, slider });
  });
};
exports.productId = (req, res) => {};
exports.viewuz = (req, res) => {
  let cards = [
    {
      image:
        "https://thumb.tildacdn.com/tild3739-3166-4833-b734-656331653566/-/cover/460x340/center/center/-/format/webp/Product_1.jpg",
      text: "Sendvich panellar",
    },
    {
      image:
        "https://thumb.tildacdn.com/tild3430-6461-4836-b231-316563303364/-/cover/460x340/center/center/-/format/webp/montazh_postavka_kho.jpg",
      text: "Sovutish kameralari uchun sendvich panellar",
    },
    {
      image:
        "https://thumb.tildacdn.com/tild3533-3630-4532-a434-623634396130/-/cover/460x340/center/center/-/format/webp/Product_4.jpg",
      text: "Devorlar uchun sendvich panellar",
    },
    {
      image:
        "https://thumb.tildacdn.com/tild3030-3133-4535-b133-616334353534/-/cover/460x340/center/center/-/format/webp/Product_3.jpg",
      text: "Uy uchun sendvich panellar",
    },
    {
      image:
        "https://thumb.tildacdn.com/tild6439-3739-4661-b538-316439656431/-/cover/460x340/center/center/-/format/webp/Product_2.jpg",
      text: "Profil listlar",
    },
    {
      image:
        "https://thumb.tildacdn.com/tild6633-3238-4765-b938-363437653166/-/cover/460x340/center/center/-/format/webp/Product_5.jpg",
      text: "Tunikablog",
    },
  ];
  localStorage.setItem("lang", "uz");
  Insta.find().then((post) => {
    const posts = post[0].insta;
    res.render("homeuz", { posts, cards });
  });
};
exports.slider = (req, res) => {
  let slider = [
    {
      img: "./images/photo_2022-12-10_14-36-00.jpg",
      title: "your Title ",
      decr: "your decription",
    },
    {
      img: "./images/photo_2022-12-10_14-36-11.jpg",
      title: "your Title",
      decr: "your decription",
    },
    {
      img: "./images/photo_2022-12-10_14-36-19.jpg",
      title: "your Title",
      decr: "your decription",
    },
    {
      img: "./images/photo_2022-12-10_14-36-02.jpg",
      title: "your Title",
      decr: "your decription",
    },
    {
      img: "./photo_2022-12-10_14-36-19.jpg",
      title: "your Title",
      decr: "your decription",
    },
  ];
  if (localStorage.getItem("admin")) {
    res.render("dashboard", { slider });
  }
};
exports.updInsta = async (req, res) => {
  if (localStorage.getItem("admin")) {
    axios({
      method: "get",
      url: "https://v1.nocodeapi.com/stroypanel/instagram/KozEuMpXWFAYiMqF?limit=999999999",
      params: {},
    })
      .then(async function (response) {
        const insta = {
          _id: "6394ceb374e615b5a8b65b8a",
          insta: response.data,
        };
        Insta.updateOne(
          { _id: "6394ceb374e615b5a8b65b8a" },
          {
            insta: response.data,
          }
        )
          .then((result) => {
            console.log(result);
            console.log("true");
            res.redirect("/dashboard");
          })
          .catch((err) => {
            console.log(err);
          });

        console.log("data successfuly update");
      })

      // handle success

      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
};

exports.admin = (req, res) => {
  res.render("admin");
};
exports.addbanner = (req, res) => {
  res.render("dashboard", { sliderForm: true });
};
exports.thanks = (req, res) => {
  res.render("thanks");
};
exports.product = (req, res) => {
  let cards = [
    {
      image:
        "https://thumb.tildacdn.com/tild3739-3166-4833-b734-656331653566/-/cover/460x340/center/center/-/format/webp/Product_1.jpg",
      text: "Сэндвич-панели",
      decr: "Сэндвич-панель - это современный материал, который отвечает всем стандартам качества и является экологически безопасным, поэтому отлично подходит для строительства производственных зданий и сооруженный любого назначения, заводов и объектов пищевой промышленности, сельскохозяйственных сооружений, автозаправочных станций, моек, при утеплении существующих зданий, а также при строительстве холодильных камер, камер глубокой заморозки, овощехранилищ.",
    },
    {
      image:
        "https://thumb.tildacdn.com/tild3430-6461-4836-b231-316563303364/-/cover/460x340/center/center/-/format/webp/montazh_postavka_kho.jpg",
      text: "Сэндвич-панели для холодильных камер",
      decr: "Среди большого количества изоляционных ресурсов именно сэндвич-панели признаны с лучшими показателями практичности и эффективности. Они применяются в холодильниках, объем которых варьируется в пределах нескольких кубометров до крупногабаритных складских агрегатов. Они предполагают довольно простой и эффективный монтаж холодильного оборудования. С их помощью снижается потребление электроэнергии, а значит существенно сокращаются расходы.",
    },
    {
      image:
        "https://thumb.tildacdn.com/tild3533-3630-4532-a434-623634396130/-/cover/460x340/center/center/-/format/webp/Product_4.jpg",
      text: "Стеновые сэндвич панели",
      decr: `Стеновые сэндвич панели
              Длина до: 13,000 мм;
              Ширина габаритная: 1210 мм;
              Ширина монтажная: 1200 мм;
              Толщина панели: 50-75-80-100-120-150;
              Внутренний слой: 3 вида - негорючая мин. вата (базальт), стекловата из кварцевого камня пенополистирол;
              Верхняя и нижняя облицовка: Металл с полимерным покрытием по RAL.`,
    },
    {
      image:
        "https://thumb.tildacdn.com/tild3030-3133-4535-b133-616334353534/-/cover/460x340/center/center/-/format/webp/Product_3.jpg",
      text: "Кровельные сэндвич панели",
      decr: `Кровельные сэндвич панели
                Длина до: 13,000 мм;
                Ширина габаритная: 1170 мм;
                Ширина монтажная: 1140 мм;
                Толщина панели: 50-75-80-100-120-150;
                Внутренний слой: 3 вида - негорючая мин. вата (базальт), стекловата из кварцевого камня, пенополистирол;
                Верхняя и нижняя облицовка: Металл с полимерным покрытием по RAL.`,
    },
    {
      image:
        "https://thumb.tildacdn.com/tild6439-3739-4661-b538-316439656431/-/cover/460x340/center/center/-/format/webp/Product_2.jpg",
      text: "Профилированный лист",
      decr: `Облицовочный стеновой или кровельный строительный материал, предназначенный для возведения наружных ограждений, стен и крыш.
  Представляет собой металлический лист, который изготавливается из листовой оцинкованной стали методом холодного проката.
  При изготовлении подвергается профилированию (приданию волнообразной, трапециевидной и т.п. формы) для повышения жесткости, Профилированный лист был создан в 1820 году английским инженером Генри Палмером.`,
    },
    {
      image:
        "https://thumb.tildacdn.com/tild6633-3238-4765-b938-363437653166/-/cover/460x340/center/center/-/format/webp/Product_5.jpg",
      text: "Тункабонд",
      decr: `Tуникабонд для потолка, стен и для фасада с квадратными потолочными панелями это экономичные потолочные решения, которые легко планировать. В дополнение к нашим стандартным размерам, индивидуальные сетки могут быть реализованы в соответствии с вашими потребностями.
  Доступны разные типы туникабондов. Мы производим качественные и недорогие туникабонды в Ташкенте.`,
    },
  ];
  res.render("product", { cards });
};
exports.setting = (req, res) => {
  if (localStorage.getItem("admin")) {
    const id = localStorage.getItem("admin");

    Admin.findOne({ _id: id }).then((user) => {
      if (!user) {
        res.render("setting", user);
      } else {
        res.render("dashboard", { user });
      }
    });
  }
};
exports.updpass = (req, res) => {
  if (localStorage.getItem("admin")) {
    const { login, password } = req.body;
    const id = localStorage.getItem("admin");
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        let users = {
          login: login,
          password: hash,
        };
        Admin.findOneAndUpdate({ _id: id }, users).then((user) => {
          res.redirect("dashboard");
        });
      });
    });
  }
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

exports.sliderform = async (req, res) => {
  const {
    title1,
    title2,
    title3,
    title4,
    img1,
    img2,
    img3,
    img4,
    decr1,
    decr2,
    decr3,
    decr4,
  } = req.body;
  const slid = [
    {
      title: title1,
      img: img1,
      decr: decr1,
    },
    {
      title: title2,
      img: img2,
      decr: decr2,
    },
    {
      title: title3,
      img: img3,
      decr: decr3,
    },
    {
      title: title4,
      img: img4,
      decr: decr4,
    },
  ];
  const ss = await new Banner(slid);

  await ss;
  save().then((data) => {
    res.send("ok");
    console.log(data);
  });
};
// bot.on("message", (msg) => {
//   bot.sendMessage(msg.chat.id);
//   console.log(msg);
// });
exports.dashboard = async (req, res) => {
  if (localStorage.getItem("admin")) {
    Contact.find().then((client) => {
      // console.log(client);
      const len = client.length;
      let clients = [];
      client.reverse().forEach(async (item) => {
        let a = {
          id: item._id,
          name: item.name,
          email: item.email,
          massage: item.massage,
        };
        await clients.push(a);
      });
      res.status(200).render("dashboard", { len, clients });
    });
  } else {
    res.status(200).render("page404");
  }
};
exports.userContact = async (req, res) => {
  if (localStorage.getItem("admin")) {
    const { name, phone, message } = req.body;
    bot.on("message", (msg) => {
      bot.sendMessage(msg.chat.id);
      console.log(msg);
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
        res.redirect("/thanks");
        console.log("post");
      })
      .catch((err) => {
        res.status(500).redirect("/error");
      });
  } else {
    res.status(404).render("page404");
  }
};

exports.logout = async (req, res) => {
  localStorage.clear();

  res.status(200).redirect("login");
};

exports.allFiles = async (req, res) => {
  if (localStorage.getItem("admin")) {
    let image = [];
    fs.readdirSync(testFolder).forEach((file) => {
      image.push(file);
    });
    res.status(200).render("upload", { image });
  }
};
exports.deleteImg = async (req, res) => {
  if (localStorage.getItem("admin")) {
    await fs.unlink(`./public/images/${req.params.id}`, function (err) {
      if (err) {
        console.error(err);
        console.log("File not found");
      } else {
        console.log("File Delete Successfuly");
      }
      res.status(200).redirect("/all");
    });
  }
  console.log(req.params.id);
};
exports.deleteCont = async (req, res) => {
  if (localStorage.getItem("admin")) {
    Contact.findOneAndDelete({ _id: req.params.id }, (resp) => {
      res.redirect("/dashboard");
    });
  }
};
exports.imgone = async (req, res) => {
  if (localStorage.getItem("admin")) {
    let img = req.params.id;
    res.status(200).render("upload");
  }
};
