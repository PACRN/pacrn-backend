import { Review } from "../entities/reviews.entities";
import { ReviewRepository } from "../repositories/review.repository";
import { BaseService } from './base.service';
import { Service, Inject } from 'typedi';
import { TotalReview } from "../entities/totalReview.entities";
import { TotalReviewRepository } from "../repositories/totalReview.repository";
import approxDateConvertor from "../../utilities/approxDateConvertor/approxDateConvertor";


@Service()
export class ReviewService extends BaseService<Review> {
    constructor(
        @Inject(() => ReviewRepository) private reviewRepository: ReviewRepository,
        @Inject(() => TotalReviewRepository) private totalReviewRepository: TotalReviewRepository
    ) {
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

    public async CreateTotalReviews(totalReview: any, providerCode: string): Promise<TotalReview> {
        try {
            let existingReview: any = await this.totalReviewRepository.findOneBy({ where: { providerCode: providerCode } })
            const review = existingReview ?? new TotalReview();
            review.totalRating = totalReview.TotalRating; // Fixed assignment
            review.totalReviews = totalReview.TotalReviews;
            review.providerCode = providerCode;
            let data = await this.totalReviewRepository.create(review)
            return data
        } catch (ex) {
            throw ex
        }
    }

    public async GetReviewByProviderCode(providerCode: string): Promise<boolean> {
        try {
            let existingReview: any = await this.totalReviewRepository.findOneBy({ where: { providerCode: providerCode } })
            if (existingReview) {
                console.log(providerCode, "Review for this provider is already there.");
                return false
            }
            return true
        } catch (ex) {
            throw ex
        }
    }

    public async CreateReviews(review: any[], totalReviewId: number): Promise<Review[]> {
        try {
            const existingReviews = await this.reviewRepository.findOneBy({ where: { TotalReviewId: totalReviewId } })
            if (existingReviews) {
                await this.reviewRepository.deleteBasedOnCodition({ TotalReviewId: totalReviewId })
            }
            const reviewList: Review[] = review.map((e) => {
                const newReview = new Review();
                newReview.rating = e.rating;
                newReview.review = e.review;
                newReview.source = 'googleMap';
                newReview.reviewPeriod = approxDateConvertor(e.date);
                newReview.TotalReviewId = totalReviewId;
                newReview.username = e.username;
                newReview.userThumbnail = e.userthumbnail;
                return newReview;
            });
            let data = await this.reviewRepository.createAll(reviewList)
            return data
        } catch (ex) {
            throw ex
        }
    }

}