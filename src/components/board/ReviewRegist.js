import styled from "styled-components";
import axios from "axios";
import { IoArrowBackSharp } from 'react-icons/io5';
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardTitle from "./BoardTitle";
import ReviewStar from "./ReviewStar";
import ResultModal from "../modal/ResultModal"; // ResultModal 추가
import { getMemberNo } from '../../api/farmApi';
import useCustomMove from "../../hooks/useCustomMove";

const StyledContainer = styled.div`
    background-color:white;
    font-size:1em;
    font-weight:600;
    border-radius:0.8rem;
`;

const FlexRow = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    align-items:center;
`;

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
        height: 30rem;
    }
`;

const BackButton = styled(IoArrowBackSharp)`
    color: var(--color-textgrey);
    margin-bottom: 1rem;
    cursor: pointer;
`;

const baseUrl = process.env.REACT_APP_BASE_URL;

const ReviewRegist = ({ rating: initialRating, content: initialContent, reviewNo, isEdit }) => {
    const { farmNo } = useParams();
    const { memberNo } = useParams();
    const [content, setContent] = useState(initialContent || '');
    const [rating, setRating] = useState(initialRating || '');
    const navigate = useNavigate();
    const [memberData, setMemberData] = useState();
    const [response, setResponse] = useState(null); // 결과 메시지 상태 추가
    const { memberMoveToRead, moveToMyReview } = useCustomMove();
    useEffect(() => {
        if (isEdit && initialRating && initialContent) {
            setRating(initialRating);
            setContent(initialContent);
        }
    }, [isEdit, initialRating, initialContent]);
    
    const onRatingChange = useCallback((newRating) => {
        setRating(newRating);
    }, []);
    
    const onChangeContent = useCallback((e) => {
        setContent(e.target.value);
    }, []);

    const handleBack = () => {
        navigate(-1);
    };
    const closeModal = () => {
        setResponse(null);
        if (isEdit) {
            moveToMyReview(memberNo); // 수정된 리뷰일 경우 moveToMyReview로 이동
        } else {
            memberMoveToRead(farmNo); // 등록된 리뷰일 경우 memberMoveToRead로 이동
        }
    };
    useEffect(() => {
        // 서버에서 사용자 정보 가져오기
        getMemberNo()
            .then((res) => {
                setMemberData(res);
                console.log(res);
                console.log('멤버데이터 ', JSON.stringify(res.memberNo));
                // if (res.role !== 'FARMER') {
                //     console.log(res.role);
                //     setResponse({ message: '농부만 들어갈 수 있는 페이지 입니다!', type: 'error' }); // 2. 오류 메시지 설정
                // }
            })
            .catch((error) => {
                console.log('데이터 안옴!!!!!!');
                console.error(error);
            });
    }, []);

    const handleRegisterOrUpdate = () => {
        const url = isEdit ? `${baseUrl}/review/edit/${reviewNo}` : `${baseUrl}/review/regist`;
        const method = isEdit ? 'put' : 'post';
        axios({   
            method : method,
            url: url,
            data: {
                reviewContent: content,
                rating: rating,
                createdDate: new Date().toISOString(),
                isDeleted: false, 
                memberNo: memberData.memberNo,
                farmNo: farmNo 
            }     
            
        }).then((response) => {
            if (isEdit) {
                setResponse({ message: '리뷰가 수정되었습니다.', type: 'success' }); 
            } else {
                setResponse({ message: '리뷰가 등록되었습니다.', type: 'success' }); 
            }
        }).catch((error) => {
            console.error("Error occured while registering the review:", error);
            setResponse({ message: '리뷰 등록 중 오류가 발생했습니다.', type: 'error' }); 
        });
    };

    return (
        <StyledContainer>
            <BackButton onClick={handleBack} size="20" />
            <FlexRow>   
                <BoardTitle name="리뷰하기" />
                <button 
                    onClick={handleRegisterOrUpdate}
                    className="block rounded-md bg-[#80BCBD] text-white text-lg py-1.5 px-3">
                    {isEdit ? "수정" : "등록"}
                </button>
            </FlexRow> 
            <ReviewStar rating={rating} setRating={onRatingChange}/>
                
            <FormItem>
                <textarea
                    value={content}
                    onChange={onChangeContent}
                    placeholder="내용을 입력해 주세요"                   
                ></textarea>
            </FormItem>
            {/* 2. 결과 메시지에 따라 ResultModal을 렌더링 */}
            {response && (
                <ResultModal
                    title={''}
                    content={response.message}
                    callbackFnc={closeModal}
                />
            )}
        </StyledContainer>
    );
};

export default ReviewRegist;
