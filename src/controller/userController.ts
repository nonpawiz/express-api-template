import prisma from "../service/db";
import { Request } from "express";
import { AddUserType, EditUserType, UserType } from "../service/type";
import useUuid from "../service/useUuid";
import useHash from "../service/useHash";
import useMoment from "../service/useMoment";
import serviceController from "./serviceController";

const userController = () => {
  const getUserList = async (req: Request) => {
    const page = Number(req.query[`page`]) || 1;
    const size = Number(req.query[`size`]) || 50;
    const all = Boolean(req.query[`all`]) || false;
    const skip = (page - 1) * size;

    const users = await prisma.user.findMany({
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

    const totalUsers = await prisma.user.count({
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
  const getUser = async (req: Request) => {
    try {
      const users = await getUserList(req);
      return users;
    } catch (error) {
      throw error;
    }
  };

  const addUser = async (body: AddUserType) => {
    try {
      const users = await prisma.user.create({
        data: {
          userNo: useUuid(),
          username: body.username,
          email: body.email,
          prefixId: body.prefixId,
          firstName: body.firstName,
          lastName: body.lastName,
          password: await useHash().hash(body.password),
          roleId: body.roleId || 3,
        },
      });
      return "add success";
    } catch (error) {
      throw error;
    }
  };

  const editUser = async (data: EditUserType) => {
    try {
      const userNo = data.userNo;
      delete data.userNo;
      delete data.password;
      delete data.createdAt;
      const edit = await prisma.user.update({
        where: { userNo: userNo },
        data: data,
      });
      return "edit success";
    } catch (error) {
      throw error;
    }
  };

  const updatePictureProfile = async (req: Request) => {
    return new Promise((resolve, reject) => {
      serviceController()
        .formData()
        .parse(req, async (err: Error, field: any, files: any) => {
          const res: any = {};
          try {
            const language: string = req.headers["accept-language"] || "en";
            if (err) return reject(err);
            const { userNo } = field;
            const filesToSave = Array.isArray(files.picture)
              ? files.picture
              : [files.picture];
            for (const file of filesToSave) {
              const user = await prisma.user.findFirst({
                where: { userNo: `${userNo}` },
              });
              if (!user) {
                return reject(
                  new Error(
                    language === "th" ? "ไม่พบชื่อผู้ใช้" : "User not found."
                  )
                );
              }
              if (user.userImgProfile != null) {
                serviceController().deleteFile(
                  user.userImgProfile.split("/uploads")[1]
                );
              }
              const fileExtension = serviceController().mimeToExtension(
                file.mimetype
              );
              const newFileName = `${useUuid()}-${user.userId}${fileExtension}`;
              serviceController().saveFile(file, `userImgProfile`, newFileName);
              await prisma.user.update({
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
          } catch (error) {
            reject(error);
          }
        });
    });
  };

  const dropUser = async ({ userNo }: Pick<EditUserType, "userNo">) => {
    try {
      await prisma.user.update({
        where: { userNo: userNo },
        data: { deletedAt: new Date() },
      });
      return "drop success";
    } catch (error) {
      throw error;
    }
  };

  return { getUser, addUser, editUser, updatePictureProfile, dropUser };
};

export default userController;
