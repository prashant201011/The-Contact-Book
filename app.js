const express = require("express");
const bodyParser = require("body-parser");
const adminrouter = require("./router/admin");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const fs = require("fs");

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0mar2023.iwxf1zf.mongodb.net/${process.env.MONGO_DATABASE}`;

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.set("view engine", "ejs");

app.use(helmet());

app.use(compression());

app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", "./views");

app.use(express.static(path.join(__dirname, "/public")));

app.use(
  session({
    secret: "MY_SESSION",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(adminrouter);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("connected with the database");

    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log("met with an error!");
  });
// app.use("/images", express.static(path.join(__dirname, "/images")));

// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
// );
// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
