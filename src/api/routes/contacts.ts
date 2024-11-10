import { NextFunction, Request, Response } from "express";
import { Fail, Success } from "../../utilities/response-parser";
import { Container } from "typedi";
import { Contact } from "../../modules/entities/contact.entities";
import { ContactService } from "../../modules/services/contact.service";


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