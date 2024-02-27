import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getMemberNo } from '../../../../api/farmApi';
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
    margin-top: 2rem;
`;

const PointChargePage = () => {
    const [memberData, setMemberData] = useState(null); // 농부의 memberNo

    const location = useLocation(); // 현재 위치
    const { userInfo } = location.state;

    const [selectedAmount, setSelectedAmount] = useState(null);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);

    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount === undefined ? '' : amount);
    };

    const handlePaymentOptionSelect = (option) => {
        setSelectedPaymentOption(option);
    };

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
                <TitleName name="충전하기" />
                <MyPointValue memberNo={memberData} baseUrl={baseUrl} />
                <PointCharge
                    selectedAmount={selectedAmount}
                    selectedPaymentOption={selectedPaymentOption}
                    handleAmountClick={handleAmountSelect}
                    handlePaymentOptionClick={handlePaymentOptionSelect}
                />
            </StyledContainer>
            <Payment
                userInfo={userInfo}
                baseUrl={baseUrl}
                selectedAmount={selectedAmount}
                selectedPaymentOption={selectedPaymentOption}
            />
        </>
    );
};
export default PointChargePage;
