import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicFecultyIntoDB = async (payload: TAcademicDepartment) => {

  const isDepartementExist = await AcademicDepartment.findOne({ name: payload.name })

  if (isDepartementExist) {
    throw new Error('This department is already exist!');
  }
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty').populate('academicDepartment');
  return result;
};

const getSingleacAdemicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

const updateacAdemicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {

  const result = await AcademicDepartment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicFecultyIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleacAdemicDepartmentFromDB,
  updateacAdemicDepartmentIntoDB

};
