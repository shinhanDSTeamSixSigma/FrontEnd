import styled from "styled-components";
import axios from "axios";
import Button from "../Button";
import BoardTitle from "./BoardTitle";
import { IoArrowBackSharp } from 'react-icons/io5';
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const StyledContainer = styled.div`
    background-color:white;
    font-size:1em;
    font-weight:600;
    border-radius:0.8rem;
`;
const FlexRow=styled.div`
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
export const BackButton = styled(IoArrowBackSharp)`
  color: var(--color-textgrey);
  margin-bottom: 1rem;
  cursor: pointer;
`;

const BoardRegist=(props)=>{
    const { farmNo } = useParams();
    const [title,setTitle]=useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();
    
    const onChangeTitle = useCallback((e)=>{
        setTitle(e.target.value);
    },[]);
    const onChangeContent = useCallback((e) => {
        setContent(e.target.value); 
    }, []);
    const handleBack = () => {
        setTitle('');
        setContent('');
        navigate(`/customer-inquiry/${farmNo}`); 
    };

    const handleRegister=()=>{
        // console.log("등록 호출 되는지");
        // console.log(content);
        axios.post("http://localhost:8090/board/inquiryRegist",{
            categoryNo:1,
            title:title,
            boardContent:content,
            createdDate: new Date().toISOString(),
            views: 0,
            isReplied: false,
            isDeleted: false, 
            memberNo:1,
            farmNo:50
        }).then((response)=>{
            alert("문의가 등록되었습니다.");
            navigate(`/customer-inquiry/${farmNo}`);
        }).catch((error)=>{
            console.error("Error occured while registering the board:", error);
        });
    };

    return(
        <>
        <StyledContainer>

            <BackButton onClick={handleBack} size="20" />
                <FlexRow>   
                    <BoardTitle name="문의하기"></BoardTitle>
                    <button 
                        onClick={handleRegister}
                        className="block rounded-md bg-[#80BCBD] text-white text-lg py-1.5 px-3">등록</button>
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
        </>
    )
};
export default BoardRegist;