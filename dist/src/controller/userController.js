"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../service/db"));
const useUuid_1 = __importDefault(require("../service/useUuid"));
const useHash_1 = __importDefault(require("../service/useHash"));
const serviceController_1 = __importDefault(require("./serviceController"));
const userController = () => {
    const getUserList = async (req) => {
        const page = Number(req.query[`page`]) || 1;
        const size = Number(req.query[`size`]) || 50;
        const all = Boolean(req.query[`all`]) || false;
        const skip = (page - 1) * size;
        const users = await db_1.default.user.findMany({
            skip: skip,
            take: size,
            where: all ? {} : { deletedAt: null },
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
            where: all ? {} : { deletedAt: null },
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
                    roleId: body.roleId || 3,
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
    const updatePictureProfile = async (req) => {
        return new Promise((resolve, reject) => {
            (0, serviceController_1.default)()
                .formData()
                .parse(req, async (err, field, files) => {
                const res = {};
                try {
                    const language = req.headers["accept-language"] || "en";
                    if (err)
                        return reject(err);
                    const { userNo } = field;
                    const filesToSave = Array.isArray(files.picture)
                        ? files.picture
                        : [files.picture];
                    for (const file of filesToSave) {
                        const user = await db_1.default.user.findFirst({
                            where: { userNo: `${userNo}` },
                        });
                        if (!user) {
                            return reject(new Error(language === "th" ? "ไม่พบชื่อผู้ใช้" : "User not found."));
                        }
                        if (user.userImgProfile != null) {
                            (0, serviceController_1.default)().deleteFile(user.userImgProfile.split("/uploads")[1]);
                        }
                        const fileExtension = (0, serviceController_1.default)().mimeToExtension(file.mimetype);
                        const newFileName = `${(0, useUuid_1.default)()}-${user.userId}${fileExtension}`;
                        (0, serviceController_1.default)().saveFile(file, `userImgProfile`, newFileName);
                        await db_1.default.user.update({
                            where: { userNo: `${userNo}` },
                            data: {
                                userImgProfile: `/uploads/userImgProfile/${newFileName}`,
                            },
                        });
                        return resolve({
                            code: 200,
                            upload: "success",
                            file: newFileName,
                        });
                    }
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    };
    const dropUser = async ({ userNo }) => {
        try {
            await db_1.default.user.update({
                where: { userNo: userNo },
                data: { deletedAt: new Date() },
            });
            return "drop success";
        }
        catch (error) {
            throw error;
        }
    };
    return { getUser, addUser, editUser, updatePictureProfile, dropUser };
};
exports.default = userController;
