import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import DiaryContentDetail from '../diary/DiaryContentDetail';
import FloatingButton from '../diary/FloatingButton';

const StyledContainer = styled.div`
    background-color: #f9f7c9;
    padding: 0.5rem 1.5rem;
    min-height: 30em;
`;

const DiaryContent = () => {
    const [diaryList, setDiaryList] = useState([]);

    const [memberNo, setMemberNo] = useState(1); // 추후 변경
    const [cropNo, setCropNo] = useState(1); // 추후 변경
    const [diaryDate, setDiaryDate] = useState(new Date()); // 현재 날짜로 초기화

    useEffect(() => {
        diaryListData();
    }, [diaryDate]);

    const diaryListData = () => {
        axios
            .get('http://localhost:8080/calendar/list', {
                params: {
                    memberNo: memberNo,
                    cropNo: cropNo,
                    diaryDate: diaryDate,
                },
            })
            .then((res) => {
                setDiaryList(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <StyledContainer>
                <DiaryContentDetail />
                {/* diaryList가 비어있으면 regist 링크를, 비어있지 않으면 edit 링크를 표시 */}
                {diaryList && diaryList.length > 0 ? (
                    <Link to={`list/${diaryList[0].diaryNo}`}>
                        <FloatingButton />
                    </Link>
                ) : (
                    <Link to="regist">
                        <FloatingButton />
                    </Link>
                )}
            </StyledContainer>
        </>
    );
};
export default DiaryContent;
