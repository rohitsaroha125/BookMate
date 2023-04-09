"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.HttpError = void 0;
class HttpError extends Error {
    constructor(statusCode, message, stack) {
        super(message);
        this.statusCode = statusCode;
        this.stack = stack;
    }
}
exports.HttpError = HttpError;
// error handler middleware
const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    const status = error instanceof HttpError ? error.statusCode : 500;
    const message = error instanceof HttpError ? error.message : 'Something went wrong';
    const stack = error.stack || '';
    if (process.env.NODE_ENV === 'production') {
        res.status(status).json({
            status: 'error',
            message
        });
    }
    else {
        res.status(status).json({
            status: 'error',
            message,
            stack: stack.split("\n")
        });
    }
};
exports.errorHandler = errorHandler;
