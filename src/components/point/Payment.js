import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payment = () => {
    const [memberNo, setMemberNo] = useState(1); // 추후 변경
    const [cropNo, setCropNo] = useState(1); // 추후 변경

    useEffect(() => {
        const jquery = document.createElement('script');
        jquery.src = 'http://code.jquery.com/jquery-1.12.4.min.js';

        const iamport = document.createElement('script');
        iamport.src = 'http://cdn.iamport.kr/js/iamport.payment-1.1.7.js';

        document.head.appendChild(jquery);
        document.head.appendChild(iamport);

        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        };
    }, []);

    const requestPay = () => {
        const { IMP } = window;
        IMP.init('imp28256531');
        //IMP.request_pay(param, callback);
        IMP.request_pay(
            {
                pg: 'html5_inicis.INIBillTst',
                //pg: 'kakaopay',
                pay_method: 'card',
                merchant_uid: new Date().getTime() + '-' + memberNo,
                name: '포인트 충전',
                amount: 50000,
                buyer_email: 'test@naver.com',
                buyer_name: '나용',
                buyer_tel: '010-1234-5678',
                buyer_addr: '서울특별시',
                buyer_postcode: '123-456',
                digital: true,
                m_redirect_url: 'http://192.168.0.47:3000/mypage',
            },
            function (res) {
                console.log(res);
            } /*
            async (rsp) => {
                try {
                    const responseData = await axios.post(
                        'http://localhost:8080/verifyIamport',
                        {
                            billDto: {
                                imp_uid: rsp.imp_uid,
                                billNo: rsp.merchant_uid,
                                finalValue: rsp.amount,
                                originValue: rsp.amount,
                                discountValue: 0,
                                billDiv: 0,
                            },
                            pointDto: {
                                pointValue: rsp.paid_amount,
                                changeValue: 0,
                                changeCause: 0,
                                memberNo: memberNo,
                                cropNo: cropNo,
                                billNo: rsp.imp_uid,
                            },
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        },
                    );
                    if (rsp.paid_amount === responseData.amount) {
                        alert('결제 성공');
                    } else {
                        alert('결제 실패');
                    }
                } catch (error) {
                    console.error('Error while verifying payment:', error);
                    alert('결제 실패');
                }
            },*/,
        );
    };

    return (
        <div>
            <button onClick={requestPay}>결제하기</button>
        </div>
    );
};

export default Payment;
