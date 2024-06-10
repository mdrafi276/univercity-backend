/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "../Auth/user.constents";
import { boolean } from "zod";

export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  IsUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
  isJWTIssuedBeforePasswordChange: (passwordChangeTimestamp: Date, jwtIssuedTimestamp: number): boolean;

}

export type TUserRole = keyof typeof USER_ROLE;
