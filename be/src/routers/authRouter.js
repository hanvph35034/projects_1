import { Router } from "express";
import { login, register } from "../controller/auth.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { authValidationSchema } from "../validShema/authSchema.js";

const authRouter = Router();
authRouter.post('/register',validBodyRequest(authValidationSchema),register);
authRouter.post('/login',validBodyRequest(authValidationSchema),login);
export default authRouter;