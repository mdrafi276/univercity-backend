import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { SemesterRegistation } from "../semesterRegistation/semesterRegistation.model";
import { TOfferedCourse } from "./offeredCourse.interface"
import { OfferCouese } from "./offeredCourse.modle"
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.models";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";

const createOfferedCoueseIntoDB = async (payload: TOfferedCourse) => {
    const { semesterRegistration, academicFaculty, academicDepartment, days, startTime, endTime, section, course, faculty } = payload;
    //check if the semester registration id is exist

    const isSemesterRegistrationExists = await SemesterRegistation.findById(semesterRegistration);
    if (!isSemesterRegistrationExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found !')
    }
    const academicSemester = isSemesterRegistrationExists.academicSemester;

    const isAcademicFacultyExists = await academicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty not found !')
    }

    const isAcademicDepartmnetExists = await academicDepartment.findById(academicDepartment);
    if (!isAcademicDepartmnetExists) {
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

    // Check if the department is belong to the faculty 
    const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
        academicFaculty,
        _id: academicDepartment,
    });
    if (!isDepartmentBelongToFaculty) {
        throw new AppError(httpStatus.BAD_REQUEST, `This ${isAcademicDepartmnetExists.name} not belong to this ${isAcademicFacultyExists.name}`)
    }

    // check if the same offer course some section in same registered semester exists

    const isSameOfferedCorseExistWithSameRegisteredSemesterWithSection = await OfferCouese.findOne({
        semesterRegistration,
        course,
        section
    })
    if (isSameOfferedCorseExistWithSameRegisteredSemesterWithSection) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Offered course with same section is already exist!')
    }

    //get the schedule of the faculties

    const assignedSchedules = await OfferCouese.find({
        semesterRegistration,
        faculty,
        days: { $in: { days } },
    }).select('days startTime endTime');

    const newSchedule = {
        days,
        startTime,
        endTime
    }

    assignedSchedules.forEach((schedule) => {
        const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`)
        const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`)
        const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`)
        const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`)

        if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
            throw new AppError(httpStatus.CONFLICT, `This faculty is not availabe at that time ! Choose other time or Day`)

        }
    })
    // return null;
    const result = await OfferCouese.create(...payload, academicSemester)
    return result;

}
export const OfferedCourseService = {
    createOfferedCoueseIntoDB
}