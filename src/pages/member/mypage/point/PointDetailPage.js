import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getMemberNo } from '../../../../api/farmApi';
import styled from 'styled-components';
import TitleName from '../../../../components/point/TitleName';
import MyPointDetail from '../../../../components/point/MyPointDetail';
import MyPoint from '../../../../components/point/MyPoint';

const baseUrl = process.env.REACT_APP_BASE_URL;

const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
    margin-top: 2rem;
`;
const PointDetailPage = () => {
    const [memberData, setMemberData] = useState(null); // 농부의 memberNo

    const location = useLocation(); // 현재 위치
    const { userInfo } = location.state;
    console.log('포인트 내역 페이지' + userInfo);

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
                <TitleName name="나의 포인트" />
                <MyPoint userInfo={userInfo} baseUrl={baseUrl} />
                <MyPointDetail memberNo={memberData} baseUrl={baseUrl} />
            </StyledContainer>
        </>
    );
};
export default PointDetailPage;
