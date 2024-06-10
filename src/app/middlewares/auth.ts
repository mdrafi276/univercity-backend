import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import Jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";


const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
        };

        const decoded = Jwt.verify(token, config.JWT_ACCRESS_SECRET as string) as JwtPayload
        //check if the token is valid
        const { role, userId, iat } = decoded;


        // checking if the user is exist!
        const user = (await User.isUserExistsByCustomId(userId));

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

        if (user.passwordChangedAt && User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number))
            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');

            }
        // console.log(decode);
        req.user = decoded as JwtPayload;
        next()


    });
};

export default auth;
