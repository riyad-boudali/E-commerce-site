import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import csrf from "csurf";
import flash from "connect-flash";
import dotenv from 'dotenv';
import { router as adminRoutes } from "./routes/admin.js";
import { router as shopRoutes } from "./routes/shop.js";
import { router as authRoutes } from "./routes/auth.js";
import { get404Page, get500Page } from "./controllers/error.js";
import { User } from "./models/user.js"

dotenv.config()

const MongoDB_URI = process.env.MONGODB_URI
const app = express();
const rootDir = process.cwd();
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: MongoDB_URI,
  collection: "sessions",
});

const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ storage: fileStorage, fileFilter:fileFilter }).single("image"));
app.use(express.static(path.join(rootDir, "public")));
app.use('/images',express.static( path.join(rootDir, "images")));
app.use(
  session({
    secret: "my secret",
    saveUninitialized: false,
    resave: false,
    store: store,
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  (res.locals.isAuthenticated = req.session.isLoggedIn),
    (res.locals.csrfToken = req.csrfToken());
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      // throw new Error('test')
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      // throw new Error
      next(new Error(err));
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use("/500", get500Page);
app.use(get404Page);

app.use((error, req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "500",
    path: "",
  });
});

mongoose
  .connect(MongoDB_URI)
  .then(() => {
    app.listen(process.env.PORT || 4001);
  })
  .catch((err) => {
    console.log(err);
  });
