import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default () => {
  const SECRET_KEY = process.env.JWT_SECRET as string;
  const generateToken = (payload: object, expiresIn = "1h") => {
    return (jwt.sign as any)(payload, SECRET_KEY, { expiresIn });
  };
  const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET_KEY);
  };
  return { generateToken, verifyToken };
};
