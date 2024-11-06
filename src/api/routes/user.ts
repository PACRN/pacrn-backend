import { NextFunction, Request, Response } from "express";
import { Fail, Success } from "../../utilities/response-parser";
import { ReviewService } from "../../modules/services/review.service";
import { Container } from "typedi";
import { ReviewReqBody } from "../../types/reviewReqBodyType";
// import { ScrappedReview } from "../../types/scrappedReviewType";
import { UserService } from "../../modules/services/user.service";
import SendGridHelper from "../../utilities/sendGridHelper";
import { EmailVerificationTemplate } from "../../utilities/EmailTemplate/EmailTemplate";

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
        await SendGridHelper.sendEmailWithFile(
            data.email,
            "spot.care verification code",
            `Please find the otp`,
            EmailVerificationTemplate(data.firstName, data.verificationCode),
            [],
        )
        Success({ res, message: 'Created Successfully', data: [] });
    } catch (ex) {
        next(ex);
    }
};

export const UpdateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userService = Container.get(UserService);
        const reqBody = req.body
        let data = await userService.updateUser(reqBody);
        Success({ res, message: 'Updated Successfully', data });
    } catch (ex) {
        next(ex);
    }
};

export const RetryVerification = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userService = Container.get(UserService);
        const { email } = req.body;
        let data = await userService.findOneBy({ where: { email } });
        await SendGridHelper.sendEmailWithFile(
            data.email,
            "spot.care verification code",
            `Please find the otp`,
            EmailVerificationTemplate(data.firstName, data.verificationCode),
            [],
        )
        Success({ res, message: 'Created Successfully', data: [] });
    } catch (ex) {
        next(ex);
    }
}

export const VerifyEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userService = Container.get(UserService);
        const { email, otp } = req.body;
        let data = await userService.verifyEmail(email, otp);
        Success({ res, message: 'Verified Successfully', data: data });
    } catch (ex) {
        next(ex);
    }
};

export const GetUserByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userService = Container.get(UserService);
        const { email } = req.query;
        let data = await userService.getUserByEmail(email.toString());
        Success({ res, message: 'Verified Successfully', data: data });
    } catch (ex) {
        next(ex);
    }
};
