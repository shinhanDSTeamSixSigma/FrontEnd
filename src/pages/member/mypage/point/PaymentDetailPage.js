import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
`;

const PaymentDetailPage = () => {
    const [memberNo, setMemberNo] = useState(1); // 추후 변경
    const [cropNo, setCropNo] = useState(null);

    const location = useLocation();
    const { crop } = location.state;

    useEffect(() => {
        if (crop) {
            setCropNo(crop.cropNo);
        }
    }, [crop]);

    return (
        <>
            <StyledContainer>
                <TitleName name="작물 영수증" />
            </StyledContainer>
            <CropStatus memberNo={memberNo} cropNo={cropNo} baseUrl={baseUrl} />
            <StyledContainer>
                <TitleDetailName name="구매 정보" />
                <CropReceiptInfo baseUrl={baseUrl} crop={crop} />
                <ChargeDetail
                    memberNo={memberNo}
                    cropNo={cropNo}
                    baseUrl={baseUrl}
                />
            </StyledContainer>
        </>
    );
};
export default PaymentDetailPage;
