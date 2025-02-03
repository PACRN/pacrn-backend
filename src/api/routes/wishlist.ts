import { NextFunction, Request, Response } from "express";
import { Fail, Success } from "../../utilities/response-parser";
import { Container } from "typedi";
import { Wishlist } from "../../modules/entities/wishlist.entities";
import { WishlistService } from "../../modules/services/wishlist.service";

export const AddWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const containerService = Container.get(WishlistService)
        let requestBody: Wishlist = req.body
        let data = await containerService.AddWishlist(requestBody)
        Success({ res, message: "Provider added to the wishlist", data: data })
    } catch (ex) {
        next(ex)
    }
}

export const GetWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const code = parseInt(req.query.customerId as string);
        const containerService = Container.get(WishlistService)
        let data = await containerService.GetWishlist(code)
        Success({ res, message: 'Fetched Successfully', data: data })
    } catch (ex) {
        next(ex)
    }
}

export const DeleteFromWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const code = req.query.providerCode as string
        const containerService = Container.get(WishlistService)
        let data = await containerService.DeleteFromWishlist(code)
        Success({ res, message: 'Deleted Successfully' });
    } catch (ex) {
        next(ex)
    }
}