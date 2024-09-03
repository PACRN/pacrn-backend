import { NextFunction, Request, Response } from "express";
import { Fail, Success } from "../../utilities/response-parser";
import { ReviewService } from "../../modules/services/review.service";
import { Container } from "typedi";
import { ReviewReqBody } from "../../types/reviewReqBodyType";
import { ScrappedReview } from "../../types/scrappedReviewType";

export const GetAllReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const reviewService = Container.get(ReviewService);
        let data = await reviewService.GetReviews();
        console.log("The data is: ", data), Success({
            res,
            message: "Fetched Successfully",
            data: data
        });
        Success({ res, message: 'Fetched Successfully', data: data });
    } catch (ex) {
        next(ex);
    }
};

export const CreateReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const reviewService = Container.get(ReviewService);
        const reqBody = req.body
        const scrappedData = [
            {
                userName: "Delay Lowry",
                review: "I like the layout of the place",
                rating: 3,
                scrappedId: 1,
                source: "Google"
            },
            {
                userName: "John Doe",
                review: "Great service and friendly staff",
                rating: 5,
                scrappedId: 2,
                source: "Google"
            }
        ];
        let data = await reviewService.CreateReviews(req.body)
        Success({ res, message: 'Created Successfully', data: data });
    } catch (ex) {
        next(ex);
    }
};
