import Joi from "joi";

export const productValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Tên phải là chuỗi",
    "string.empty": "Tên không được để trống",
    "any.required": "Tên là bắt buộc"
  }),
  price: Joi.number().required().messages({
    "number.base": "Giá phải là số",
    "any.required": "Giá là bắt buộc"
  }),
  description: Joi.string().optional().messages({
    "string.base": "Mô tả phải là chuỗi"
  }),
  hide: Joi.boolean().default(false).messages({
    "boolean.base": "Ẩn phải là giá trị đúng hoặc sai"
  }),
  discountPercentage: Joi.number().default(0).messages({
    "number.base": "Phần trăm giảm giá phải là số"
  }),
  rating: Joi.number().default(0).messages({
    "number.base": "Đánh giá phải là số"
  }),
  stock: Joi.number().default(0).messages({
    "number.base": "Tồn kho phải là số"
  }),
  brand: Joi.string().default("No brand").messages({
    "string.base": "Thương hiệu phải là chuỗi"
  }),
  category: Joi.string().default("").messages({
    "string.base": "Danh mục phải là chuỗi"
  }),
  thumbnail: Joi.string().default("").messages({
    "string.base": "Ảnh thu nhỏ phải là chuỗi"
  }),
  images: Joi.array().items(Joi.string()).default([]).messages({
    "array.base": "Ảnh phải là một mảng chuỗi",
    "string.base": "Mỗi ảnh trong mảng phải là chuỗi"
  }),
});