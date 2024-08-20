import { Response } from 'express';

export function Success({ statusCode = 200, res, message, data = {} }: { res: Response, message: string, statusCode?: number, data?: Object }) {
    return res.status(statusCode).json({
        status: 'success',
        message,
        data
    });
}

export function Fail({ statusCode = 500, res, message }: { res: Response, message: string, statusCode?: number }) {
    return res.status(statusCode).json({
        status: 'fail',
        message,
    });
}
