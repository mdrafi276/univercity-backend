import { z } from "zod";
import { Days } from "./offeredCourse.constents";

const createOfferedCourseValidationSchema = z.object({

    body: z.object({
        semesterRegistration: z.string(),
        academicFAculty: z.string(),
        academicDepartment: z.string(),
        course: z.string(),
        section: z.number(),
        maxCapacity: z.number(),
        days: z.enum([...Days] as [string, ...string[]]).optional(),
        starttime: z.string().refine((time) => {
            const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            return regex.test(time)
        }, {
            message: 'Invalid time formate , expected "HH:MM" in 24 hourse formate'
        }),
        endTime: z.string(),
    }).refine((body) => {
        //startTime: 10:30 =>1970-01-01T10:30
        //endTime : 12:30 =>1970-01-01T12:30
        const start = new Date(`1970-01-T${body.starttime}:00`)
        const end = new Date(`1970-01-T${body.endTime}:00`)
        return end > start
    }, {
        message: 'Start time should be before End time',
    })
})

export const OfferedCourseValidation = {
    createOfferedCourseValidationSchema
}