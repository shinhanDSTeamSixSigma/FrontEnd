import styled, { css } from "styled-components";
import axios from "axios";
import BoardTitle from "../../../../components/board/BoardTitle";
import EmptyBoard from "../../../../components/board/EmptyBoard";
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
    font-size:0.8rem;
    color:#878787;
`;
const Totalcnt=styled.div`
    font-size: 1rem;
    font-weight:500;
    color:#878787;
`
const FarmName=styled.div`
    font-size: 1rem;
    font-weight:600;
    color:#878787;
`
const Content=styled.div`
    font-size:1rem;
    font-weight: 500;
`
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right:1rem;
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

const ReviewListPage = () => {
    
    const [reviews, setReviews] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const memberNo =1; //나중에 로그인한 회원번호로 수정해야함...

    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await axios.get(`http://localhost:8090/review/${memberNo}/list`);
              
              // 날짜 형식 변환
              const formattedData = response.data.map(item => ({
                    ...item,
                                      
                    createdDate: new Date(item.createdDate).toLocaleDateString('ko-KR',{
                        year: 'numeric',
                        month: '2-digit', 
                        day: '2-digit'
                    }),                    
                }));
            
                setReviews(formattedData);
                setTotalReviews(formattedData.length);
                console.log(formattedData);

          } catch (error) {
              console.error("Error fetching reviews:", error);
            }
          };
       
          fetchData(); // 데이터 가져오기 함수 호출
        }, [memberNo]);
        
        
      
    return(
        <>
        <StyledContainer>
            <FlexRow>
                <FlexRow style={{ marginRight: '1rem' }}>
                    <TitleContainer>
                        <BoardTitle name="나의 리뷰" />
                    </TitleContainer>
 
                    <Totalcnt>({totalReviews})</Totalcnt>
                </FlexRow>
                {/* <Link to={`/farm/review/${farmNo}/regist`}>
                    <Button name="리뷰하기" widthHeight= 'w-18 h-10'/>
                </Link> */}
            </FlexRow>
            
                
            
            {reviews.length ===0 ?(
                <EmptyBoard name="리뷰내역이 없습니다."/>
            ) : (
                reviews.map((review,index) =>(
                    <Link to={`/review/${review.reviewNo}/detail`}>
                    <InquiryItem key={index}>
                        <FarmName>{review.farmId}네 농장</FarmName>
                        <StarRating rating={review.rating} size='1rem'/>
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
export default ReviewListPage;