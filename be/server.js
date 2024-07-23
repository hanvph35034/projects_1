import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/routers/index.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("ket noi thanh cong");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", router);
const errorNotFound = (req, res, next) => {
  const error = new Error("Not Found");
  res.status(404);
  next(error);
};

const errorConmon = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    message: err.message || "Lỗi server",
  });
};
app.use(errorNotFound,errorConmon)
app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
