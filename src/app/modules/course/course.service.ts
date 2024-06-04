import { Course } from "./course.model"

const createCourseIntoDB = async () => {
    const result = await Course.create();
    return result;
}

const getAllCourseFromDB = async () => {
    const result = await Course.find();
    return result;
}

const getSingleCoueseFromDB = async (id: string) => {
    const result = await Course.findById(id);
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

export const CourseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    deleteCourseFromDB,
    getSingleCoueseFromDB
}