import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { MdVisibility } from 'react-icons/md';
import { IoArrowBackSharp } from 'react-icons/io5';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getMemberNo } from '../../../../api/farmApi';
import ResultModal from '../../../../components/modal/ResultModal';
const StyledContainer = styled.div`
    background-color: white;
    border-radius: 0.6rem;
    margin: 1.5rem;
`;
const Title = styled.div`
    font-size: 1rem;
    font-weight: 600;
    margin: 1rem;
    margin-top: 1.5rem;
`;
const FlexRowGap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    font-size: 0.8rem;
    margin: 1rem;
    color: #878787;
`;
const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    margin: 1rem;
    justify-content: flex-end;
`;
const ViewsContainer = styled.div`
    display: flex;
    align-items: center;
`;
const DivLine = styled.div`
    background: #90c8ac;
    width: 100%;
    height: 0.1em;
    margin-top: 1.5rem;
`;
const Content = styled.div`
    font-size: 1rem;
    margin: 2rem 0 2rem 1rem;
    height: 15rem;
`;
export const FormItem = styled.div`
    font-weight: 500;
    margin-top: 1rem;
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

const InquiryItem = styled.div`
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
    margin-top: 2rem;
`;
const CommentContent = styled.div`
    font-size: 1.1rem;
    margin: 1rem 0 1rem 1rem;
    height: 5rem;
`;
const CommentElse = styled.div`
    margin: 0.5rem 0 1rem 1rem;

    color: #878787;
`;
export const BackButton = styled(IoArrowBackSharp)`
    color: var(--color-textgrey);
    cursor: pointer;
`;
const baseUrl = process.env.REACT_APP_BASE_URL;
const FarmerInquiryDetailPage = () => {
    const { boardNo } = useParams();
    const [inquiryDetail, setInquiryDetail] = useState(null);
    const [commentContent, setCommentContent] = useState('');
    const [commentList, setCommentList] = useState(null);
    const isCommentListEmpty = !commentList || commentList.length === 0;
    const [memberData, setMemberData] = useState();
    const [resultMessage, setResultMessage] = useState(null);
    console.log(isCommentListEmpty);
    const navigate = useNavigate();

    const fetchInquiryDetail = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/board/detail/${boardNo}`,
                {
                    withCredentials: true,
                },
            );

            const inquiryData = response.data;

            const createdDate = new Date(inquiryData.createdDate);

            // 원하는 형식의 날짜
            const formattedDate = `${createdDate.getFullYear()}-${(
                '0' +
                (createdDate.getMonth() + 1)
            ).slice(-2)}-${('0' + createdDate.getDate()).slice(-2)} ${(
                '0' + createdDate.getHours()
            ).slice(-2)}:${('0' + createdDate.getMinutes()).slice(-2)}`;
            inquiryData.formattedDate = formattedDate;
            setInquiryDetail(inquiryData);
            console.log(inquiryData);

            // 답변 목록 불러오기
            handleCommentList();
        } catch (error) {
            console.error('Error fetching inquiry detail:', error);
        }
    };

    useEffect(() => {
        fetchInquiryDetail();
    }, [boardNo, memberData]);

    useEffect(() => {
        // 서버에서 사용자 정보 가져오기
        getMemberNo()
            .then((res) => {
                setMemberData(res);
                console.log(res);

                console.log('멤버데이터 ', JSON.stringify(res.memberNo));
                // if (res.role !== 'FARMER') {
                //     console.log(res.role);
                //     alert('농부만 들어갈 수 있는 페이지 입니다!');
                //     window.location.href = navigate(-1);
                //     //farm/member/read/118?page=2&size=10
                // }
            })
            .catch((error) => {
                console.log('데이터 안옴!!!!!!');
                console.error(error);
            });
    }, []);

    const CommentList = ({ commentList }) => {
        return (
            <div>
                <InquiryTitle>문의답변</InquiryTitle>
                <ul>
                    {commentList.map((comment, index) => (
                        <InquiryItem key={index}>
                            <CommentElse>
                                {comment && comment.memberId}
                            </CommentElse>
                            <CommentContent>
                                {comment && comment.commentContent}
                            </CommentContent>
                            <CommentElse>
                                {comment && comment.formattedDate}
                            </CommentElse>
                        </InquiryItem>
                    ))}
                </ul>
            </div>
        );
    };

    const handleBack = () => {
        navigate(-1); // 뒤로 가기
    };

    const handleCommentSubmit = async () => {
        try {
            await axios.post(`${baseUrl}/board/${boardNo}/comment`, {
                content: commentContent,
                memberNo: memberData.memberNo,
                commentDate: new Date().toISOString(),
                withCredentials: true,
            });
            setResultMessage({
                title: '',
                content: '답변이 성공적으로 등록되었습니다.',
                type: 'success',
            });
            // 답변이 등록되면 문의 상세 페이지를 다시 불러옵니다.
            fetchInquiryDetail();
            // 답변을 등록한 후에 textarea 내용을 초기화합니다.
            setCommentContent('');
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };
    const handleCommentList = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/board/${boardNo}/commentlist`,
                {
                    withCredentials: true,
                },
            );
            const commentList = response.data.map((comment) => {
                const commentDate = new Date(comment.commentDate);
                const formattedDate = `${commentDate.getFullYear()}-${(
                    '0' +
                    (commentDate.getMonth() + 1)
                ).slice(-2)}-${('0' + commentDate.getDate()).slice(-2)} ${(
                    '0' + commentDate.getHours()
                ).slice(-2)}:${('0' + commentDate.getMinutes()).slice(-2)}`;
                return {
                    ...comment,
                    formattedDate: formattedDate,
                };
            });
            console.log(commentList);
            setCommentList(commentList); // 답변 목록을 상태로 설정
        } catch (error) {
            console.error('Error fetching comment list:', error);
        }
    };
    const closeModal = () => {
        setResultMessage(null);
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
                        <MdVisibility style={{ marginRight: '0.5rem' }} />{' '}
                        {/* Icon component */}
                        <div>{inquiryDetail && inquiryDetail.views}</div>
                    </ViewsContainer>
                </FlexRowGap>
                <DivLine />
                <Content>{inquiryDetail && inquiryDetail.boardContent}</Content>
                <DivLine />

                {isCommentListEmpty ? (
                    // 답변 목록이 비어있을 때
                    <>
                        <FormItem>
                            <textarea
                                value={commentContent}
                                onChange={(e) =>
                                    setCommentContent(e.target.value)
                                }
                                placeholder="답변을 입력해 주세요"
                            ></textarea>
                        </FormItem>
                        <Buttons>
                            <button
                                onClick={handleCommentSubmit}
                                className="block rounded-md bg-[#80BCBD] text-white text-lg py-1.5 px-3"
                            >
                                등록
                            </button>
                            <button
                                // onClick={handleRegister}
                                className="block rounded-md bg-[#D9D9D9] text-white text-lg py-1.5 px-3"
                            >
                                취소
                            </button>
                        </Buttons>
                    </>
                ) : (
                    // 답변 목록이 비어있지 않을 때 답변목록
                    <>
                        <CommentList commentList={commentList} />
                    </>
                )}
            </StyledContainer>

            {resultMessage && (
                <ResultModal
                    title={resultMessage.title}
                    content={resultMessage.content}
                    type={resultMessage.type}
                    callbackFnc={closeModal}
                />
            )}
        </>
    );
};
export default FarmerInquiryDetailPage;
