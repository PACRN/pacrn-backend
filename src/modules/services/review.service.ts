import { In } from "typeorm";
import { Review } from "../entities/reviews.entities";
import { ReviewRepository } from "../repositories/review.repository";
import { BaseService } from './base.service';
import { Service, Inject } from 'typedi';

@Service()
export class ReviewService extends BaseService<Review> {
    constructor(@Inject(() => ReviewRepository) private reviewRepository: ReviewRepository) {
        super(reviewRepository)
    }

    public async GetReviews(): Promise<Review[]> {
        try {
            let data = this.repository.findAll({
               
            })
            return data
        }
        catch (ex) {
            throw ex
        }
    }

    public async CreateReviews(review: Review[]): Promise<Review[]> {
        try {
            const scrappedIds = review.map(review => review.scrappedId)
            const existingReviews = await this.repository.findAll({
                where: {
                    scrappedId: In(scrappedIds)
                }
            })
            const newReviews = review.filter(review =>
                !existingReviews.some(existingReview => existingReview.scrappedId.toString() === review.scrappedId.toString())
            )
            if (newReviews.length > 0) {
                let data = await this.repository.createAll(newReviews)
                return data
            }
            return null
        } catch (ex) {
            throw ex
        }
    }
}