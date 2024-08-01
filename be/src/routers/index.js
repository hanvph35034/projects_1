import express from 'express';
import productRouter from './product.js';
import authRouter from './authRouter.js';
import cartRouter from "./cartRouter.js";
const router = express.Router();
// import { checkAuth } from "../middlewares/checkAuth.js";

router.use("/products",productRouter)
router.use("/auth",authRouter)
// router.use("/category",)
router.use("/cart", cartRouter);
// router.use("/cart", checkAuth, cartRouter);
export default router