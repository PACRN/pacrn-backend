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

export const saveReportSchema = Joi.object({
    code: Joi.string().required(),
    category: Joi.string().required(),
    desc: Joi.string().empty()
})

export const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required',
    }),
    firstName: Joi.string().required().messages({
      'any.required': 'First name is required',
    }),
    lastName: Joi.string().optional(),
    phone: Joi.string().optional().pattern(/^\+?[1-9]\d{1,14}$/).messages({
      'string.pattern.base': 'Phone number is invalid',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required',
    }),
  });
  
  export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
    }),
  });