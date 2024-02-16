import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledContainer = styled.div`
    background-color: #c4dfaa;
    height: 4.5rem;
    margin-bottom: 2rem;

    display: flex;
    flex-direction: row;
    color: gray;
    align-items: center;
    justify-content: center;
`;
const Textmargin = styled.div`
    margin: auto 0.3rem;
    font-size: 0.8em;
    color: ${(props) => (props.isCompleted ? '#4f6f52' : '#A2A2A2')};
    font-weight: ${(props) => (props.isCompleted ? 'bold' : 'normal')};
`;

const CropStatus = () => {
    const [status, setStatus] = useState();

    //데이터
    const [memberNo, setMemberNo] = useState(1); // 추후 변경
    const [cropNo, setCropNo] = useState(1); // 추후 변경

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get('http://localhost:8080/pay/crop-status', {
                params: {
                    memberNo: memberNo,
                    cropNo: cropNo,
                },
            })
            .then((res) => {
                setStatus(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <StyledContainer>
                <Textmargin isCompleted={status === 0}>결제 완료</Textmargin>
                <Textmargin>></Textmargin>
                <Textmargin isCompleted={status === 1}>재배 대기</Textmargin>
                <Textmargin>></Textmargin>
                <Textmargin isCompleted={status === 2}>재배 진행</Textmargin>
                <Textmargin>></Textmargin>
                <Textmargin isCompleted={status === 3}>재배 완료</Textmargin>
                <Textmargin>></Textmargin>
                <Textmargin isCompleted={status === 4}>수령 완료</Textmargin>
            </StyledContainer>
        </>
    );
};
export default CropStatus;
