import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.iinterface";
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

    if (await !User.isPasswordMatched(payload.password, user.password))

        // Access Granted: Send AccessToken, RefreshToken
        return {}
};

export const AuthServices = {
    loginUser
}