import { Router } from "express";
import { createProduct, deleteProduct, getAll, getOne, updateProuduct } from "../controller/product.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import {  productValidationSchema } from "../validShema/productSchema.js";


const productRouter = Router();
productRouter.get("/",getAll)
productRouter.get(":id/",getOne)
productRouter.post("/",validBodyRequest(productValidationSchema),createProduct)
productRouter.put(":id/",updateProuduct)
productRouter.get(":id/",deleteProduct)
export default productRouter