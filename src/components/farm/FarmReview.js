import FarmerReviewListPage from '../../pages/farmer/mypage/review/FarmerReviewListPage';

export default function FarmReview({
    farm,
    handleTotalReviews,
    handleAverageRating,
}) {
    return (
        <>
            <FarmerReviewListPage
                farm={farm}
                handleTotalReviews={handleTotalReviews}
                handleAverageRating={handleAverageRating}
            />
        </>
    );
}
