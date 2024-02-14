import { useState, useEffect } from 'react';
import axios from 'axios';
import TextDivisionLine from '../TextDivisionLine';
import styled from 'styled-components';
import MyPointBlank from '../../components/point/MyPointBlank';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    margin: auto 0.5rem;
`;
const TextMargin = styled.div`
    margin: 1rem 0.3rem;
`;
const Height = styled.div`
    height: 30em;
    display: flex;
    align-items: center;
`;

const MyPointDetail = () => {
    const [points, setPoint] = useState([]);
    console.log(points);

    const memberNo = 1;
    const cropNo = 1;
    const changeValue = 2;
    const year = '2024';
    const month = '02';

    useEffect(() => {
        axios
            .get('http://localhost:8080/pay/point-detail', {
                params: {
                    memberNo: memberNo,
                    cropNo: cropNo,
                    changeValue: changeValue,
                    year: year,
                    month: month,
                },
            })
            .then((res) => {
                setPoint(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const getTextBasedOnChargeCause = (value) => {
        try {
            if (value === 0) {
                return '충전';
            } else if (value === 1) {
                return '구매 적립';
            } else if (value === 2) {
                return '작물 포인트 적립';
            } else if (value === 3) {
                return '토지 구매';
            } else if (value === 3) {
                return '영양제 구매';
            }
        } catch (error) {
            console.error('Error in getTextBasedOnValue:', error.message);
            return ''; // 예외가 발생하면 빈 문자열 반환
        }
    };
    const getTextBasedOnChargeValue = (value) => {
        try {
            if (value === 0) {
                return '+';
            } else if (value === 1) {
                return '-';
            }
        } catch (error) {
            console.error('Error in getTextBasedOnValue:', error.message);
            return ''; // 예외가 발생하면 빈 문자열 반환
        }
    };

    return (
        <>
            {points && points.length > 0 ? (
                points.map((point) => (
                    <div key={point[0]}>
                        <FlexRow>
                            <TextMargin
                                style={{ width: '25%', textAlign: 'left' }}
                            >
                                {new Date(point[2]).toLocaleString('ko-KR', {
                                    year: '2-digit',
                                    month: '2-digit',
                                    day: '2-digit',
                                })}
                            </TextMargin>
                            <TextMargin style={{ width: '45%' }}>
                                {getTextBasedOnChargeCause(point[4])}
                            </TextMargin>
                            <TextMargin
                                style={{
                                    width: '30%',
                                    textAlign: 'right',
                                    color: '#4F6F52',
                                    fontWeight: '700',
                                }}
                            >
                                {getTextBasedOnChargeValue(point[3])}
                                {point[1]}
                            </TextMargin>
                        </FlexRow>
                        <TextDivisionLine />
                    </div>
                ))
            ) : (
                <Height>
                    <MyPointBlank />
                </Height>
            )}
            <div style={{ marginBottom: '3rem' }}></div>
        </>
    );
};
export default MyPointDetail;
