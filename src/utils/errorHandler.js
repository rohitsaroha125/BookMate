"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const HttpErrorClass_1 = __importDefault(require("./HttpErrorClass"));
// error handler middleware
const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    const status = error instanceof HttpErrorClass_1.default ? error.statusCode : 500;
    const message = error instanceof HttpErrorClass_1.default ? error.message : 'Something went wrong';
    const stack = error.stack || '';
    console.error(status, message, stack);
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
