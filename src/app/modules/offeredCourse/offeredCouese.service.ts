import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { SemesterRegistation } from "../semesterRegistation/semesterRegistation.model";
import { TOfferedCourse } from "./offeredCourse.interface"
import { OfferCouese } from "./offeredCourse.modle"
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.models";

const createOfferedCoueseIntoDB = async (payload: TOfferedCourse) => {
    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty } = payload;
    //check if the semester registration id is exist

    const isSemesterRegistrationExists = await SemesterRegistation.findById(semesterRegistration);
    if (!isSemesterRegistrationExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found !')
    }
    const academicSemester = isSemesterRegistrationExists.academicSemester;

    const isSemesterFacultyExists = await academicFaculty.findById(academicFaculty);
    if (!isSemesterFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty not found !')
    }

    const isSemesterDepartmnetExists = await academicDepartment.findById(academicDepartment);
    if (!isSemesterDepartmnetExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic departmnet not found !')
    }

    const isCourseExists = await Course.findById(course);
    if (!isCourseExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course not found !')
    }

    const isFacultyExists = await Faculty.findById(faculty);
    if (!isFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !')
    }
    const result = await OfferCouese.create(...payload, academicSemes)
    return result;

}
export const OfferedCourseService = {
    createOfferedCoueseIntoDB
}