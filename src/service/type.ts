export interface UserType {
  userId: number;
  userNo: string;
  username: string;
  email: string;
  prefixId: number;
  firstName: string;
  lastName: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;

  role?: { id: number; name: string };
}

export type AddUserType = Pick<
  UserType,
  "username" | "email" | "prefixId" | "firstName" | "lastName" | "password"
>;

export type EditUserType = Partial<Omit<UserType, "role">>;
