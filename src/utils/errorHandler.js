"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
// error handler middleware
const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
    }
    else {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.errorHandler = errorHandler;
