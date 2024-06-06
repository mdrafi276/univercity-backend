import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { OfferedCourseService } from "./offeredCouese.service";

const createOfferedCouese = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferedCourseService.createOfferedCoueseIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Offered Course is create successfully",
        data: result,
    });
})
export const OfferCoueseController = {
    createOfferedCouese
}