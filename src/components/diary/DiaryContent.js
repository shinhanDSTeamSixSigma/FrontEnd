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

const DiaryContent = ({ memberNo, cropNo, baseUrl }) => {
    const [diaryList, setDiaryList] = useState([]);
    const [formattedDiaryDate, setFormattedDiaryDate] = useState('');

    const [diaryDate, setDiaryDate] = useState();

    useEffect(() => {
        diaryListData();
    }, [diaryDate, memberNo, cropNo]);

    const diaryListData = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDiaryDate = `${year}-${month}-${day}`;
        console.log(formattedDiaryDate);
        setFormattedDiaryDate(formattedDiaryDate);

        axios
            .get(`${baseUrl}/calendar/list`, {
                params: {
                    memberNo: memberNo,
                    cropNo: cropNo,
                    diaryDate: formattedDiaryDate,
                },
                withCredentials: true,
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
                <DiaryContentDetail
                    memberNo={memberNo}
                    cropNo={cropNo}
                    baseUrl={baseUrl}
                />
                {/* diaryList가 비어있으면 regist 링크를, 비어있지 않으면 edit 링크를 표시 */}
                {diaryList && diaryList.length > 0 ? (
                    <Link
                        to={`list/${diaryList[0].diaryNo}`}
                        state={{ memberNo, cropNo, baseUrl }}
                    >
                        <FloatingButton />
                    </Link>
                ) : (
                    <Link
                        to={`regist/${formattedDiaryDate}`}
                        state={{ memberNo, cropNo, baseUrl }}
                    >
                        <FloatingButton />
                    </Link>
                )}
            </StyledContainer>
            {console.log('diaryList:', diaryList)}
        </>
    );
};
export default DiaryContent;
