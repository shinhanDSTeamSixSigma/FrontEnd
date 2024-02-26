import styled from "styled-components";
import axios from "axios";
import { IoArrowBackSharp } from 'react-icons/io5';
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardTitle from "./BoardTitle";
import ReviewStar from "./ReviewStar";
import {
    getMemberNo
}from '../../api/farmApi'
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
    const {memberNo} = useParams();
    const [content, setContent] = useState(initialContent || '');
    const [rating, setRating] = useState(initialRating || ''); // 별점 상태 추가
    const navigate = useNavigate();
    const [memberData, setMemberData] = useState();
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
    
    useEffect(() => {
        // 서버에서 사용자 정보 가져오기
        getMemberNo()
            .then((res) => {
                setMemberData(res);
                console.log(res);

                console.log('멤버데이터 ', JSON.stringify(res.memberNo));
                if (res.role !== 'FARMER') {
                    console.log(res.role);
                    alert('농부만 들어갈 수 있는 페이지 입니다!');
                    window.location.href = '/';
                }
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
            url:url,
            data:{
                reviewContent: content,
                rating: rating,
                createdDate: new Date().toISOString(),
                isDeleted: false, 
                memberNo: memberData.memberNo,
                farmNo: farmNo 
            }     
            
        }).then((response) => {
            if (isEdit) {
                alert("리뷰가 수정되었습니다.");
                navigate(`/review/${memberNo}`); // 수정된 경우 memberNo로 이동
            } else {
                alert("리뷰가 등록되었습니다.");
                navigate(`/farm/review/${farmNo}`); // 등록된 경우 farmNo로 이동
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
        </StyledContainer>
    );
};

export default ReviewRegist;