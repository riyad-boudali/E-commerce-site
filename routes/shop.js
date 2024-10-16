import express from "express";
import { getCheckout, getInvoice, getProducts } from "../controllers/shop.js";
import { getCart } from "../controllers/shop.js";
import { getIndex } from "../controllers/shop.js";
import { getProduct } from "../controllers/shop.js";
import { postCart } from "../controllers/shop.js";
import { postCartDeletProduct } from "../controllers/shop.js";
import { getOrders } from "../controllers/shop.js";
import { postOrder } from "../controllers/shop.js";
import { isAuth } from "../middlewares/is-auth.js";

export const router = express.Router();

router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/products/:productId", getProduct);
router.get("/cart", isAuth, getCart);
router.get("/orders", isAuth, getOrders);
router.get("/checkout", getCheckout)
router.post("/cart", isAuth, postCart);
router.post("/cart-delete-item", isAuth, postCartDeletProduct);
router.post("/create-order", isAuth, postOrder);
router.get("/orders/:orderId", isAuth, getInvoice)
