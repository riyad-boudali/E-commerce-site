import express from "express";
import { body } from "express-validator";
import { getAddProduct, getEditProduct } from "../controllers/admin.js";
import { postAddProduct } from "../controllers/admin.js";
import { getAdminProducts } from "../controllers/admin.js";
import { postEditProduct } from "../controllers/admin.js";
import { deleteProduct } from "../controllers/admin.js";
import { isAuth } from "../middlewares/is-auth.js";

export const router = express.Router();

// GET
router.get("/add-product", isAuth, getAddProduct);
router.get("/products", isAuth, getAdminProducts);
router.get("/edit-product/:productId", isAuth, getEditProduct);

// // POST
router.post(
  "/add-product",
  isAuth,
  [
    body("title")
      .matches(/^[a-zA-Z0-9 ]*$/)
      .withMessage("Title must only contain letters, numbers, and spaces")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long")
      .trim(),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long")
      .trim(),
    body("price").isFloat().withMessage("Price must be Number").trim(),
  ],
  postAddProduct
);
router.post(
  "/edit-product",
  isAuth,
  [
    body("title")
      .matches(/^[a-zA-Z0-9 ]*$/)
      .withMessage("Title must only contain letters, numbers, and spaces")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long")
      .trim(),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long")
      .trim(),
    body("price").isFloat().withMessage("Price must be Number").trim(),
  ],
  postEditProduct
);
router.delete("/product/:productId", isAuth, deleteProduct);
