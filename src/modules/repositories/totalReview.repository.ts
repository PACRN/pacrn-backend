import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Service, Inject } from 'typedi';
import { TotalReview } from "../entities/totalReview.entities";

@Service()
export class TotalReviewRepository extends BaseRepository<TotalReview> {
    constructor(@Inject(() => DataSource) dataSource: DataSource) {
        super(TotalReview, dataSource)
    }
}