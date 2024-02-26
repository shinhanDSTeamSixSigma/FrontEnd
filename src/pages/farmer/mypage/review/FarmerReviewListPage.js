import styled, { css } from 'styled-components';
import axios from 'axios';
import BoardTitle from '../../../../components/board/BoardTitle';
import EmptyBoard from '../../../../components/board/EmptyBoard';
import Button from '../../../../components/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StarRating from '../../../../components/board/StarRating.js';

const StyledContainer = styled.div`
    background-color: white;
    border-radius: 0.6rem;
    margin: 1.5rem;
`;
const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0.5rem 1rem 1rem 0;
`;

const FlexRowGap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    font-size: 0.6rem;
    color: #878787;
`;
const Totalcnt = styled.div`
    font-size: 0.8rem;
    font-weight: 500;
    color: #878787;
    margin: 0 0 0 0.2rem;
`;
const AvgRating = styled.div`
    font-size: 1rem;
    font-weight: 600;
    color: #878787;
    margin: 0 0.2rem 0 0.5rem;
`;
const Content = styled.div`
    font-size: 0.8rem;
    font-weight: 500;
`;
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1rem;
`;

const InquiryItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    border: 0.1rem solid lightgray;
    border-radius: 1rem;
    padding: 1.5rem 1.5rem;
    margin-top: 1rem;
    cursor: pointer;
    a {
        text-decoration: none; /* 밑줄 제거 */
        color: inherit; /* 상위 요소의 색상 상속 */
    }
`;
const baseUrl = process.env.REACT_APP_BASE_URL;

const FarmerReviewListPage = ({
    farm,
    handleTotalReviews,
    handleAverageRating,
}) => {
    const [reviews, setReviews] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [averageRating, setAverageRating] = useState(0); //평균 별점을 저장할 상태

    const farmNo = farm.farmNo; //농장번호

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8090/review/list?farmNo=${farmNo}`,
                );

                // 날짜 형식 변환
                const formattedData = response.data.map((item) => ({
                    ...item,

                    createdDate: new Date(item.createdDate).toLocaleDateString(
                        'ko-KR',
                        {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        },
                    ),
                }));

                setReviews(formattedData); // API에서 받아온 작물 목록을 상태에 업데이트
                handleTotalReviews(formattedData.length); //부모 컴포넌트에 값 넘기기
                setTotalReviews(formattedData.length);
                // 평균 별점 계산
                const totalRating = formattedData.reduce(
                    (acc, curr) => acc + curr.rating,
                    0,
                );
                const average = totalRating / formattedData.length;
                handleAverageRating(average); //부모 컴포넌트에 값 넘기기
                setAverageRating(average);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchData(); // 데이터 가져오기 함수 호출
    }, [farmNo]);

    return (
        <>
            <StyledContainer>
                <FlexRow>
                    <FlexRow style={{ marginRight: '1rem' }}>
                        <TitleContainer>
                            <BoardTitle name="농부 리뷰" />
                        </TitleContainer>
                        <AvgRating>{averageRating.toFixed(1)}</AvgRating>
                        <StarRating
                            rating={averageRating.toFixed(1)}
                            size="1.5rem"
                        ></StarRating>

                        <Totalcnt>({totalReviews})</Totalcnt>
                    </FlexRow>
                    <Link to={`/farm/review/${farmNo}/regist`}>
                        <Button name="리뷰하기" widthHeight="w-18 h-10" />
                    </Link>
                </FlexRow>

                {reviews.length === 0 ? (
                    <EmptyBoard name="리뷰내역이 없습니다." />
                ) : (
                    reviews.map((review, index) => (
                        <Link to={`/farm/review/${review.reviewNo}/detail`}>
                            <InquiryItem key={index}>
                                <StarRating
                                    rating={review.rating}
                                    size="1rem"
                                />
                                <Content>{review.reviewContent}</Content>
                                <FlexRowGap>
                                    <div>{review.memberId}</div>
                                    <div>{review.createdDate}</div>
                                </FlexRowGap>
                            </InquiryItem>
                        </Link>
                    ))
                )}
            </StyledContainer>
        </>
    );
};
export default FarmerReviewListPage;
