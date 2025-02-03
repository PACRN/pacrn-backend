import { Wishlist } from "../entities/wishlist.entities";
import { WishlistRepository } from "../repositories/wishlist.repository";
import { ProvidersRepository } from "../repositories/providers.repository";
import { BaseService } from "./base.service";
import { Service, Inject } from 'typedi';
import { FindManyOptions } from "typeorm";

@Service()
export class WishlistService extends BaseService<Wishlist> {
    constructor(
        @Inject(() => WishlistRepository) private wishlistRepository: WishlistRepository,
        @Inject(() => ProvidersRepository) private providerRepository: ProvidersRepository
    ) {
        super(wishlistRepository)
    }

    public async AddWishlist(Wishlist: Wishlist): Promise<Wishlist> {
        try {
            return await this.wishlistRepository.create(Wishlist)
        } catch (ex) {
            throw ex
        }
    }

    public async GetWishlist(customerId: number): Promise<Wishlist[]> {
        try {
            const options: FindManyOptions<Wishlist> = {
                where: { customerId: customerId },
                relations: ['provider',
                    'provider.images',
                    'provider.rating',
                    'provider.locations',
                    'provider.totalReview',
                ]
            }
            let data = await this.repository.findAll({ ...options });
            return data;
        } catch (error) {
            throw error
        }
    }

    public async DeleteFromWishlist(providerCode: string): Promise<void> {
        try {
            await this.repository.deleteBasedOnCodition({ providercode: providerCode })
        } catch (ex) {
            throw ex
        }
    }
}