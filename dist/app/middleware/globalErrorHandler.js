"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const index_1 = __importDefault(require("../../config/index"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const ValidationError_1 = require("../../errors/ValidationError");
const globalErrorHandler = (error, req, res, next) => {
    console.error('globalErrorHandler:', error);
    let statusCode = 400;
    let message = 'Something went wrong!';
    let errorMessages = [];
    if (error.name === 'ValidationError') {
        const simplifiedError = (0, ValidationError_1.handleValidationError)(error);
        statusCode = simplifiedError.status;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: index_1.default.env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
    next();
};
exports.globalErrorHandler = globalErrorHandler;
