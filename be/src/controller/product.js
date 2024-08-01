import Product from "../models/Product.js";
export const getAll = async(req,res)=>{
    try {
        const data = await Product.find()
        if (data && data.length > 0) {
          return res.status(200).json({
            message: "Lay danh sach san pham thanh cong!",
            data,
          });
        }
        // return res.status(404).json({ message: "Khong co san pham nao!" });
        next();
    } catch (error) {
        next(error);
    }
}
export const getOne = async(req,res)=>{
    try {
        const data = await Product.findById(req.params.id)
        return res.status(201).json({
            message: "Lay san pham thanh cong!",
            data,
          });
    } catch (error) {
        console.log(error)
    }
}
export const createProduct = async(req,res)=>{
    try {
        const data = await Product.create(req.body)
      
        return res.status(201).json({
            message: "them san pham thanh cong!",
            data,
          });
          next();
    } catch (error) {
    next(error);
    }
}
export const updateProuduct = async(req,res)=>{
    try {
        const data = await Product.findByIdAndUpdate(`${req.params.id}`,req.body,{new:true});
        return res.status(201).json({
            message: "cap nhat san pham thanh cong!",
            data,
          });
    } catch (error) {
    next(error);
    }
}
export const deleteProduct = async(req,res)=>{
    try {
        const data = await Product.findByIdAndDelete(req.params.id)
        return res.status(201).json({
            message: "Xoa san pham thanh cong!",
            data,
          });
    } catch (error) {
    next(error);
    }
}
