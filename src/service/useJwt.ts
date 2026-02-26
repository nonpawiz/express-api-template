import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const SECRET_KEY = process.env.JWT_SECRET || `xxx`;
export const JWT_ACCESS_TOKEN_TIME = process.env.JWT_ACCESS_TOKEN_TIME || `1m`;
export const JWT_REFRESH_TOKEN_TIME = process.env.JWT_REFRESH_TOKEN_TIME || `2m`;

export default () => {

  const newAccessToken = (payload: object) => {
    return (jwt.sign as any)(payload, SECRET_KEY, { expiresIn: JWT_ACCESS_TOKEN_TIME });
  };

  const newRefreshToken = (payload: object) => {
    return (jwt.sign as any)(payload, SECRET_KEY, { expiresIn: JWT_REFRESH_TOKEN_TIME });
  };

  const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET_KEY);
  };

  return { newAccessToken, newRefreshToken, verifyToken };
};
