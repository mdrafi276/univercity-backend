import { z } from 'zod';

const CreateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department  must be string',
        required_error: "Name is Required"
      }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Department  must be string',
      required_error: 'Faculty is required'
    })

  })
})
const UpdateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department  must be string',
        required_error: "Name is Required"
      }).optional(),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Department  must be string',
      required_error: 'Faculty is required'
    }).optional(),

  })
})


export const AcademicDepartmentValidation = {
  CreateAcademicDepartmentValidationSchema,
  UpdateAcademicDepartmentValidationSchema
};
