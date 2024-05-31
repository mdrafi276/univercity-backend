import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFecultyIntoDB = async (payload: TAcademicFaculty) => {





    const result = await AcademicFaculty.create(payload);
    return result;
};

const getAllAcademicFacultysFromDB = async () => {
    const result = await AcademicFaculty.find();
    return result;
};

const getSingleacAdemicFacultyFromDB = async (id: string) => {
    const result = await AcademicFaculty.findById(id);
    return result;
};

const updateacAdemicFacultyIntoDB = async (
    id: string,
    payload: Partial<TAcademicFaculty>,
) => {

    const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};

export const AcademicFacultyServices = {
    createAcademicFecultyIntoDB,
    getAllAcademicFacultysFromDB,
    getSingleacAdemicFacultyFromDB,
    updateacAdemicFacultyIntoDB

};
