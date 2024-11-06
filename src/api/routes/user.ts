import { NextFunction, Request, Response } from "express";
import { Fail, Success } from "../../utilities/response-parser";
import { ReviewService } from "../../modules/services/review.service";
import { Container } from "typedi";
import { ReviewReqBody } from "../../types/reviewReqBodyType";
import { UserService } from "../../modules/services/user.service";
import SendGridHelper from "../../utilities/sendGridHelper";
import { EmailVerificationTemplate } from "../../utilities/EmailTemplate/EmailTemplate";
import AzureBlobStorageHelper from "../../utilities/azureBlobStorageHelper";
import { CONSTANTS } from "../../utilities/constants";
import { User } from "../../modules/entities/user.entities";
import { omit } from "../../utilities/omitKeys";

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

export const UpdateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userService = Container.get(UserService);
        const { email, firstName, lastName, phone } = req.body;
        let profileUrl = null;
        if (req.file) {
            const filePath = req.file.path;
            const filename = req.file.filename;
    
            const azureResult = await AzureBlobStorageHelper.uploadFile(CONSTANTS.AZURE.CONTAINERS.IMAGES, CONSTANTS.AZURE.FOLDERS.PROFILE_FOLDER + "/" + filename, filePath)
            profileUrl = azureResult._response.request.url.split("?")[0];
        }       

        let user: User = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            profilePicture: profileUrl
        }

        const data = await userService.updateUser(user);


        Success({ res, message: 'Emailed Successfully', data: omit(data, ['hashPassword', 'hashPassword', 'isVerified', 'password', 'verificationCode']) });

    } catch (error) {
        next(error)
    }
}