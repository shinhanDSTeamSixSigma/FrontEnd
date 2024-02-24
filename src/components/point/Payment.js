import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FullButton from '../FullButton';

const baseUrl = process.env.REACT_APP_BASE_URL;

const Payment = ({ selectedAmount, selectedPaymentOption }) => {
    const navigate = useNavigate();

    const [memberNo, setMemberNo] = useState(1);
    const [cropNo, setCropNo] = useState(1);

    useEffect(() => {
        // 외부 스크립트 동적 로딩
        const jquery = document.createElement('script');
        jquery.src = 'http://code.jquery.com/jquery-1.12.4.min.js';

        const iamport = document.createElement('script');
        iamport.src = 'http://cdn.iamport.kr/js/iamport.payment-1.1.7.js';

        document.head.appendChild(jquery);
        document.head.appendChild(iamport);

        // 컴포넌트 언마운트 시 스크립트 제거
        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        };
    }, [selectedAmount, selectedPaymentOption]);

    const requestPay = async () => {
        try {
            const { IMP } = window;

            // 고유 주문 번호 생성
            const uniqueOrderNumber = new Date().getTime() + memberNo;
            console.log(selectedAmount);
            if (selectedAmount === undefined || selectedAmount === null) {
                alert('충전할 금액을 선택해주세요.');
                console.log(selectedAmount);
                return;
            }

            if (
                selectedPaymentOption === undefined ||
                selectedPaymentOption === null
            ) {
                alert('충전 방식을 설정해주세요.');
                console.log(selectedPaymentOption);
                return;
            }

            // IMP 초기화
            IMP.init('imp28256531');

            // 결제 요청 및 응답 처리
            const rsp = await new Promise((resolve, reject) => {
                IMP.request_pay(
                    {
                        pg: selectedPaymentOption,
                        pay_method: 'card',
                        merchant_uid: uniqueOrderNumber,
                        name: '포인트 충전',
                        amount: selectedAmount,
                        buyer_email: 'test@naver.com',
                        buyer_name: '나용',
                        buyer_tel: '010-1234-5678',
                        buyer_addr: '서울특별시',
                        buyer_postcode: '123-456',
                        digital: true,
                        m_redirect_url: 'http://localhost:3000/pay/detail',
                    },
                    async (rsp) => {
                        try {
                            if (rsp.success) {
                                // 서버로 결제 정보 전송
                                const billResponse = await axios.post(
                                    `${baseUrl}/charge/register-bill`,
                                    {
                                        merchantUid: rsp.merchant_uid,
                                        finalValue: rsp.paid_amount,
                                        originValue: rsp.paid_amount,
                                        discountValue: 0,
                                        billDiv: 0,
                                        memberNo: memberNo,
                                    },
                                    {
                                        withCredentials: true,
                                    },
                                );

                                const billNo = billResponse.data;
                                console.log('billNo:', billNo);

                                // 서버로 포인트 정보 전송
                                const pointResponse = await axios.post(
                                    `${baseUrl}/pay/register-point`,
                                    {
                                        pointValue: rsp.paid_amount,
                                        changeValue: 0,
                                        changeCause: 0,
                                        memberNo: memberNo,
                                        cropNo: cropNo,
                                        billNo: billNo,
                                    },
                                    {
                                        withCredentials: true,
                                    },
                                );
                                if (pointResponse.data.result === 'success') {
                                    alert('결제 성공');
                                    navigate('/pay/detail');
                                } else {
                                    alert('결제 실패');
                                }
                            } else {
                                // 결제 오류 시
                                alert('결제 오류');
                            }
                        } catch (error) {
                            // 포인트 충전 실패 또는 예외 발생 시
                            alert('포인트 충전 실패, 결제 취소 처리됨');
                        }
                    },
                );
            });
        } catch (error) {
            console.error('Error while processing payment:', error);
            alert('결제 오류');
        }
    };

    return (
        <div>
            <FullButton name="충전하기" onClick={requestPay}></FullButton>
        </div>
    );
};

export default Payment;
