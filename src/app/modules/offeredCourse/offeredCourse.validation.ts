import { string, z } from "zod";
import { Days } from "./offeredCourse.constents";

const createOfferedCourseValidationSchema = z.ObjectId({

    body: z.object({
        semesterRegistration: z.string(),
        academicSemester: z.string(),
        academicFAculty: z.string(),
        academicDepartment: z.string(),
        course: z.string(),
        section: z.number(),
        maxCapacity: z.number(),
        days: z.enum([...Days] as [string, ...string[]]).optional(),
        starttime: z.string(),
        endTime: z.string(),
    })
})

export const OfferedCourseValidation = {
    createOfferedCourseValidationSchema
}