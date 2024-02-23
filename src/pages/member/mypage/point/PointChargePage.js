import React, { useState } from 'react';
import styled from 'styled-components';
import TitleName from '../../../../components/point/TitleName';
import MyPointValue from '../../../../components/point/MyPointValue';
import PointCharge from '../../../../components/point/PointCharge';
import Payment from '../../../../components/point/Payment';

const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
`;

const PointChargePage = () => {
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
                <MyPointValue />
                <PointCharge
                    selectedAmount={selectedAmount}
                    selectedPaymentOption={selectedPaymentOption}
                    handleAmountClick={handleAmountSelect}
                    handlePaymentOptionClick={handlePaymentOptionSelect}
                />
            </StyledContainer>
            <Payment
                selectedAmount={selectedAmount}
                selectedPaymentOption={selectedPaymentOption}
            />
        </>
    );
};
export default PointChargePage;
