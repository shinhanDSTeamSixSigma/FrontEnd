import styled, { css } from "styled-components";
import axios from "axios";
import BoardTitle from "../../../../components/board/BoardTitle";
import EmptyBoard from "../../../../components/board/EmptyBoard";
import Button from "../../../../components/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import StarRating from "../../../../components/board/StarRating.js";

const StyledContainer = styled.div`
    background-color:white;
    border-radius:0.6rem;
    margin:1.5rem;
`;
const FlexRow=styled.div`
    display:flex;
    flex-direction:row;
    align-items: center;
    justify-content: space-between;
    margin:0.5rem 1rem 1rem 0;
`;
const FlexRowGap=styled.div`
    display:flex;
    flex-direction:row;
    gap:1rem;
    font-size:0.6rem;
    color:#878787;
`;
const Totalcnt=styled.div`
    font-size: 0.8rem;
    font-weight:500;
    color:#878787;
    margin: 0 0 0 0.2rem;
`
const AvgRating=styled.div`
    font-size:1rem;
    font-weight:600;
    color:#878787;
    margin:0 0.2rem 0 0.5rem;
`
const Content=styled.div`
    font-size:0.8rem;
    font-weight: 500;
`
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    
`;


const InquiryItem=styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    border: 0.1rem solid lightgray;
    border-radius: 1rem;
    padding: 1.5rem 1.5rem;
    margin-top: 1rem;
    cursor: pointer;
`;
const baseUrl = process.env.REACT_APP_BASE_URL;

const FarmerReviewListPage = () => {
    
    const [reviews, setReviews] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [averageRating, setAverageRating] = useState(0); //평균 별점을 저장할 상태
    const [farmNo, setFarmNo] = useState(118); // farmNo를 상태로 관리

    
        console.log(baseUrl); // baseUrl 출력
        const fetchData = async () => {
            try {
              const response = await axios.get(`${baseUrl}/review/list?farmNo=${farmNo}`, {
                withCredentials: true,
            });
              
              // 날짜 형식 변환
              const formattedData = response.data.map(item => ({
                    ...item,
                                      
                    createdDate: new Date(item.createdDate).toLocaleDateString('ko-KR',{
                        year: 'numeric',
                        month: '2-digit', 
                        day: '2-digit'
                    }),                    
                }));
            
                setReviews(formattedData); // API에서 받아온 작물 목록을 상태에 업데이트
                setTotalReviews(formattedData.length);
                // 평균 별점 계산
                const totalRating = formattedData.reduce((acc, curr) => acc + curr.rating, 0);
                const average = totalRating / formattedData.length;
                setAverageRating(average);

          } catch (error) {
              console.error("Error fetching reviews:", error);
            }
          };
        useEffect(()=>{
          fetchData(); // 데이터 가져오기 함수 호출
        }, [farmNo]);

        
      
    return(
        <>
        <StyledContainer>
            <FlexRow>
                <FlexRow style={{ marginRight: '1rem' }}>
                    <TitleContainer>
                        <BoardTitle name="농부 리뷰" />
                    </TitleContainer>
                        <AvgRating>{(averageRating).toFixed(1)}</AvgRating>
                        <StarRating rating={averageRating.toFixed(1)} size='1rem' ></StarRating>
                    
                    <Totalcnt>({totalReviews})</Totalcnt>
                </FlexRow>
                <Link to={`/farm/review/${farmNo}/regist`}>
                    <Button name="작성" widthHeight= 'w-14 h-8'/>
                </Link>
            </FlexRow>
            
                
            
            {reviews.length ===0 ?(
                <EmptyBoard name="리뷰내역이 없습니다."/>
            ) : (
                reviews.map((review,index) =>(
                    <Link to={`/farm/review/${review.reviewNo}/detail`}>
                    <InquiryItem key={index}>
                        <StarRating rating={review.rating} size='1rem'/>
                        <Content>{review.reviewContent}</Content>
                        <FlexRowGap>
                            <div>{review.nickname}</div>
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