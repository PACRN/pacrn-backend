import Container from "typedi";
import { NextFunction, Request, Response } from 'express';
import { Fail, Success } from "../../utilities/response-parser";
import { CareRepository } from "../../modules/repositories/care.repository";
import { CareService } from "../../modules/services/care.service";
import { CareType } from "../../modules/entities/careTypes.entities";

export const GetCares = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const careService = Container.get(CareService);
        let data = await careService.GetCares()
        console.log(data);
        Success({ res, message: 'Fetched Successfully', data: data });
    } catch (error) {
        next(error);
    }
}

export const CreateCare = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const careService = Container.get(CareService);
        let care = req.body;
        let data = await careService.CreateCare(req.body);
        if (data.careTypes.length > 0) {
            Promise.all(care.careTypes.map(async (careType: CareType) => await careService.AddCareType(data.id, careType)));
        }
        Success({ res, message: 'Created Successfully', data: data });
    } catch (error) {
        next(error);
    }
}

export const UpdateCare = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const careService = Container.get(CareService);
        let data = await careService.UpdateCare(req.body);
        Success({ res, message: 'Updated Successfully', data: data });
    } catch (error) {
        next(error);
    }
}

export const AddCareType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const careService = Container.get(CareService);
        let data = await careService.AddCareType(parseInt(req.params.id), req.body);
        Success({ res, message: 'CareType Added Successfully', data: data });
    } catch (error) {
        next(error);
    }
}

// Delete care
export const DeleteCare = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const careService = Container.get(CareService);
        await careService.DeleteCare(parseInt(req.params.id));
        Success({ res, message: 'Deleted Successfully' });
    } catch (error) {
        next(error);
    }
}