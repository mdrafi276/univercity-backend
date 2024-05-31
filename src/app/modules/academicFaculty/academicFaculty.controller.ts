import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.createAcademicFecultyIntoDB(
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty is created succesfully',
        data: result,
    });
});

const getAllAcademicFacultys = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultysFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Facultys are retrieved successfully',
        data: result,
    });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { FacultyId } = req.params;
    const result =
        await AcademicFacultyServices.getSingleacAdemicFacultyFromDB(FacultyId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty is retrieved succesfully',
        data: result,
    });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await AcademicFacultyServices.updateacAdemicFacultyIntoDB(
        semesterId,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semester is retrieved succesfully',
        data: result,
    });
});

export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFacultys,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
};
