import { Request, Response, NextFunction } from "express";

export class HttpError extends Error{
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode
    }
}

// error handler middleware
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {

    if (res.headersSent) {
        return next(error)
    }

    if (error instanceof HttpError) {
        res.status(error.statusCode).json({message: error.message})
    } else {
        res.status(500).json({ message: 'Something went wrong' })
    }
}