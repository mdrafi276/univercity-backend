import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistationValidations } from './semesterRegistation.validation';
import { SemesterRegistrationController } from './semesterRegistation.controller';
const router = express.Router();

router.post(
    '/create-semester-Registation', validateRequest(SemesterRegistationValidations.createSemesterRegistrationValidationSchema,

    ),
    SemesterRegistrationController.createSemesterRegistration);



router.get(
    '/:id', SemesterRegistrationController.getSingleSemesterRegistration);

router.patch(
    '/:id', validateRequest(SemesterRegistationValidations.updateSemesterRegistrationValidationSchema), SemesterRegistrationController.updateSemesterRegistration);

router.get(
    '/', SemesterRegistrationController.getAllSemesterRegistration);


export const SemesterRegistrationRoutes = router;