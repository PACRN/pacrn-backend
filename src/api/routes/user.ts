import { NextFunction, Request, Response } from "express";
import { Fail, Success } from "../../utilities/response-parser";
import { ReviewService } from "../../modules/services/review.service";
import { Container } from "typedi";
import { ReviewReqBody } from "../../types/reviewReqBodyType";
import { ScrappedReview } from "../../types/scrappedReviewType";
import { UserService } from "../../modules/services/user.service";

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userService = Container.get(UserService);
        const { email, password } = req.body;
        let data = await userService.loginUser(email, password)
        Success({ res, message: 'Fetched Successfully', data: data });
    } catch (ex) {
        next(ex);
    }
};

export const CreateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userService = Container.get(UserService);
        const reqBody = req.body
        let data = await userService.createUser(reqBody);
        Success({ res, message: 'Created Successfully', data: data });
    } catch (ex) {
        next(ex);
    }
};
