import { NextFunction, Request, Response } from 'express';
import { Fail, Success } from "../../utilities/response-parser";
import { ReviewService } from '../../modules/services/review.service';
import { Container } from 'typedi';

export const GetAllReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviewService = Container.get(ReviewService)
        let data = await reviewService.GetReviews();
        console.log("The data is: ", data),
            Success({ res, message: 'Fetched Successfully', data: data });
    } catch (ex) {
        next(ex);
    }
}