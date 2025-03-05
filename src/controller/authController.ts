import prisma from "../service/db";
import useHash from "../service/useHash";
import useJwt from "../service/useJwt";
import moment from "moment";
import { Response } from "express";
import { UserType } from "../service/type";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 10;
const JWT_REFRESH_IN = process.env.JWT_REFRESH_IN || 5;

const authController = () => {
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
      throw Error(
        `${language == `th` ? `ไม่พบชื่อผู้ใช้` : `User not found.`}`
      );
    if (await useHash().compare(password, user.password!)) {
      let tokenData: any = {
        ...user,
        language: language,
      };
      delete tokenData.password;
      return {
        access_token: useJwt().generateToken(tokenData, `${JWT_EXPIRES_IN}m`),
        user: tokenData,
      };
    }
    throw Error(
      `${language == `th` ? `รหัสผ่านไม่ถูกต้อง` : `Password is incorrect.`}`
    );
  };

  const checkAuthorized = async (token: string, res: Response) => {
    try {
      const accessToken = token.split("Bearer ")[1];
      let tokenData: any = useJwt().verifyToken(accessToken);
      const exp = tokenData.exp;
      delete tokenData.iat;
      delete tokenData.exp;

      const diff = moment.unix(exp).diff(moment(new Date()), "milliseconds");
      const lessThenThisMinutes = Number(JWT_REFRESH_IN);
      const msToRenew = lessThenThisMinutes * 60 * 1000;
      if (diff <= msToRenew) {
        const create = useJwt().generateToken(tokenData, `${JWT_EXPIRES_IN}m`);
        res.set("refresh_token", `${create}`);
      }
      return {
        diff: diff / 1000,
        unit: `seconds`,
        tokenData: tokenData as UserType,
      };
    } catch (error) {
      return undefined;
    }
  };

  return { login, checkAuthorized };
};
// futureDate.diff(moment(), "minutes");
export default authController;
