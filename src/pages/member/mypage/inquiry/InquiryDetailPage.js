import styled from "styled-components";
import React, { useCallback, useState, useEffect } from "react";
import { MdVisibility } from 'react-icons/md';
import { IoArrowBackSharp, IoTrophy } from 'react-icons/io5';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ResultModal from "../../../../components/modal/ResultModal";
import useCustomMove from "../../../../hooks/useCustomMove";

const StyledContainer = styled.div`
    background-color:white;
    border-radius:0.6rem;
    margin:1.5rem;
`;

const Title=styled.div`
    font-size:1rem;
    font-weight: 600;
    margin:1rem;
    margin-top:1.5rem;
`;

const FlexRowGap=styled.div`
    display:flex;
    flex-direction:row;
    gap:2rem;
    margin:1rem;
    color:#878787;
    font-size:0.8rem;
`;

const Buttons=styled.div`
    display:flex;
    flex-direction:row;
    gap:1.5rem;
    margin:1rem;
    justify-content: flex-end;
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
`;

const Content=styled.div`
    font-size : 0.8rem;
    margin:2rem 0 2rem 1rem;   
    height: 15rem;
`;

const InquiryItem=styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 0.1rem solid lightgray;
    border-radius: 1rem;
    padding: 1rem 1rem;
    margin-top: 1rem;
    cursor: pointer;
`;

const InquiryTitle = styled.h3`
    font-size: 1rem;
    font-weight: bold;
    margin-left: 1rem;
`;

const CommentContent=styled.div`
    font-size : 0.8rem;
    margin: 1rem 0 1rem 1rem;   
    height: 5rem;
`;

const CommentElse=styled.div`
    margin:0.5rem 0 1rem 1rem;
    color:#878787;
    font-size: 0.8rem;
`;

const NoComment=styled.div`
    color: #4F6F52;
    font-size : 1rem;
    font-weight: 600;
    text-align: center;
    margin:4rem 0 4rem 0;
`;

export const BackButton = styled(IoArrowBackSharp)`
  color: var(--color-textgrey);
  cursor: pointer;
`;

const baseUrl = process.env.REACT_APP_BASE_URL;

const InquiryDetailPage =()=>{
    const { boardNo } = useParams();
    const {memberNo} = useParams();
    const [inquiryDetail, setInquiryDetail] = useState(null);
    const [commentList, setCommentList] = useState(null);
    const isCommentListEmpty = !commentList || commentList.length === 0;
   
    const [resultMessage, setResultMessage] = useState(null);    
    const { moveToMyInquiry } = useCustomMove();
    const navigate = useNavigate();
    
    const fetchInquiryDetail = async () => {
        try {
            const response = await axios.get(`${baseUrl}/board/detail/${boardNo}`, {
                withCredentials: true,
            });
            
            const inquiryData = response.data;
    
            const createdDate = new Date(inquiryData.createdDate);
    
            // 원하는 형식의 날짜
            const formattedDate = `${createdDate.getFullYear()}-${('0' + (createdDate.getMonth() + 1)).slice(-2)}-${('0' + createdDate.getDate()).slice(-2)} ${('0' + createdDate.getHours()).slice(-2)}:${('0' + createdDate.getMinutes()).slice(-2)}`;
            inquiryData.formattedDate = formattedDate;
            setInquiryDetail(inquiryData); 
    
            // 답변 목록 불러오기
            handleCommentList();
        } catch (error) {
            console.error("Error fetching inquiry detail:", error);
        }
    };
    
    useEffect(() => {
        fetchInquiryDetail();
    }, [boardNo]);
     
    const CommentList = ({ commentList }) => {
        return (
          <div>
            <InquiryTitle>문의답변</InquiryTitle>
            <ul>
              {commentList.map((comment, index) => (
                <InquiryItem key={index}>                 
                    <CommentElse>{comment && comment.nickname}</CommentElse>    
                    <CommentContent>{comment && comment.commentContent}</CommentContent> 
                    <CommentElse>{comment && comment.formattedDate}</CommentElse>            
                </InquiryItem>             
              ))}
            </ul>
          </div>
        );
    };

    const handleBack = () => {
        navigate(-1); // 뒤로 가기
    };

    const handleEdit = () => {
        // 수정 폼으로 이동
        navigate(`/inquiry/${boardNo}/edit`);
    };

    const handleDelete = async()=>{
        try{
            await axios.delete(`${baseUrl}/board/inquiryDelete/${boardNo}`, {
                withCredentials: true,
            });
            setResultMessage({
                title: '',
                content: '문의가 삭제되었습니다.',
                type: 'success',
            });
        }catch(error){
            console.log("Error deleting inquiry:", error);
        }
    };
    
    const handleCommentList = async ()=>{
        try {
            const response = await axios.get(`${baseUrl}/board/${boardNo}/commentlist`, {
                withCredentials: true,
            });
            const commentList = response.data.map(comment => {
                const commentDate = new Date(comment.commentDate);
                const formattedDate = `${commentDate.getFullYear()}-${('0' + (commentDate.getMonth() + 1)).slice(-2)}-${('0' + commentDate.getDate()).slice(-2)} ${('0' + commentDate.getHours()).slice(-2)}:${('0' + commentDate.getMinutes()).slice(-2)}`;
                return {
                    ...comment,
                    formattedDate: formattedDate
                };
            });
            setCommentList(commentList); // 답변 목록을 상태로 설정
        } catch (error) {
            console.error("Error fetching comment list:", error);
        }
    }
    const closeModal = () => {
        setResultMessage(null);
        moveToMyInquiry(inquiryDetail.memberNo);
    };
    return (
        <>
        <StyledContainer>
            <BackButton onClick={handleBack} size="20" />
            <Title>{inquiryDetail && inquiryDetail.title}</Title>
            <FlexRowGap>
                <div>{inquiryDetail && inquiryDetail.nickname}</div>
                <div>{inquiryDetail && inquiryDetail.formattedDate}</div>
                <ViewsContainer>
                    <MdVisibility style={{ marginRight: '0.5rem' }} /> {/* Icon component */}
                    <div>{inquiryDetail && inquiryDetail.views}</div>
                </ViewsContainer>
                
            </FlexRowGap>
            <DivLine/>
            <Content>{inquiryDetail && inquiryDetail.boardContent}</Content>
            <DivLine/>
            <Buttons>
                <button 
                    onClick={handleEdit}
                    className="block rounded-md bg-[#80BCBD] text-white text-lg py-1 px-2.5">수정</button>
                <button 
                    onClick={handleDelete}
                    className="block rounded-md bg-[#D9D9D9] text-white text-lg py-1 px-2.5">삭제</button>
            </Buttons>

            {isCommentListEmpty ? (
            // 답변 목록이 비어있을 때
                <>
                <NoComment>아직 답변이 없습니다.</NoComment>
              </>
                ) : (
                // 답변 목록이 비어있지 않을 때
                <>
                    <CommentList commentList={commentList} />
                </>
            )}
            
        </StyledContainer>
        {resultMessage && (
                <ResultModal
                    title={resultMessage.title}
                    content={resultMessage.content}
                    callbackFnc={closeModal}
                />
            )}
        </>
    )
};

export default InquiryDetailPage;
