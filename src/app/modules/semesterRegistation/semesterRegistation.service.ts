import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { TSemesterRegistration } from "./semesterRegistation.interface"
import { SemesterRegistation } from "./semesterRegistation.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { registrationStatus } from "./semesterRegistration.constents";

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
    //check is there any registered semester  that is already 'UPCOMING' | 'ONGOING'

    const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistation.findOne(
        {
            $or: [
                { status: registrationStatus.UPCOMING },
                { status: registrationStatus.ONGOING }
            ]
        }
    );
    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppError(httpStatus.BAD_REQUEST, ` There is  already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester!`)
    }

    const academicSemister = payload?.academicSemester;

    const isAcademicSemesterExists = await AcademicSemester.findById(academicSemister)

    if (!isAcademicSemesterExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This academic semester not found')
    }
    // check if the semester is already registered!
    const isSemesterRegistrationExists = await SemesterRegistation.findOne(academicSemister)

    if (isSemesterRegistrationExists) {
        throw new AppError(httpStatus.CONFLICT, 'This semester already registered')
    }

    const result = await SemesterRegistation.create(payload)
    return result
}

const getAllSemesterRegistrationIntoDB = async (query: Record<string, unknown>) => {

    const semesterRegistratonQuery = new QueryBuilder(SemesterRegistation.find().populate('academicSemester'), query).filter().sort().paginate().fields();
    const result = await semesterRegistratonQuery.modelQuery;
    return result;
};


const getSingleSemesterRegistrationIntoDB = async (id: string) => {

    //if the requested registered semester is exists



    const result = await SemesterRegistation.findById(id);
    return result
}
const updateSemesterRegistrationIntoDB = async (id: string, payload: Partial<TSemesterRegistration>) => {
    const isSemesterRegistrationExists = await SemesterRegistation.findById(id)

    if (!isSemesterRegistrationExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This  semester not found')
    }

    //if the requested semester registration i sended , we will not update anything
    const currentSemesterStatus = isSemesterRegistrationExists.status;
    const requestedStatus = payload.status;
    if (currentSemesterStatus === registrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST, `This semester is an Already ${currentSemesterStatus} registered semester`)
    }
    // 'UPCOMING' ---> 'ONGOING' ---> 'ENDED'
    if (currentSemesterStatus === registrationStatus.UPCOMING && requestedStatus == registrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus} `)
    }

    if (currentSemesterStatus === registrationStatus.ONGOING && requestedStatus == registrationStatus.UPCOMING) {
        throw new AppError(httpStatus.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus} `)
    }
    const result = await SemesterRegistation.findByIdAndUpdate(id, payload,
        {
            new: true,
            runValidators: true
        }
    )
    return result;
}
export const SemesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationIntoDB,
    getSingleSemesterRegistrationIntoDB,
    updateSemesterRegistrationIntoDB
}   