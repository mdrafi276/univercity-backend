import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model"
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
}

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query)
        .search(CourseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields()
    const result = await courseQuery.modelQuery;
    return result;
}

const getSingleCoueseFromDB = async (id: string) => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course');
    return result;
};


const deleteCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndDelete(id,
        { isDeleted: true }, {
        new: true,
    }
    );
    return result
}


const updateServiceIntoDB = async (id: string, payload: Partial<TCourse>) => {

    const { preRequisiteCourses, ...courseRemainingData } = payload;
    //a step1: basic course info update

    const session = await mongoose.startSession();

    session.startTransaction()
    try {
        const updateBasicCourseInfo = await Course.findByIdAndUpdate(id, courseRemainingData,
            {
                new: true,
                runValidators: true,
                session
            }
        );
        if (!updateBasicCourseInfo) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Faield to updated Course')
        }



        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            const deletedPreRequisites = preRequisiteCourses.filter((el) => el.course && el.isDeleted).map((el) => el.course)

            const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(id,
                {
                    $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } }
                }, {
                new: true,
                runValidators: true,
                session
            }
            );

            if (!deletedPreRequisitesCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Faield to deleted Course')
            };

            const newPreRequisite = preRequisiteCourses?.filter((el) => el.course && !el.isDeleted);
            const newPreRequisiteCourses = await Course.findByIdAndUpdate(id,
                {
                    $addToSet: { preRequisiteCourses: { $each: newPreRequisite } }
                }
            );
            if (!newPreRequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Faield to updated Course')
            }
            const result = await Course.findById(id).populate('preRequisiteCourses')

            return result;


        }

        await session.commitTransaction();
        await session.endSession()

    }
    catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, ' Failed to resived course');
    }


}



const asingFacultiesIntoDB = async (id: string, payload: Partial<TCourseFaculty>,) => {
    const result = await CourseFaculty.findByIdAndUpdate(id,
        {
            course: id,
            $addToSet: { faculties: { $each: payload } },
        },
        { upsert: true, new: true }
    )

    return result;

};
const removeFacultiesFromDB = async (id: string, payload: Partial<TCourseFaculty>,) => {
    const result = await CourseFaculty.findByIdAndUpdate(id,
        {
            $pull: { faculties: { $in: payload } }
        },
        { new: true }
    )

    return result;

};

export const CourseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    deleteCourseFromDB,
    getSingleCoueseFromDB,
    updateServiceIntoDB,
    asingFacultiesIntoDB,
    removeFacultiesFromDB,
}