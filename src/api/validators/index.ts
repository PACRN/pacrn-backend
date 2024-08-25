import Joi from "joi";

export const idSchema = Joi.object({
    id: Joi.number().integer().required()
});

export const createCareSchema = Joi.object({
    name: Joi.string().required(),
    tenantId: Joi.number().integer().required()   
});

export const NearestProviderSchema = Joi.object({
    page: Joi.number().integer().required(),
    pageSize: Joi.number().integer().required(),
    careType: Joi.string().required(),
    radius: Joi.number().integer().required(),
    lat: Joi.string().required(),
    lon: Joi.string().required()
});