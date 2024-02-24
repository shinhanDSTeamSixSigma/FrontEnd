import React, { useState } from 'react';
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
    const [memberNo, setMemberNo] = useState(1); // 추후 변경

    return (
        <>
            <StyledContainer>
                <TitleName name="나의 포인트" />
                <MyPoint memberNo={memberNo} baseUrl={baseUrl} />
                <MyPointDetail memberNo={memberNo} baseUrl={baseUrl} />
            </StyledContainer>
        </>
    );
};
export default PointDetailPage;
