import React, { useState } from 'react';
import styled from 'styled-components';
import TitleName from '../../../../components/point/TitleName';
import MyPointValue from '../../../../components/point/MyPointValue';
import PointCharge from '../../../../components/point/PointCharge';
import Payment from '../../../../components/point/Payment';

const baseUrl = process.env.REACT_APP_BASE_URL;

const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
`;

const PointChargePage = () => {
    const [memberNo, setMemberNo] = useState(1); // 추후 변경
    const [cropNo, setCropNo] = useState(1); // 추후 변경

    const [selectedAmount, setSelectedAmount] = useState(null);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);

    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount === undefined ? '' : amount);
    };

    const handlePaymentOptionSelect = (option) => {
        setSelectedPaymentOption(option);
    };

    return (
        <>
            <StyledContainer>
                <TitleName name="충전하기" />
                <MyPointValue memberNo={memberNo} baseUrl={baseUrl} />
                <PointCharge
                    selectedAmount={selectedAmount}
                    selectedPaymentOption={selectedPaymentOption}
                    handleAmountClick={handleAmountSelect}
                    handlePaymentOptionClick={handlePaymentOptionSelect}
                />
            </StyledContainer>
            <Payment
                memberNo={memberNo}
                cropNo={cropNo}
                baseUrl={baseUrl}
                selectedAmount={selectedAmount}
                selectedPaymentOption={selectedPaymentOption}
            />
        </>
    );
};
export default PointChargePage;
