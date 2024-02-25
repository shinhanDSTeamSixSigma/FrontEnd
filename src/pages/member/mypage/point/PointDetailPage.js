import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TitleName from '../../../../components/point/TitleName';
import MyPointDetail from '../../../../components/point/MyPointDetail';
import MyPoint from '../../../../components/point/MyPoint';

const baseUrl = process.env.REACT_APP_BASE_URL;

const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
`;
const PointDetailPage = () => {
    const location = useLocation(); // 현재 위치
    const { userInfo } = location.state;
    console.log('포인트 내역 페이지' + userInfo);

    const memberNo = userInfo.memberNo;
    console.log('포인트 내역 페이지' + memberNo);

    return (
        <>
            <StyledContainer>
                <TitleName name="나의 포인트" />
                <MyPoint userInfo={userInfo} baseUrl={baseUrl} />
                <MyPointDetail memberNo={memberNo} baseUrl={baseUrl} />
            </StyledContainer>
        </>
    );
};
export default PointDetailPage;
