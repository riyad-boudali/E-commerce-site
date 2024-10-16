import express from "express";
import { check, body } from "express-validator";
import {
  getLogin,
  getNewPassword,
  getReset,
  getSignUp,
  postLogin,
  postLogout,
  postNewPassword,
  postReset,
  postSignUp,
} from "../controllers/auth.js";
import { User } from "../models/user.js";

export const router = express.Router();

router.get("/login", getLogin);
router.get("/signup", getSignUp);
router.get("/reset", getReset);
router.get("/reset/:token", getNewPassword);
router.post(
  "/login",
  [
    check("email")
      .trim()
      .isEmail()
      .withMessage("Enter a valid Email")
      .normalizeEmail({
        gmail_convert_googlemaildotcom: false,
        gmail_remove_dots: false,
        gmail_remove_subaddress: false,
      }),
    body("password").trim(),
  ],
  postLogin
);
router.post("/logout", postLogout);
router.post(
  "/signup",
  [
    check("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid Email")
      .normalizeEmail({
        gmail_remove_dots: false,
        gmail_convert_googlemaildotcom: false,
        gmail_remove_subaddress: false,
      })
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject(
              "Email already exists please pick another one"
            );
          }
        });
      }),
    body("password")
      .trim()
      .isStrongPassword()
      .withMessage(
        `Password must be at least 8 characters long and include at least one uppercase letter,
         one lowercase letter, one number, and one special character `
      ),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match.");
        }
        return true;
      }),
  ],
  postSignUp
);
router.post("/reset", postReset);
router.post("/new-password", postNewPassword);
