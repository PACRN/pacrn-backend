import { NextFunction, Request, Response } from 'express';
import { Fail, Success } from "../../utilities/response-parser";
import { ProvidersService } from '../../modules/services/providers.service';
import { Container } from 'typedi';
import { convertGeoTypesToNumber } from '../../utilities/helpers';

export const GetAllProviders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const providersService = Container.get(ProvidersService);
        const pagination = { page: parseInt(req.query.page as string) || 1, pageSize: parseInt(req.query.pageSize as string) || 10 };
        let data = await providersService.GetAllProviders(pagination)
        console.log(data);
        Success({ res, message: 'Fetched Successfully', data: data });
    } catch (error) {
        next(error);
    }
}

export const GetProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get id from req
        const id = parseInt(req.params.id);
        const providersService = Container.get(ProvidersService);
        let data = await providersService.GetProvider(id);
        console.log(data);
        Success({ res, message: 'Fetched Successfully', data: data });
    } catch (error) {
        next(error);
    }
}

export const FindProvidersByCare = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { care } = req.params;
        const providersService = Container.get(ProvidersService);
        const pagination = { page: parseInt(req.query.page as string) || 1, pageSize: parseInt(req.query.pageSize as string) || 10 };
        let data = await providersService.FindProvidersByCare(care, pagination);
        console.log(data);
        Success({ res, message: 'Fetched Successfully', data: data });
    } catch (error) {
        next(error);
    }
}

// Get nearest providers
export const GetNearestProviders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const providersService = Container.get(ProvidersService);
        const { page, pageSize, careType, radius, lat, lon } = req.query;
        const pagination = { page: parseInt(page as string) || 1, pageSize: parseInt(pageSize as string) || 10 };
        let result = await providersService.GetNearestProviders(careType as string, parseInt(radius as string), convertGeoTypesToNumber(lat as string, lon as string), pagination);
        Success({ res, message: 'Fetched Successfully', data: result.data, totalCount: result.total });
    } catch (error) {
        next(error);
    }
}