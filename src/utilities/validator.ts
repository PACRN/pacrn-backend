import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// Validator for request parameters
export const paramValidator = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.params);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};

// Validator for query parameters
export const queryValidator = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.query);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};

// Validator for request body
export const bodyValidator = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};
