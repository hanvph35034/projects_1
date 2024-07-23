import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const useExists = await User.findOne({ email });
    if (useExists) {
      return res.status(400).json({ message: "email đã tồn tại" });
    }
    const hashPass = hashPassword(password);
    if (!hashPass) {
      return res.status(400).json({ message: "password is falid" });
    }
    const user = await User.create({
      email,
      password: hashPass,
    });
    return res
      .status(200)
      .json({ success: true, user, message: "register successful" });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const useExists = await User.findOne({ email });
    if (!useExists) {
      return res.status(400).json({ message: "email chưa đăng kí" });
    }
    const isMatch = comparePassword(password,useExists.password);
    if (!isMatch) {
      return res.status(400).json({ message: "password is falid" });
    }
    const token = generateToken()
    const user = await User.create({
      email,
      password: hashPass,
    });
    return res
      .status(200)
      .json({ success: true, user, message: "register successful" });
  } catch (error) {
    next(error);
  }
};