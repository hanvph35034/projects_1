import bcryptjs from 'bcryptjs';

// Hàm để hash mật khẩu
export const hashPassword = (password) => {
  return bcryptjs.hashSync(password, 10);
}

// Hàm để so sánh mật khẩu
export const comparePassword = (password, hashedPassword) => {
  return bcryptjs.compareSync(password, hashedPassword);
}
