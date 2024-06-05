import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";


const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'course is created succesfully',
        data: result,
    });
});

const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCourseFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' Course are retrieved successfully',
        data: result,
    });
});

const getSingleCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const result =
        await CourseServices.getSingleCoueseFromDB(courseId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is retrieved succesfully',
        data: result,
    });
});

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.deleteCourseFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is deleted  succesfully',
        data: result,
    });
})


const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.updateServiceIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is deleted  succesfully',
        data: result,
    });
})


const asignFaculties = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.asingFacultiesIntoDB(courseId, faculties);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculties  assign   succesfully',
        data: result,
    });
})
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.asingFacultiesIntoDB(courseId, faculties);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'faculties removed   succesfully',
        data: result,
    });
})



export const courseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    updateCourse,
    asignFaculties,
    removeFacultiesFromCourse

};
