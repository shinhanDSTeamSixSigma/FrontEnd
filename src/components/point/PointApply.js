import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import TitleDetailName from './TitleDetailName';
import TitleDivisionLine from '../TitleDivisionLine';
import styled from 'styled-components';
//import 'bootstrap/dist/css/bootstrap.min.css';
import ResultModal from '../modal/ResultModal';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`;
const PayCss = styled.div`
    font-weight: 600;
    font-size: 1em;
    margin: auto 0;
`;
const FinalPayCss = styled.div`
    font-weight: 600;
    font-size: 1.3em;
    color: #4f6f52;
`;

const PointApply = ({ memberNo, baseUrl, isOff, onToggle }) => {
    const location = useLocation(); // useLocation 훅을 사용하여 현재 위치의 정보를 가져옵니다.
    const { totalPrice } = location.state;

    const [points, setPoint] = useState(0);
    const [resultMessage, setResultMessage] = useState(null);

    useEffect(() => {
        fetchData();
    }, [memberNo, baseUrl]);

    const fetchData = () => {
        axios
            .get(`${baseUrl}/pay/current-point`, {
                params: {
                    memberNo: memberNo,
                },
                withCredentials: true,
            })
            .then((res) => {
                setPoint(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleMinusPoint = () => {
        if (totalPrice > points) {
            setResultMessage({
                title: '',
                content: '포인트가 부족합니다. 충전이 필요합니다.',
                type: 'success',
            });
            return;
        }

        setPoint((current) => current - totalPrice);
        //setIsOff(false);
        onToggle(false);
    };
    const handlePlusPoint = () => {
        setPoint((current) => current + totalPrice);
        //setIsOff(true);
        onToggle(true);
    };
    const closeModal = () => {
        setResultMessage(null);
    };
    return (
        <>
            <TitleDetailName name="포인트" />
            {/*포인트 결제란*/}
            <div style={{ margin: '1rem 1rem 2rem 1rem' }}>
                <FlexRow>
                    <div
                        className="input-group mb-3"
                        style={{ width: '12rem', marginRight: '1rem' }}
                    >
                        <input
                            type="text"
                            class="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder={
                                isOff ? '0' : totalPrice.toLocaleString('ko-KR')
                            }
                            disabled
                        />
                    </div>
                    <button
                        onClick={() =>
                            isOff ? handleMinusPoint() : handlePlusPoint()
                        }
                        type="button"
                        className="btn btn-outline-secondary"
                        style={{
                            width: '5rem',
                            height: '2.4rem',
                            fontSize: '1em',
                        }}
                    >
                        전체 사용
                    </button>
                </FlexRow>
                <FlexRow style={{ margin: '-1rem 0.5rem 0.5rem 0.5rem' }}>
                    <FlexRow style={{ fontSize: '1em', color: '#878787' }}>
                        <div>보유 포인트</div>
                        <div>{points.toLocaleString('ko-KR')}</div>
                        <div>P</div>
                    </FlexRow>
                </FlexRow>
            </div>
            {/*총 결제 금액*/}
            <div style={{ margin: '3rem auto' }}>
                <TitleDivisionLine />
                <FlexRow style={{ margin: '0.5rem 1rem 0.5rem 1rem' }}>
                    <PayCss>결제 금액</PayCss>
                    <FlexRow style={{ marginLeft: 'auto' }}>
                        <FinalPayCss>
                            {isOff ? totalPrice.toLocaleString('ko-KR') : '0'}
                        </FinalPayCss>

                        <FinalPayCss>원</FinalPayCss>
                    </FlexRow>
                </FlexRow>
                <TitleDivisionLine />
            </div>
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
export default PointApply;
