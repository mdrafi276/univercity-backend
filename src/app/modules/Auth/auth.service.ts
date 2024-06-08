import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.iinterface";
import bcrypt from 'bcrypt'
const loginUser = async (payload: TLoginUser) => {
    // checking if the user is exist!

    const isUserExists = await User.findOne({ id: payload?.id })
    console.log(isUserExists);
    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, "user not found")
    }

    //checking if the user is already deleted

    const isDelete = isUserExists?.isDeleted()
    console.log(isDelete);
    if (!isDelete) {
        throw new AppError(httpStatus.FORBIDDEN, " This user is deleted")
    }
    // check if the user is blocked
    const userStatus = isUserExists?.status()
    console.log(userStatus);
    if (!userStatus) {
        throw new AppError(httpStatus?.FORBIDDEN, " This user is blocked")


    }
    //checking if the password is correct 

    const isPasswordMatched = bcrypt.compare(payload.password, isUserExists.password);
    console.log(isPasswordMatched);

    // Access Granted: Send AccessToken, RefreshToken
    return {}
};

export const AuthServices = {
    loginUser
}