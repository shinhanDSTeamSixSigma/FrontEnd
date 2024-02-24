import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import axios from 'axios';
import Button from '../Button';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyPointValue from './MyPointValue';

const baseUrl = process.env.REACT_APP_BASE_URL;

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`;
const PointBoxColor = styled.div`
    background-color: #d9d9d9;
    border-radius: 0.8rem;
    padding: 1.2rem;
    margin: 1rem auto;
`;
const MarginLeft = styled.div`
    margin: 0.4rem 0.4rem 0 auto;
`;
const TextMargin = styled.div`
    margin: 0.4rem auto 0.4rem 0;
`;

export default function MyPoint() {
    const [points, setPoint] = useState(0);
    const [monthlyCharge, setMonthlyCharge] = useState(0);

    //데이터
    const [memberNo, setMemberNo] = useState(1); // 추후 변경

    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;

    useEffect(() => {
        fetchData(`${baseUrl}/pay/total-charge`, { credentials: 'include' });
        fetchData(`${baseUrl}/pay/month-charge`, {
            year,
            month,
            credentials: 'include',
        });
    }, [year, month]);

    const fetchData = (url, params = {}) => {
        axios
            .get(url, {
                params: {
                    memberNo: memberNo,
                    ...params,
                },
            })
            .then((res) => {
                // 총 충전 금액
                if (url === `${baseUrl}/pay/total-charge`) {
                    setPoint(res.data);
                }
                // 이번 달 충전 금액
                if (url === `${baseUrl}/pay/month-charge`) {
                    setMonthlyCharge(res.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <FlexRow>
                {/*포인트 총 합계*/}
                <MyPointValue />
                <Link
                    to="/pay/charge"
                    style={{ marginLeft: 'auto', textDecoration: 'none' }}
                >
                    <Button name="충전하기" />
                </Link>
            </FlexRow>
            {/*포인트 박스*/}
            <PointBoxColor>
                <FlexRow>
                    <FlexRow>
                        <TextMargin>총 충전 금액</TextMargin>
                        <BsExclamationCircle
                            style={{ margin: 'auto 0.3rem' }}
                        />
                    </FlexRow>
                    <MarginLeft>{points.toLocaleString()} 원</MarginLeft>
                </FlexRow>
                <FlexRow>
                    <TextMargin>이번달 충전 금액</TextMargin>
                    <MarginLeft>{monthlyCharge.toLocaleString()} 원</MarginLeft>
                </FlexRow>
            </PointBoxColor>
        </>
    );
}
