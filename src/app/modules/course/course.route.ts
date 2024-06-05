import express from 'express';
import { CourseValidaiton } from './course.validation';
import { courseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
    '/create-course',
    validateRequest(
        CourseValidaiton.createCourseValidationSchema
    ),
    courseControllers.createCourse,
);


router.get('/:id', courseControllers.getAllCourses);
router.delete('/', courseControllers.deleteCourse);
router.get('/', courseControllers.getAllCourses);
router.put('/:courseId/asign-facultis', courseControllers.asignFaculties)

router.patch('/:id', validateRequest, courseControllers.updateCourse)

export const courseRoutes = router;
