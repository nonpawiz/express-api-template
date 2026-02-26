import prisma from "../service/db";
import useHash from "../service/useHash";
import useJwt from "../service/useJwt";
import moment from "moment";
import { Response } from "express";
import { UserType } from "../service/type";


const jwt = useJwt()
const AuthController = () => {
  const login = async ({
    username,
    password,
    language,
  }: {
    [key: string]: string;
  }) => {
    const user = await prisma.user.findFirst({
      where: { username: username },
      include: {
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (user == null)
      throw new Error(
        `${language == `th` ? `ไม่พบชื่อผู้ใช้` : `User not found.`}`
      );
    if (await useHash().compare(password, user.password!)) {
      let tokenData: any = {
        ...user,
        language: language,
      };
      delete tokenData.password;
      return {
        access_token: jwt.newAccessToken(tokenData),
        refresh_token: jwt.newRefreshToken(tokenData),
        user: tokenData,
      };
    }
    throw new Error(
      `${language == `th` ? `รหัสผ่านไม่ถูกต้อง` : `Password is incorrect.`}`
    );
  };

  const me = async (token: string) => {
    try {
      const accessToken = token.split("Bearer ")[1];
      let tokenData: any = jwt.verifyToken(accessToken);
      const exp = tokenData.exp;

      const diff = moment.unix(exp).diff(moment(new Date()), "milliseconds");
      return {
        remaining: diff / 1000,
        unit: `seconds`,
        tokenData: tokenData as UserType,
      };
    } catch (error) {
      return undefined;
    }
  };

  const refreshToken = async (token: string) => {
    try {
      const refreshToken = token.split("Bearer ")[1];
      let tokenData: any = jwt.verifyToken(refreshToken);
      console.log("@refreshToken tokenData", tokenData);

      console.log("newRefreshToken", tokenData);
      return {
        tokenData: tokenData as UserType,
      };
    } catch (error) {
      console.log("@refreshToken error", error);
      return undefined;
    }
  };

  return { login, me, refreshToken };
};
export default AuthController;
