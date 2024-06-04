import mongoose from "mongoose";
import { TErrorSuorces, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: mongoose.Error.CastError): TGenericErrorResponse => {

    const match = err.message.match(/"([^"]*)"/);
    const extractedMsg = match && match[1];
    const errorSource: TErrorSuorces = [{
        path: err.path,
        message: `${extractedMsg} is already exists`
    }];
    const statusCode = 400;

    return {
        statusCode,
        message: 'Cast Error',
        errorSource
    }
}
export default handleDuplicateError;