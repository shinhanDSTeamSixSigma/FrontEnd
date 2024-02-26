import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import DiaryDetailTitle from '../../../../components/diary/DiaryDetailTitle';
import DiaryRegist from '../../../../components/diary/DiaryRegist';

const baseUrl = process.env.REACT_APP_BASE_URL;

const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
`;

const DiaryRegistPage = () => {
    const location = useLocation(); // 현재 위치
    const { memberNo, cropNo } = location.state;

    console.log('등록 페이지' + memberNo);
    console.log('등록 페이지' + cropNo);

    return (
        <>
            <StyledContainer>
                <DiaryDetailTitle
                    memberNo={memberNo}
                    cropNo={cropNo}
                    baseUrl={baseUrl}
                />
            </StyledContainer>
            <DiaryRegist
                memberNo={memberNo}
                cropNo={cropNo}
                baseUrl={baseUrl}
            />
        </>
    );
};
export default DiaryRegistPage;
