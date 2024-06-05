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
router.patch('/:id', validateRequest, courseControllers.updateCourse)
router.put('/:courseId/asign-faculties', validateRequest(CourseValidaiton.facultieWithCourseValidatonSchema), courseControllers.asignFaculties)

router.delete('/:courseId/remove-faculties', validateRequest, courseControllers.removeFacultiesFromCourse)

export const courseRoutes = router;
