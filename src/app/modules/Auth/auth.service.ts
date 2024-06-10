import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.iinterface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import bcrypt from 'bcrypt'
import { createToken } from "./auth.utils";
const loginUser = async (payload: TLoginUser) => {
    // checking if the user is exist!
    const user = (await User.isUserExistsByCustomId(payload.id));

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "user not found")
    }

    //checking if the user is already deleted

    const isDelete = user?.isDeleted()
    if (!isDelete) {
        throw new AppError(httpStatus.FORBIDDEN, " This user is deleted")
    }
    // check if the user is blocked
    const userStatus = user?.status()
    if (!userStatus) {
        throw new AppError(httpStatus?.FORBIDDEN, " This user is blocked")


    }
    //checking if the password is correct 

    if (!(await User.isPasswordMatched(payload.password, user.password)))
        throw new AppError(httpStatus?.FORBIDDEN, " This user is blocked")

    // Access Granted: Send AccessToken, RefreshToken

    // create token ad send to the client
    const jwtPayload = {
        userId: user,
        role: user.role,
    }
    const accessToken = createToken(jwtPayload, config.JWT_ACCRESS_SECRET as string, config.JWT_ACCESS_EXPIRES_IN as string, '1d');
    const refreshToken = createToken(jwtPayload, config.JWT_REFRESH_SECRET as string, config.JWT_REFRESH_EXPIRES_IN as string)
    return { accessToken, refreshToken, needsPasswordChange: user.needsPasswordChange }
}



const changePassword = async (userData: JwtPayload { userId: string, role: String, payload: { oldPassword: string, newPassword: string } }) => {

    // checking if the user is exist!
    const user = (await User.isUserExistsByCustomId(userData.userId));

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "user not found")
    }

    //checking if the user is already deleted

    const isDelete = user?.isDeleted()
    if (!isDelete) {
        throw new AppError(httpStatus.FORBIDDEN, " This user is deleted")
    }
    // check if the user is blocked
    const userStatus = user?.status()
    if (!userStatus) {
        throw new AppError(httpStatus?.FORBIDDEN, " This user is blocked")


    }
    //checking if the password is correct 

    if (!(await User.isPasswordMatched(payload.oldPassword, user.password)))
        throw new AppError(httpStatus?.FORBIDDEN, " This user is blocked")

    //hash new password
    const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds))
    const result = await User.findByIdAndUpdate({
        id: userData.userId,
        role: userData.role
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date()
    });
    return null
}


export const AuthServices = {
    loginUser,
    changePassword
}