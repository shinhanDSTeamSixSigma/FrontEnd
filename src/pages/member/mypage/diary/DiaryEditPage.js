import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import DiaryDetailTitle from '../../../../components/diary/DiaryDetailTitle';
import DiaryEdit from '../../../../components/diary/DiaryEdit';

const baseUrl = process.env.REACT_APP_BASE_URL;

const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
`;

const DiaryEditPage = () => {
    const location = useLocation(); // 현재 위치
    const { memberNo, cropNo } = location.state;

    console.log('수정 페이지' + memberNo);
    console.log('수정 페이지' + cropNo);

    return (
        <>
            <StyledContainer>
                <DiaryDetailTitle
                    memberNo={memberNo}
                    cropNo={cropNo}
                    baseUrl={baseUrl}
                />
            </StyledContainer>
            <DiaryEdit memberNo={memberNo} cropNo={cropNo} baseUrl={baseUrl} />
        </>
    );
};
export default DiaryEditPage;
