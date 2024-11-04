import { NextFunction, Request, Response } from "express";
import { Fail, Success } from "../../utilities/response-parser";
import { ReviewService } from "../../modules/services/review.service";
import { Container } from "typedi";
import { ReviewReqBody } from "../../types/reviewReqBodyType";
import axios from "axios";
import Place from "../../types/googleApiPlaceIDBody";
import ReviewScrape from "../../utilities/scrapping/reviewscrapper";
import { TotalReviewType } from "../../types/totalReviewType";

export const GetAllReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const reviewService = Container.get(ReviewService);
        let data = await reviewService.GetReviews();
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
        let requestBody: ReviewReqBody = req.body
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${requestBody.place}&key=${process.env.GOOGLEAPI}`
        try {
            const response = await axios.get(url)
            const responseData: Place = response.data
            const googleMapUrl = `https://www.google.com/maps/place/?q=place_id:${responseData.results[0].place_id}`
            const scrappedData: any = await ReviewScrape(googleMapUrl)
            const reviewService = Container.get(ReviewService);
            let totalReviewResult = await reviewService.CreateTotalReviews(scrappedData.totalData[0], requestBody.providerCode)
            let reviewResult = await reviewService.CreateReviews(scrappedData.reviews, totalReviewResult.id)
            Success({ res, message: "Reviews", data: reviewResult })
        } catch (ex) {
            next(ex);
        }
    } catch (ex) {
        next(ex);
    }
};
