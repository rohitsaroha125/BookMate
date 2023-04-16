class HttpError extends Error{
    statusCode: number;
    stack?: string;

    constructor(statusCode: number, message: string, stack?: string) {
        super(message)
        this.statusCode = statusCode
        this.stack = stack
    }
}

export default HttpError