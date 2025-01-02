import { NextFunction, Request, Response } from "express";
import { Fail, Success } from "../../utilities/response-parser";
import { Container } from "typedi";
import { UserService } from "../../modules/services/user.service";
import SendGridHelper from "../../utilities/sendGridHelper";
import { EmailVerificationTemplate, PasswordResetTemplate } from "../../utilities/EmailTemplate/EmailTemplate";
import AzureBlobStorageHelper from "../../utilities/azureBlobStorageHelper";
import { CONSTANTS } from "../../utilities/constants";
import { User } from "../../modules/entities/user.entities";
import { omit } from "../../utilities/omitKeys";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userService = Container.get(UserService);
        const { email, password } = req.body;
        let data = await userService.loginUser(email, password)
        if (data === null) return Fail({ statusCode: 402, res: res, message: "Please complete the verification process - 402" })
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

export const ForgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userService = Container.get(UserService);
        const { email } = req.body;
        let user = await userService.findOneBy({ where: { email } });

        if (!user) return Fail({ res, message: 'User not found' });
        if (user.isVerified === false) return Fail({ res, message: 'User not verified' });

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1-hour expiry

        await userService.create(user);

        const resetUrl = `${process.env.FRONTEND_URL}reset-password?token=${resetToken}`;
        console.log(resetUrl);
        // await sendResetEmail(user.email, resetUrl);

        await SendGridHelper.sendEmailWithFile(
            user.email,
            "Reset your password",
            `Please reset your password`,
            PasswordResetTemplate(user.firstName, resetUrl),
            [],
        )

        Success({ res, message: 'Password reset email sent.', data: {} });
    } catch (ex) {
        next(ex);
    }
};

export const ResetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userService = Container.get(UserService);
        const { token, newPassword } = req.body;

        const user = await userService.findOneBy({ where: { resetToken: token } });

        if (!user || user.resetTokenExpiry < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const secretKey = process.env.HASH_SECRET_KEY!; // Add your secret key to .env
        const hmac = crypto.createHmac('sha256', secretKey).update(newPassword).digest('hex');
        const password = await bcrypt.hash(hmac, 10);

        user.password = password;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await userService.create(user);

        Success({ res, message: 'Password updated successfully.', data: {} });
    } catch (ex) {
        next(ex);
    }
};

export const RemoveProfilePicture = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userService = Container.get(UserService);
        const { email } = req.query;
        let data = await userService.removeProfilePicture(email.toString());
        Success({ res, message: 'Verified Successfully', data: data });
    } catch (ex) {
        next(ex);
    }
};