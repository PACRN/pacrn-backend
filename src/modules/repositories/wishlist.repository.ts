import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Service, Inject } from 'typedi';
import { Wishlist } from "../entities/wishlist.entities";

@Service()
export class WishlistRepository extends BaseRepository<Wishlist> {
    constructor(@Inject(() => DataSource) datasource: DataSource) {
        super(Wishlist, datasource)
    }
}