"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err) => {
    const errorStack = Object.values(err.errors).map(err => {
        return {
            path: err.path,
            message: err.message,
        };
    });
    return {
        status: 400,
        message: 'Validation Error',
        errorMessages: errorStack,
    };
};
exports.handleValidationError = handleValidationError;
