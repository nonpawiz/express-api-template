import prisma from "../service/db";
import { Request } from "express";
import { AddUserType, EditUserType } from "../service/type";
import useUuid from "../service/useUuid";
import useHash from "../service/useHash";
import useMoment from "../service/useMoment";

const userController = () => {
  const getUserList = async (req: Request) => {
    const page = Number(req.query[`page`]) || 1;
    const size = Number(req.query[`size`]) || 50;
    const skip = (page - 1) * size;

    const users = await prisma.user.findMany({
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

    const totalUsers = await prisma.user.count({
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
  const dropUser = async ({ userNo }: Pick<EditUserType, "userNo">) => {
    try {
      const edit = await prisma.user.update({
        where: { userNo: userNo },
        data: { deletedAt: useMoment().now },
      });
      return "drop success";
    } catch (error) {
      throw error;
    }
  };

  return { getUser, addUser, editUser, dropUser };
};

export default userController;
