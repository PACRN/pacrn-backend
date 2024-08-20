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