import { NextFunction, Request, Response } from 'express';
import { Fail, Success } from "../../utilities/response-parser";
import { ProvidersService } from '../../modules/services/providers.service';
import { Container } from 'typedi';

export const GetAllProviders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const providersService = Container.get(ProvidersService);
        let data = await providersService.GetAllProviders()
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

// Get nearest providers
export const GetNearestProviders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const providersService = Container.get(ProvidersService);
        let data = await providersService.GetNearestProviders();
        console.log(data);
        Success({ res, message: 'Fetched Successfully', data: data });
    } catch (error) {
        next(error);
    }
}