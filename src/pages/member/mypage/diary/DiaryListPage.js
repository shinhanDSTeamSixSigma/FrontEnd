import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
    const location = useLocation(); // 현재 위치
    const { memberNo, cropNo } = location.state;

    console.log('일기 페이지' + memberNo);
    console.log('일기 페이지' + cropNo);

    return (
        <>
            <StyledContainer>
                <DiaryTitle
                    memberNo={memberNo}
                    cropNo={cropNo}
                    baseUrl={baseUrl}
                />
            </StyledContainer>
            <DiaryContent
                memberNo={memberNo}
                cropNo={cropNo}
                baseUrl={baseUrl}
            />
        </>
    );
};
export default DiaryListPage;
