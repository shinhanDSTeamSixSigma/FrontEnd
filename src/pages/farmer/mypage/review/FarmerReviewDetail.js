import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { IoArrowBackSharp } from 'react-icons/io5';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StarRating from "../../../../components/board/StarRating";

const StyledContainer = styled.div`
    background-color:white;
    border-radius:0.6rem;
    margin:1.5rem;
`;
const FlexRowGap=styled.div`
    display:flex;
    flex-direction:row;
    gap:0.5rem;
    font-size:0.6rem;
    margin:1rem;
    color:#878787;
`;
const DivLine=styled.div`
    background: #90C8AC;
    width: 100%;
    height: 0.1em;
    margin-top:1.5rem;
`
const Content=styled.div`
    font-size : 0.8rem;
    margin:2rem 0 2rem 1rem;   
    height: 15rem;
`
export const FormItem = styled.div`
    font-weight: 500;
    margin-top:1rem;
    & input {
        width: ${(props) => (props.width ? props.width : '100%')};
        border: 0.1rem solid lightgray;
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 1rem;
    }
    & textarea {
        width: ${(props) => (props.width ? props.width : '100%')};
        border: 0.1rem solid lightgray; 
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 1rem;
        height: 15rem;
    }
`;
const Writer=styled.div`
    font-size:1rem;
    font-weight:600;
    margin: 1rem;
`
const TextRating=styled.div`
    font-size:1rem;
    font-weight:600;
    color:#878787;
`
const DateText=styled.div`
    margin:1rem;
    font-size:0.8rem;
    color:#878787;
    text-align:left;
`
export const BackButton = styled(IoArrowBackSharp)`
  color: var(--color-textgrey);
  cursor: pointer;
`;
const baseUrl = process.env.REACT_APP_BASE_URL;
const FarmerReviewDetail =()=>{
    const { reviewNo } = useParams();
    const [reviewDetail, setReviewDetail] = useState(null);
    const navigate = useNavigate();

    const fetchReviewDetail = async () => {
    try {
        const response = await axios.get(`${baseUrl}/review/${reviewNo}`, {
            withCredentials: true,
        });
        
        const reviewData = response.data;

        const createdDate = new Date(reviewData.createdDate);

        // 원하는 형식의 날짜
        const formattedDate = `${createdDate.getFullYear()}-${('0' + (createdDate.getMonth() + 1)).slice(-2)}-${('0' + createdDate.getDate()).slice(-2)} ${('0' + createdDate.getHours()).slice(-2)}:${('0' + createdDate.getMinutes()).slice(-2)}`;
        reviewData.formattedDate = formattedDate;
        setReviewDetail(reviewData); 
        console.log(reviewData);

        } catch (error) {
        console.error("Error fetching review detail:", error);
        }
    };
    useEffect(() => {
        fetchReviewDetail();
    }, [reviewNo]);
     
    const handleBack = () => {
        navigate(-1); // 뒤로 가기
    };
    
    return (
        <>
        <StyledContainer>
            <BackButton onClick={handleBack} size="20" />
            
            <Writer>{reviewDetail && reviewDetail.memberId}</Writer>
            <FlexRowGap>
                <StarRating rating={reviewDetail && reviewDetail.rating} size='1rem'/>
                <TextRating>{reviewDetail && reviewDetail.rating.toFixed(1)}</TextRating>                
            </FlexRowGap>              
            <DivLine/>                 
            <Content>{reviewDetail && reviewDetail.reviewContent}</Content>
            <DivLine/>
            <DateText>{reviewDetail && reviewDetail.formattedDate}</DateText>

        </StyledContainer>
        </>
    )
};
export default FarmerReviewDetail;