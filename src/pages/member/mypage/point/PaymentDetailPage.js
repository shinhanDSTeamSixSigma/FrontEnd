import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getMemberNo } from '../../../../api/farmApi';
import styled from 'styled-components';
import TitleName from '../../../../components/point/TitleName';
import TitleDetailName from '../../../../components/point/TitleDetailName';
import ChargeDetail from '../../../../components/point/ChargeDetail';
import CropReceiptInfo from '../../../../components/point/CropReceiptInfo';
import CropStatus from '../../../../components/point/CropStatus';

const baseUrl = process.env.REACT_APP_BASE_URL;

const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
    margin-top: 2rem;
`;

const PaymentDetailPage = () => {
    const [memberData, setMemberData] = useState(null); // 농부의 memberNo
    const [cropData, setCropData] = useState(null);

    const location = useLocation();
    const { crop } = location.state;

    useEffect(() => {
        if (crop) {
            setCropData(crop.cropNo);
        }
    }, [cropData]);

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
                <TitleName name="작물 영수증" />
            </StyledContainer>
            <CropStatus
                memberNo={memberData}
                cropNo={cropData}
                baseUrl={baseUrl}
            />
            <StyledContainer>
                <TitleDetailName name="구매 정보" />
                <CropReceiptInfo baseUrl={baseUrl} crop={crop} />
                <ChargeDetail
                    memberNo={memberData}
                    cropNo={cropData}
                    baseUrl={baseUrl}
                />
            </StyledContainer>
        </>
    );
};
export default PaymentDetailPage;
