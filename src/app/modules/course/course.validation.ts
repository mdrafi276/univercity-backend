import { boolean, number, z } from "zod";



const PreRequisiteCoursesValidationSchema = z.object({
    course: z.string(),
    isDeleted: boolean().optional(),
})

const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        prefix: z.string(),
        code: z.number(),
        credits: z.number(),
        preRequisiteCourses: z.array
            (PreRequisiteCoursesValidationSchema).optional(),
    })
})



const updatePreRequisiteCoursesValidationSchema = z.object({
    course: z.string(),
    isDeleted: boolean().optional(),
})

const updateCourseValidaitonSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        prefix: z.string().optional(),
        code: z.number().optional(),
        credits: z.number().optional(),
        preRequisiteCourses: z.array
            (PreRequisiteCoursesValidationSchema).optional(),
    })
})


// const updateCourseValidaitonSchema = createCourseValidationSchema.partial()


const facultieWithCourseValidatonSchema = z.object({
    body: z.object({

        faculties: z.array(z.string())

    })
})

export const CourseValidaiton = {
    createCourseValidationSchema,
    updateCourseValidaitonSchema,
    updatePreRequisiteCoursesValidationSchema,
    facultieWithCourseValidatonSchema

}