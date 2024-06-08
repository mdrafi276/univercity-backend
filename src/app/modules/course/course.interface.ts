import { Types } from "mongoose";
import { TDays } from "../offeredCourse/offeredCourse.interface";

export type TPreRequisiteCourses = {
    course: Types.ObjectId;
    isDeleted: boolean;
}

export type TCourse = {
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses: [TPreRequisiteCourses]
}

export type TCourseFaculty = {
    course: Types.ObjectId,
    faculties: [Types.ObjectId]
}

export type TSchedule = {
    days: TDays[],
    startTime: string,
    endTime: string,
}