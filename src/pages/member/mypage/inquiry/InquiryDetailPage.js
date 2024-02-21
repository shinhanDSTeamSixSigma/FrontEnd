import styled from "styled-components";
import React, { useCallback, useState, useEffect } from "react";
import { MdVisibility } from 'react-icons/md';
import { IoArrowBackSharp, IoTrophy } from 'react-icons/io5';
import axios, { AxiosHeaders } from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const StyledContainer = styled.div`
    background-color:white;
    border-radius:0.6rem;
    margin:1.5rem;
`;
const Title=styled.div`
    font-size:1.2rem;
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
const Buttons=styled.div`
    display:flex;
    flex-direction:row;
    gap:1.5rem;
    margin:1rem;
    justify-content: flex-end;
`
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
    font-size : 1rem;
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
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: 1rem;
`;
const CommentContent=styled.div`
    font-size : 1.1rem;
    margin: 1rem 0 1rem 1rem;   
    height: 5rem;
`
const CommentElse=styled.div`
    margin:0.5rem 0 1rem 1rem;

    color:#878787;
`
export const BackButton = styled(IoArrowBackSharp)`
  color: var(--color-textgrey);
  cursor: pointer;
`;
const InquiryDetailPage =()=>{
    const { boardNo } = useParams();
    const [inquiryDetail, setInquiryDetail] = useState(null);
    const [commentContent, setCommentContent] = useState("");
    const [commentList, setCommentList] = useState(null);
    const isCommentListEmpty = !commentList || commentList.length === 0;
    
    console.log(isCommentListEmpty);
    const navigate = useNavigate();

    // const user = useAuth();

    // // 현재 사용자가 작성자인지 여부를 확인합니다.
    // const isAuthor = inquiryDetail && user && inquiryDetail.memberId === user.id;

    // // 현재 사용자가 농장번호에 해당하는 농부인지 여부를 확인합니다.
    // const isFarmer = /* 농장번호를 어떻게 확인할지에 따라 작성하세요 */;

    // // 수정하기 폼을 렌더링할지 여부를 결정합니다.
    // const renderEditForm = isAuthor ? (
    //     // 수정하기 폼 컴포넌트
    //     <EditForm />
    // ) : null;

    // // 답변 작성 폼을 렌더링할지 여부를 결정합니다.
    // const renderCommentForm = isFarmer ? (
    //     // 답변 작성 폼 컴포넌트
    //     <CommentForm />
    // ) : null;
    
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
                    <CommentElse>{comment && comment.memberId}</CommentElse>    
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
    const handleDelete = async()=>{
        try{
            await axios.delete(`http://localhost:8090/board/inquiryDelete/${boardNo}`);
            alert("문의가 삭제되었습니다.");
            navigate(-1);
        }catch(error){
            console.log("Error deleting inquiry:", error);
        }
    };
    const handleCommentSubmit = async () =>{
        try{
            await axios.post(`http://localhost:8090/board/${boardNo}/comment`, {
                content:commentContent,
                memberNo: 1,
                commentDate:new Date().toISOString()               
            });
            alert("답변이 등록되었습니다.");
            // 답변이 등록되면 문의 상세 페이지를 다시 불러옵니다.
            fetchInquiryDetail();
            // 답변을 등록한 후에 textarea 내용을 초기화합니다.
            setCommentContent("");
        } catch (error) {
            console.error("Error submitting answer:", error);
        }
    };
    const handleCommentList = async ()=>{
        try {
            const response = await axios.get(`http://localhost:8090/board/${boardNo}/commentlist`);
            const commentList = response.data.map(comment => {
                const commentDate = new Date(comment.commentDate);
                const formattedDate = `${commentDate.getFullYear()}-${('0' + (commentDate.getMonth() + 1)).slice(-2)}-${('0' + commentDate.getDate()).slice(-2)} ${('0' + commentDate.getHours()).slice(-2)}:${('0' + commentDate.getMinutes()).slice(-2)}`;
                return {
                    ...comment,
                    formattedDate: formattedDate
                };
            });
            console.log(commentList);
            setCommentList(commentList); // 답변 목록을 상태로 설정
        } catch (error) {
            console.error("Error fetching comment list:", error);
        }
    }
   
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
            <Buttons>
                <button 
                    // onClick={handleRegister}
                    className="block rounded-md bg-[#80BCBD] text-white text-lg py-1.5 px-3">수정</button>
                <button 
                    onClick={handleDelete}
                    className="block rounded-md bg-[#D9D9D9] text-white text-lg py-1.5 px-3">삭제</button>
            </Buttons>

            {isCommentListEmpty ? (
            // 답변 목록이 비어있을 때
                <>
                <div>답변이 없습니다.</div>
                
                <FormItem>
                    <textarea
                        value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            placeholder="답변을 입력해 주세요"
                    ></textarea>
                </FormItem>
                <Buttons>
                    <button 
                        onClick={handleCommentSubmit}
                        className="block rounded-md bg-[#80BCBD] text-white text-lg py-1.5 px-3">등록</button>
                    <button 
                        // onClick={handleRegister}
                        className="block rounded-md bg-[#D9D9D9] text-white text-lg py-1.5 px-3">취소</button>
                </Buttons>
              </>
                ) : (
                // 답변 목록이 비어있지 않을 때
                <>
                    <CommentList commentList={commentList} />
                    {/* 답변 작성하기 폼을 보여주지 않음 */}
                </>
            )}
            
        </StyledContainer>
        </>
    )
};
export default InquiryDetailPage;