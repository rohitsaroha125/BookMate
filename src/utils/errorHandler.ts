import { Request, Response, NextFunction } from "express";
import HttpError from "./HttpErrorClass";

// error handler middleware
export const errorHandler = (error: HttpError, req: Request, res: Response, next: NextFunction) => {

    if (res.headersSent) {
        return next(error)
    }

    const status = error instanceof HttpError ? error.statusCode : 500
    const message = error instanceof HttpError ? error.message : 'Something went wrong'
    const stack = error.stack || ''

    console.error(status, message, stack);

    if (process.env.NODE_ENV === 'production') {
        res.status(status).json({
            status: 'error',
            message
        })
    } else {
        res.status(status).json({
            status: 'error',
            message,
            stack: stack.split("\n")
        })
    }
}