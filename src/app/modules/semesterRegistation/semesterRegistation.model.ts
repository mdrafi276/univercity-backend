import mongoose, { Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistation.interface";

import { SemesterRegistrationStatus } from "./semesterRegistration.constents";
import { string } from "zod";

const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>({
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        unique: true,
        required: true,
    },
    status: {
        type: string,
        enum: SemesterRegistrationStatus,
        default: 'UPCOMING',
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
    },
    minCredit: {
        type: Number,
        default: 3,
    },
    maxCredit: {
        type: Number,
        default: 15,
    }
},
    {
        timestamps: true,
    }
);

export const SemesterRegistation = mongoose.model<TSemesterRegistration>("SemesterRegistration", semesterRegistrationSchema) 