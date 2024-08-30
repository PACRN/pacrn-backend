import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Service, Inject } from 'typedi';
import { Review } from "../entities/reviews.entities";

@Service()
export class ReviewRepository extends BaseRepository<Review> {
    constructor(@Inject(() => DataSource) datasource: DataSource) {
        super(Review, datasource)
    }
}