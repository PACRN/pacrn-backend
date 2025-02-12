import axios from "axios"
import Place from "../../types/googleApiPlaceIDBody"
import { Container } from "typedi";
import { ReviewService } from "../../modules/services/review.service";
import ReviewScrape from "../scrapping/reviewscrapper";

const CreateReviewFromJobs = async (place: string, providerCode: string) => {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place}&key=${process.env.GOOGLEAPI}`
        try {
            const response = await axios.get(url)
            const responseData: Place = response.data
            if (!responseData.results?.[0]?.place_id) {
                console.warn(`Skipping: No place_id found for ${place}`);
                return; // Stop execution
            }
            const googleMapUrl = `https://www.google.com/maps/place/?q=place_id:${responseData.results[0].place_id}`
            const scrappedData: any = await ReviewScrape(googleMapUrl)
            if (!scrappedData || !scrappedData.totalData?.length || !scrappedData.reviews?.length) {
                console.warn(`Skipping: No scrapped data found for ${place}`);
                return; // Stop execution
            }
            const reviewService = Container.get(ReviewService)
            let totalReviewResult = await reviewService.CreateTotalReviews(scrappedData.totalData[0], providerCode)
            let reviewResult = await reviewService.CreateReviews(scrappedData.reviews, totalReviewResult.id)
        } catch (err) {
            console.error("Error in inserting a review", err)
        }
    } catch (error) {
        console.error("Error in inserting a review", error)
    }
}

export default CreateReviewFromJobs