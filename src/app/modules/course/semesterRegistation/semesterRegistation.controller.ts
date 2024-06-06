import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { SemesterRegistrationService } from "./semesterRegistation.service";

const createSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationService.createSemesterRegistrationIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'semester registration successfully',
        data: result,
    });
})

const getAllSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationService.getAllSemesterRegistrationIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is retrieved successfully',
        data: result,
    });
})


const getSingleSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SemesterRegistrationService.getSingleSemesterRegistrationIntoDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration retrieved succesfully',
        data: result,
    });
})


const updateSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationService.updateSemesterRegistrationIntoDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semester is created succesfully',
        data: result,
    });
});


export const SemesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration
}