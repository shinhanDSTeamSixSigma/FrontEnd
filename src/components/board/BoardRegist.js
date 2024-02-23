import styled from "styled-components";
import axios from "axios";
import { IoArrowBackSharp} from 'react-icons/io5';
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardTitle from "./BoardTitle";

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

const BoardRegist = ({ title: initialTitle, content: initialContent, boardNo, isEdit }) => {
    const { farmNo } = useParams();
    const { memberNo } = useParams();
    const [title, setTitle] = useState(initialTitle || '');
    const [content, setContent] = useState(initialContent || '');
    const navigate = useNavigate();

    useEffect(() => {
        if (isEdit && initialTitle && initialContent) {
            setTitle(initialTitle);
            setContent(initialContent);
        }
    }, [isEdit, initialTitle, initialContent]);

    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);

    const onChangeContent = useCallback((e) => {
        setContent(e.target.value);
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const handleRegisterOrUpdate = () => {
        const url = isEdit ? `http://localhost:8090/board/inquiryEdit/${boardNo}` : `http://localhost:8090/board/inquiryRegist`;
        const method = isEdit ? 'put' : 'post';

        axios({
            method: method,
            url: url,
            data: {
                categoryNo: 1,
                title: title,
                boardContent: content,
                createdDate: new Date().toISOString(),
                views: 0,
                isReplied: false,
                isDeleted: false,
                memberNo: 1,
                farmNo: 50 // 임시값, 실제로는 어떻게 처리할지에 따라 변경
            }
        }).then((response) => {
            if (isEdit) {
                alert("문의가 수정되었습니다.");
                navigate(`/inquiry/${memberNo}`); // 수정된 경우 memberNo로 이동
            } else {
                alert("문의가 등록되었습니다.");
                navigate(`/farm/inquiry/${farmNo}`); // 등록된 경우 farmNo로 이동
            }
        }).catch((error) => {
            console.error(isEdit ? "Error occured while updating the board:" : "Error occured while registering the board:", error);
        });
    };

    return (
        <StyledContainer>
            <BackButton onClick={handleBack} size="20" />
            <FlexRow>
                <BoardTitle name={isEdit ? "문의 수정하기" : "문의하기"} />
                <button
                    onClick={handleRegisterOrUpdate}
                    className="block rounded-md bg-[#80BCBD] text-white text-lg py-1.5 px-3">
                    {isEdit ? "수정" : "등록"}
                </button>
            </FlexRow>
            <FormItem>
                <input
                    value={title}
                    onChange={onChangeTitle}
                    placeholder="제목을 입력해 주세요"
                ></input>
            </FormItem>
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

export default BoardRegist;
