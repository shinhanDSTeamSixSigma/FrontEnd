import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import TitleName from '../../../../components/point/TitleName';
import TitleDetailName from '../../../../components/point/TitleDetailName';
import CropInfo from '../../../../components/point/CropInfo';
import FullButton from '../../../../components/FullButton';
import PointApply from '../../../../components/point/PointApply';
const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
`;

const PayApplyPage = () => {
    const navigate = useNavigate();
    const location = useLocation(); // 현재 위치
    const { cartItems, totalPrice, myCrop, myFarm } = location.state;

    const [memberNo, setMemberNo] = useState(1); // 추후 변경

    const handleButtonClick = async () => {
        try {
            let requestData;
            let apiUrl;
            let status = 0; //1: 땅, 2: 비료

            // 어떤 작업을 할지를 동적으로 결정
            if (status === 2) {
                requestData = {
                    pointValue: totalPrice, // 결제 금액
                    changeValue: 1,
                    changeCause: 4, // 영양제 구매

                    memberNo: memberNo,
                    cropNo: 1, //payItems.cropNo,
                };
                apiUrl = 'http://localhost:8080/pay/register-point';
            } else if (status === 1) {
                // cropEntity 등록 요청
                const cropResponse = await axios.post(
                    'http://localhost:8080/pay/register-crop',
                    {
                        cropNickname: '당근',
                        cropState: 2,
                        memberNo: memberNo,
                        dictNo: 7,
                        farmNo: 1,
                    },
                );

                // cropEntity 등록 후 서버 응답에서 cropNo 추출
                const cropNo = cropResponse.data;
                console.log('cropNo:', cropNo);

                // pointEntity에 cropNo 설정
                requestData = {
                    pointValue: totalPrice,
                    changeValue: 1,
                    changeCause: 3,
                    memberNo: memberNo,
                    cropNo: cropNo, // 추출한 cropNo 설정
                };
                apiUrl = 'http://localhost:8080/pay/register-point';
            }

            // 포인트 결제 등록 요청
            const response = await axios.post(apiUrl, requestData);

            // 포인트 결제 등록 성공 시 처리
            console.log('포인트 결제 내역 등록 성공:', response.data);
            if (status === 2) {
                alert('비료 구매가 완료되었습니다.');
            } else if (status === 1) {
                alert('땅 등록이 완료되었습니다.');
            }
            navigate('/mypage'); // 경로 수정해야함
        } catch (error) {
            console.error('Error registering point:', error);
        }
    };

    return (
        <>
            <StyledContainer>
                <TitleName name="결제하기" />
                <TitleDetailName name="구매 정보" />
                <CropInfo
                    cartItems={cartItems}
                    myCrop={myCrop}
                    myFarm={myFarm}
                />
                <PointApply />
            </StyledContainer>
            <FullButton name="결제하기" onClick={handleButtonClick} />
        </>
    );
};
export default PayApplyPage;
