import styled from "styled-components";
import axios from "axios";
import { IoArrowBackSharp } from 'react-icons/io5';
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardTitle from "./BoardTitle";
import ResultModal from "../modal/ResultModal"; // 1. ResultModal 불러오기
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

const baseUrl = process.env.REACT_APP_BASE_URL;

const BoardRegist = ({ title: initialTitle, content: initialContent, boardNo, isEdit }) => {
    const { farmNo } = useParams();
    const { memberNo } = useParams();
    const [title, setTitle] = useState(initialTitle || '');
    const [content, setContent] = useState(initialContent || '');
    const navigate = useNavigate();
    const [memberData, setMemberData] = useState();
    const [response, setResponse] = useState(null);
    const { memberMoveToRead } = useCustomMove();
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
    const closeModal = () => {
        setResponse(null);
        memberMoveToRead(farmNo); //moveToList( )호출
    };
    useEffect(() => {
        // 서버에서 사용자 정보 가져오기
        getMemberNo()
            .then((res) => {
                setMemberData(res);
                console.log(res);
                console.log('멤버데이터 ', JSON.stringify(res.memberNo));
                if (res.role !== 'FARMER') {
                    // console.log(res.role);
                    // alert('농부만 들어갈 수 있는 페이지 입니다!');
                    // window.location.href = '/';
                }
            })
            .catch((error) => {
                console.log('데이터 안옴!!!!!!');
                console.error(error);
            });
    }, []);

    const handleRegisterOrUpdate = () => {
        const url = isEdit ? `${baseUrl}/board/inquiryEdit/${boardNo}` : `${baseUrl}/board/inquiryRegist`;
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
                memberNo: memberData.memberNo,
                farmNo: farmNo,
                withCredentials: true,
            }
        }).then((response) => {
            if (isEdit) {
                // 수정된 경우 ResultModal을 통해 메시지 표시
                setResponse({ message: "문의가 수정되었습니다." });
            } else {
                // 등록된 경우 ResultModal을 통해 메시지 표시
                setResponse({ message: "문의가 등록되었습니다."});
            }
        }).catch((error) => {
            console.error(isEdit ? "Error occured while updating the board:" : "Error occured while registering the board:", error);
            // 에러가 발생한 경우 ResultModal을 통해 메시지 표시
            setResponse({ message: isEdit ? "문의 수정 중 오류가 발생했습니다." : "문의 등록 중 오류가 발생했습니다.", type: "error" });
        });
    };

    return (
        <StyledContainer>
            <BackButton onClick={handleBack} size="20" />
            <FlexRow>
                <BoardTitle name={isEdit ? "문의 수정하기" : "문의하기"} />
                <button
                    onClick={handleRegisterOrUpdate}
                    className="block rounded-md bg-[#80BCBD] text-white py-1 px-2.5">
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
            {/* 2. Response에 따라 ResultModal을 렌더링 */}
            {response && (
                <ResultModal
                    title={response.type}
                    content={response.message}
                    callbackFnc={closeModal}
                />
            )}
        </StyledContainer>
    );
};

export default BoardRegist;
