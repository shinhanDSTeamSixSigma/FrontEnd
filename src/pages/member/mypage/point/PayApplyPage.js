import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMemberNo } from '../../../../api/farmApi';
import axios from 'axios';
import styled from 'styled-components';
import TitleName from '../../../../components/point/TitleName';
import TitleDetailName from '../../../../components/point/TitleDetailName';
import CropInfo from '../../../../components/point/CropInfo';
import FullButton from '../../../../components/FullButton';
import PointApply from '../../../../components/point/PointApply';
import ResultModal from '../../../../components/modal/ResultModal';

const baseUrl = process.env.REACT_APP_BASE_URL;

const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
`;

const PayApplyPage = () => {
    //const crop = location.state.crop;
    const cropNo =1;

    const [memberData, setMemberData] = useState(null); // 농부의 memberNo

    const navigate = useNavigate();
    const location = useLocation(); // 현재 위치
    const { cartItems, totalPrice, myCrop, myFarm } = location.state;
    const [resultMessage, setResultMessage] = useState(null);

    //버튼 토글 상태
    const [isOff, setIsOff] = useState(true);

    const handleButtonClick = async () => {
        try {
            let requestData;
            let apiUrl;
            let status = cartItems[0].optionNumber; //1: 땅, 2: 비료

            // 어떤 작업을 할지를 동적으로 결정
            if (status === 2) {
                requestData = {
                    pointValue: totalPrice, // 결제 금액
                    changeValue: 1,
                    changeCause: 4, // 영양제 구매

                    memberNo: memberData,
                    cropNo: cropNo,
                };
                apiUrl = `${baseUrl}/pay/register-point`;
            } else if (status === 1) {
                // cropEntity 등록 요청
                const cropResponse = await axios.post(
                    `${baseUrl}/pay/register-crop`,
                    {
                        cropNickname: myCrop.cropName,
                        cropState: 2,
                        memberNo: memberData,
                        dictNo: myCrop.cropDictNo,
                        farmNo: myFarm.farmNo,
                    },
                    { withCredentials: true },
                );

                // cropEntity 등록 후 서버 응답에서 cropNo 추출
                const cropNo = cropResponse.data;
                console.log('cropNo:', cropNo);

                // pointEntity에 cropNo 설정
                requestData = {
                    pointValue: totalPrice,
                    changeValue: 1,
                    changeCause: 3,
                    memberNo: memberData,
                    cropNo: cropNo, // 추출한 cropNo 설정
                };
                apiUrl = `${baseUrl}/pay/register-point`;
            }

            // 포인트 결제 등록 요청
            const response = await axios.post(apiUrl, requestData);

            // 포인트 결제 등록 성공 시 처리
            console.log('포인트 결제 내역 등록 성공:', response.data);
            if (status === 2) {
                //alert('비료 구매가 완료되었습니다.');
                setResultMessage({
                    title: '',
                    content: '비료 구매가 완료되었습니다.',
                    type: 'success',
                });
            } else if (status === 1) {
                //alert('땅 등록이 완료되었습니다.');
                setResultMessage({
                    title: '',
                    content: '땅 등록이 완료되었습니다.',
                    type: 'success',
                });
            }
            navigate('/mypage');
        } catch (error) {
            console.error('Error registering point:', error);
        }
    };

    const closeModal = () => {
        setResultMessage(null);
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
                <TitleName name="결제하기" />
                <TitleDetailName name="구매 정보" />
                <CropInfo
                    cartItems={cartItems}
                    myCrop={myCrop}
                    myFarm={myFarm}
                />
                <PointApply
                    memberNo={memberData}
                    baseUrl={baseUrl}
                    isOff={isOff}
                    onToggle={setIsOff}
                />
            </StyledContainer>
            <FullButton
                name="결제하기"
                onClick={() =>
                    isOff
                        ? //alert('포인트 사용을 선택해주세요.')
                        setResultMessage({
                            title: '',
                            content: '포인트 사용을 선택해주세요.',
                            type: 'success',
                        })
                        : handleButtonClick()
                }
            />
            {resultMessage && (
                <ResultModal
                    title={resultMessage.title}
                    content={resultMessage.content}
                    callbackFnc={closeModal}
                />
            )}
        </>
    );
};
export default PayApplyPage;
