"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../service/db"));
const useHash_1 = __importDefault(require("../service/useHash"));
const useJwt_1 = __importDefault(require("../service/useJwt"));
const moment_1 = __importDefault(require("moment"));
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 10;
const JWT_REFRESH_IN = process.env.JWT_REFRESH_IN || 5;
const authController = () => {
    const login = async ({ username, password, language, }) => {
        const user = await db_1.default.user.findFirst({
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
            throw Error(`${language == `th` ? `ไม่พบชื่อผู้ใช้` : `User not found.`}`);
        if (await (0, useHash_1.default)().compare(password, user.password)) {
            let tokenData = {
                ...user,
                language: language,
            };
            delete tokenData.password;
            return {
                access_token: (0, useJwt_1.default)().generateToken(tokenData, `${JWT_EXPIRES_IN}m`),
                user: tokenData,
            };
        }
        throw Error(`${language == `th` ? `รหัสผ่านไม่ถูกต้อง` : `Password is incorrect.`}`);
    };
    const checkAuthorized = async (token, res) => {
        try {
            const accessToken = token.split("Bearer ")[1];
            let tokenData = (0, useJwt_1.default)().verifyToken(accessToken);
            const exp = tokenData.exp;
            delete tokenData.iat;
            delete tokenData.exp;
            const diff = moment_1.default.unix(exp).diff((0, moment_1.default)(new Date()), "milliseconds");
            const lessThenThisMinutes = Number(JWT_REFRESH_IN);
            const msToRenew = lessThenThisMinutes * 60 * 1000;
            if (diff <= msToRenew) {
                const create = (0, useJwt_1.default)().generateToken(tokenData, `${JWT_EXPIRES_IN}m`);
                res.set("refresh_token", `${create}`);
            }
            return {
                diff: diff / 1000,
                unit: `seconds`,
                tokenData: tokenData,
            };
        }
        catch (error) {
            return undefined;
        }
    };
    return { login, checkAuthorized };
};
exports.default = authController;
