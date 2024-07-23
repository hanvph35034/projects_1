import express from 'express';
import productRouter from './product.js';
import authRouter from './authRouter.js';
const router = express.Router();

router.use("/product",productRouter)
router.use("/auth",authRouter)
// router.use("/category",)
export default router