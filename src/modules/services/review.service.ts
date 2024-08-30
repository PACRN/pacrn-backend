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
                relations: {
                    'provider': true
                },
                select: {
                    id: true,
                    'review': true,
                    'rating': true,
                    'provider': {
                        id: true,
                        'name': true
                    }
                }
            })
            return data
        }
        catch (ex) {
            throw ex
        }
    }
}