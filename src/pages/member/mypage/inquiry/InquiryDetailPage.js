import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { MdVisibility } from 'react-icons/md';
import { IoArrowBackSharp } from 'react-icons/io5';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const StyledContainer = styled.div`
    background-color:white;
    border-radius:0.6rem;
    margin:1.5rem;
`;
const Title=styled.div`
    font-size:1.5rem;
    font-weight: 600;
    margin:1rem;
    margin-top:1.5rem;
`
const FlexRowGap=styled.div`
    display:flex;
    flex-direction:row;
    gap:2rem;
    margin:1rem;
    color:#878787;
`;
const ViewsContainer = styled.div`
    display: flex;
    align-items: center;
`;
const DivLine=styled.div`
    background: #90C8AC;
    width: 100%;
    height: 0.1em;
    margin-top:1.5rem;
`
const Content=styled.div`
    font-size : 1.2rem;
    margin:2rem 0 2rem 1rem;   
    height: 15rem;
`
export const BackButton = styled(IoArrowBackSharp)`
  color: var(--color-textgrey);
  cursor: pointer;
`;
const InquiryDetailPage =()=>{
    const { boardNo } = useParams();
    const [inquiryDetail, setInquiryDetail] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInquiryDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:8090/board/detail/${boardNo}`);
            
            const inquiryData = response.data;

            const createdDate = new Date(inquiryData.createdDate);

            // 원하는 형식의 날짜
            const formattedDate = `${createdDate.getFullYear()}-${('0' + (createdDate.getMonth() + 1)).slice(-2)}-${('0' + createdDate.getDate()).slice(-2)} ${('0' + createdDate.getHours()).slice(-2)}:${('0' + createdDate.getMinutes()).slice(-2)}`;
            inquiryData.formattedDate = formattedDate;
            setInquiryDetail(inquiryData); 
            console.log(inquiryData);
        } catch (error) {
            console.error("Error fetching inquiry detail:", error);
        }
        };

        fetchInquiryDetail();
    }, [boardNo]); 
    const handleBack = () => {
        navigate(-1); // 뒤로 가기
    };

    return (
        <>
        <StyledContainer>
            <BackButton onClick={handleBack} size="20" />
            <Title>{inquiryDetail && inquiryDetail.title}</Title>
            <FlexRowGap>
                <div>{inquiryDetail && inquiryDetail.memberId}</div>
                <div>{inquiryDetail && inquiryDetail.formattedDate}</div>
                <ViewsContainer>
                    <MdVisibility style={{ marginRight: '0.5rem' }} /> {/* Icon component */}
                    <div>{inquiryDetail && inquiryDetail.views}</div>
                </ViewsContainer>
                
            </FlexRowGap>
            <DivLine/>
            <Content>{inquiryDetail && inquiryDetail.boardContent}</Content>
            <DivLine/>
            

        </StyledContainer>
        </>
    )
};
export default InquiryDetailPage;