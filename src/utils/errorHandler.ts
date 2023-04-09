import { Request, Response, NextFunction } from "express";

export class HttpError extends Error{
    statusCode: number;
    stack?: string;

    constructor(statusCode: number, message: string, stack?: string) {
        super(message)
        this.statusCode = statusCode
        this.stack = stack
    }
}

// error handler middleware
export const errorHandler = (error: HttpError, req: Request, res: Response, next: NextFunction) => {

    if (res.headersSent) {
        return next(error)
    }

    const status = error instanceof HttpError ? error.statusCode : 500
    const message = error instanceof HttpError ? error.message : 'Something went wrong'
    const stack = error.stack || ''

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