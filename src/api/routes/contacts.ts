import { NextFunction, Request, Response } from "express";
import { Fail, Success } from "../../utilities/response-parser";
import { Container } from "typedi";
import { Contact } from "../../modules/entities/contact.entities";
import { ContactService } from "../../modules/services/contact.service";
import SendGridHelper from "../../utilities/sendGridHelper";


export const CreateContactMessages = async (req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const containerService = Container.get(ContactService)
        let requestBody: Contact = req.body
        let data = await containerService.CreateContactMessages(requestBody)
        Success({ res, message: "Message Send SuccessFully", data: data })
    } catch (ex) {
        next(ex)
    }
}

export const TestEmail = async (req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const { email } = req.query;
        await SendGridHelper.sendEmailWithFile(
            email.toString(),
            "This is a test email",
            "Please find the test email.",
        )
        Success({ res, message: 'Emailed Successfully', data: {} });
    } catch (ex) {
        next(ex)
    }
}