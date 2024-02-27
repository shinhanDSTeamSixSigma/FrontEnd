import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getMemberNo } from '../../../../api/farmApi';
import styled from 'styled-components';
import DiaryTitle from '../../../../components/diary/DiaryTitle';
import DiaryContent from '../../../../components/diary/DiaryContent';

const baseUrl = process.env.REACT_APP_BASE_URL;

const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
`;

const DiaryListPage = () => {
    const [memberData, setMemberData] = useState(null); // 농부의 memberNo

    const location = useLocation(); // 현재 위치
    const { cropNo } = location.state;

    console.log('일기 페이지' + memberData);
    console.log('일기 페이지' + cropNo);

    useEffect(() => {
        // 서버에서 사용자 정보 가져오기
        getMemberNo()
            .then((res) => {
                setMemberData(res.memberNo);
            })
            .catch((error) => {
                console.log('데이터 안옴!!!!!!');
                console.error(error);
            });
    }, [memberData]);

    return (
        <>
            <StyledContainer>
                <DiaryTitle
                    memberNo={memberData}
                    cropNo={cropNo}
                    baseUrl={baseUrl}
                />
            </StyledContainer>
            <DiaryContent
                memberNo={memberData}
                cropNo={cropNo}
                baseUrl={baseUrl}
            />
        </>
    );
};
export default DiaryListPage;
