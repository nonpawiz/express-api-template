"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../service/db"));
const useUuid_1 = __importDefault(require("../service/useUuid"));
const useHash_1 = __importDefault(require("../service/useHash"));
const useMoment_1 = __importDefault(require("../service/useMoment"));
const userController = () => {
    const getUserList = async (req) => {
        const page = Number(req.query[`page`]) || 1;
        const size = Number(req.query[`size`]) || 50;
        const skip = (page - 1) * size;
        const users = await db_1.default.user.findMany({
            skip: skip,
            take: size,
            where: { deletedAt: null },
            orderBy: { createdAt: "asc" },
            include: {
                role: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        const totalUsers = await db_1.default.user.count({
            where: { deletedAt: null },
        });
        return {
            pagination: {
                page,
                size,
                totalPages: Math.ceil(totalUsers / size),
                count: totalUsers,
            },
            data: users.map((user, index) => ({
                rowNo: skip + index + 1,
                ...user,
            })),
        };
    };
    const getUser = async (req) => {
        try {
            const users = await getUserList(req);
            return users;
        }
        catch (error) {
            throw error;
        }
    };
    const addUser = async (body) => {
        try {
            const users = await db_1.default.user.create({
                data: {
                    userNo: (0, useUuid_1.default)(),
                    username: body.username,
                    email: body.email,
                    prefixId: body.prefixId,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    password: await (0, useHash_1.default)().hash(body.password),
                },
            });
            return "add success";
        }
        catch (error) {
            throw error;
        }
    };
    const editUser = async (data) => {
        try {
            const userNo = data.userNo;
            delete data.userNo;
            delete data.password;
            delete data.createdAt;
            const edit = await db_1.default.user.update({
                where: { userNo: userNo },
                data: data,
            });
            return "edit success";
        }
        catch (error) {
            throw error;
        }
    };
    const dropUser = async ({ userNo }) => {
        try {
            const edit = await db_1.default.user.update({
                where: { userNo: userNo },
                data: { deletedAt: (0, useMoment_1.default)().now },
            });
            return "drop success";
        }
        catch (error) {
            throw error;
        }
    };
    return { getUser, addUser, editUser, dropUser };
};
exports.default = userController;
