import { Response } from 'express';

export function Success({ statusCode = 200, res, message, data = {}, totalCount = 0 }: { res: Response, message: string, statusCode?: number, data?: Object, totalCount?: number }) {
    if (Array.isArray(data)) {
        return res.status(statusCode).json({
            status: 'success',
            message,
            count: data.length,
            total: totalCount,
            data: data,
        });
    }
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
