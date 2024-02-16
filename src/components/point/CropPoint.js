import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import TitleDetailName from '../point/TitleDetailName';

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

const CropPoint = () => {
    const [point, setPoint] = useState();

    //데이터
    const [memberNo, setMemberNo] = useState(1); // 추후 변경
    const [cropNo, setCropNo] = useState(1); // 추후 변경

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get('http://localhost:8080/pay/crop-point', {
                params: {
                    memberNo: memberNo,
                    cropNo: cropNo,
                },
            })
            .then((res) => {
                setPoint(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <div style={{ margin: '3rem auto' }}>
                <TitleDetailName name="작물 수령 정보" />
                <FlexRow className="d-flex m-1">
                    <PayCss className="me-auto p-2">포인트 수령</PayCss>
                    <FlexRow className="p-2">
                        <FinalPayCss>
                            {Number(point).toLocaleString()}
                        </FinalPayCss>
                        <FinalPayCss>원</FinalPayCss>
                    </FlexRow>
                </FlexRow>
            </div>
        </>
    );
};
export default CropPoint;
