import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidation } from './offeredCourse.validation';
import { OfferedCourseService } from './offeredCouese.service';
const route = express.Router();

route.post('/create-offered-course', validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema), OfferedCourseService.createOfferedCoueseIntoDB)
export const OfferedCourseRoute = route;