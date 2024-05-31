import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';


const router = express.Router();

router.post(
    '/create-academic-faculty',
    validateRequest(
        AcademicFacultyValidation.CreateAcademicFacultyValidationSchema,
    ),
    AcademicFacultyControllers.createAcademicFaculty,
);

router.get(
    '/:facultyId',
    AcademicFacultyControllers.getSingleAcademicFaculty,
);

router.patch(
    '/:facultyId',
    validateRequest(
        AcademicFacultyValidation.UpdateAcademicFacultyValidationSchema,
    ),
    AcademicFacultyControllers.updateAcademicFaculty,
);

router.get('/', AcademicFacultyControllers.getAllAcademicFacultys);

export const AcademicFacultyRoutes = router;
