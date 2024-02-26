import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReviewRegist from "../../../../components/board/ReviewRegist";
const StyledContainer = styled.div`
    background-color:white;
    border-radius:0.6rem;
    margin:1.5rem;
`;
const baseUrl = process.env.REACT_APP_BASE_URL;
const ReviewEdit = () => {
    const { reviewNo, memberNo, farmNo } = useParams();
    const [reviewDetail, setReviewDetail] = useState(null);

    useEffect(() => {
        const fetchReviewDetail = async () => {
            try {
                const response = await axios.get(`${baseUrl}/review/${reviewNo}`, {
                    withCredentials: true,
                });
                setReviewDetail(response.data);
            } catch (error) {
                console.error("Error fetching inquiry detail:", error);
            }
        };
        fetchReviewDetail();
    }, [reviewNo]);

    return (
        <StyledContainer>
            {reviewDetail && (
                <ReviewRegist
                    content={reviewDetail.reviewContent}
                    rating={reviewDetail.rating}
                    reviewNo={reviewNo}
                    isEdit={true}
                    memberNo={memberNo}
                    farmNo={farmNo}
                />
            )}
        </StyledContainer>
    );
};
export default ReviewEdit;