import styled from "styled-components";
import axios from "axios";
import { IoArrowBackSharp } from 'react-icons/io5';
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardTitle from "./BoardTitle";
import ReviewStar from "./ReviewStar";

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
    margin:0 1rem 1rem 0;
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
const ReviewRegist = ({ rating: initialRating, content: initialContent, reviewNo, isEdit }) => {
    const { farmNo } = useParams();
    const {memberNo} = useParams();
    const [content, setContent] = useState(initialContent || '');
    const [rating, setRating] = useState(initialRating || ''); // 별점 상태 추가
    const navigate = useNavigate();

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
        setContent('');
        setRating(0);
        navigate(-1); 
    };

    const handleRegisterOrUpdate = () => {
        const url = isEdit ? `http://localhost:8090/review/edit/${reviewNo}` : `http://localhost:8090/review/regist`;
        const method = isEdit ? 'put' : 'post';
        axios({   
            method : method,
            url:url,
            data:{
                reviewContent: content,
                rating: rating,
                createdDate: new Date().toISOString(),
                isDeleted: false, 
                memberNo: 1,
                farmNo: 50 // 임시값, 실제로는 어떻게 처리할지에 따라 변경
            }     
            
        }).then((response) => {
            if (isEdit) {
                alert("리뷰가 수정되었습니다.");
                navigate(`/review/${memberNo}`); // 수정된 경우 memberNo로 이동
            } else {
                alert("리뷰가 등록되었습니다.");
                navigate(`/farm/reveiw/${farmNo}`); // 등록된 경우 farmNo로 이동
            }
        }).catch((error) => {
            console.error("Error occured while registering the review:", error);
        });
    };

    return (
        <StyledContainer>
            <BackButton onClick={handleBack} size="20" />
            <FlexRow>   
                <BoardTitle name="리뷰하기" />
                <button 
                    onClick={handleRegisterOrUpdate}
                    className="block rounded-md bg-[#80BCBD] text-white text-lg py-1 px-2.5">
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
        </StyledContainer>
    );
};

export default ReviewRegist;
