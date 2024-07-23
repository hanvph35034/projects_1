import Joi from "joi";

export const authValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.base": "Email phải là chuỗi",
        "string.email": "Email không hợp lệ",
        "string.empty": "Email không được để trống",
    }),
    password: Joi.string().required().messages({
        "string.base": "Mật khẩu phải là chuỗi",
        "string.empty": "Mật khẩu không được để trống",
    }),
    role: Joi.string().valid("member", "admin").default("member").messages({
        "string.base": "Vai trò phải là chuỗi",
        "any.only": "Vai trò không hợp lệ",
    }),
});
