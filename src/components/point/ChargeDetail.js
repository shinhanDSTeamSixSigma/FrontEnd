import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import TextDivisionLine from '../TextDivisionLine';
import TitleDetailName from '../point/TitleDetailName';
import CropPoint from './CropPoint';

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

const ChargeDetail = () => {
    const textCss = {
        display: 'flex',
        justifyContent: 'center',
        width: '1rem',
    };

    const [totalPoint, setTotalPoint] = useState();
    const [landInfo, setLandInfo] = useState({});
    const [fertilizerInfo, setFertilizerInfo] = useState({});

    const [status, setStatus] = useState();

    //데이터
    const [memberNo, setMemberNo] = useState(1); // 추후 변경
    const [cropNo, setCropNo] = useState(1); // 추후 변경

    useEffect(() => {
        fetchCropChargeData();
        fetchCropStatusData();
    }, []);

    const fetchCropChargeData = () => {
        axios
            .get('http://localhost:8080/receipt/crop-charge', {
                params: {
                    memberNo: memberNo,
                    cropNo: cropNo,
                },
            })
            .then((res) => {
                const [totalData, landData, fertilizerData] = res.data;
                setTotalPoint(totalData);

                setLandInfo({
                    count: landData[0],
                    totalAmount: landData[1],
                });

                setFertilizerInfo({
                    count: fertilizerData[0],
                    totalAmount: fertilizerData[1],
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const fetchCropStatusData = () => {
        axios
            .get('http://localhost:8080/receipt/crop-status', {
                params: {
                    memberNo: memberNo,
                    cropNo: cropNo,
                },
            })
            .then((res) => {
                setStatus(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <TitleDetailName name="결제 정보" />
            {/*토지 대여 금액*/}
            <FlexRow className="d-flex m-1">
                <div className="me-auto p-2">토지 대여</div>
                <FlexRow
                    className="p-2"
                    style={{ width: '3rem', justifyContent: 'end' }}
                >
                    <div>x</div>
                    <div style={textCss}>{landInfo.count}</div>
                </FlexRow>
                <FlexRow
                    className="p-2"
                    style={{ width: '5rem', justifyContent: 'end' }}
                >
                    <div>{Number(landInfo.totalAmount).toLocaleString()}</div>
                    <div>원</div>
                </FlexRow>
            </FlexRow>
            <TextDivisionLine />
            {/*영양제 결제 금액*/}
            <FlexRow className="d-flex m-1">
                <div className="me-auto p-2">영양제</div>
                <FlexRow
                    className="p-2"
                    style={{ width: '3rem', justifyContent: 'end' }}
                >
                    <div>x</div>
                    <div style={textCss}>{fertilizerInfo.count}</div>
                </FlexRow>
                <FlexRow
                    className="p-2"
                    style={{ width: '5rem', justifyContent: 'end' }}
                >
                    <div>
                        {Number(fertilizerInfo.totalAmount).toLocaleString()}
                    </div>
                    <div>원</div>
                </FlexRow>
            </FlexRow>
            <TextDivisionLine />
            {/*총 결제 금액*/}
            <FlexRow className="d-flex m-1">
                <PayCss className="me-auto p-2">총 결제 금액</PayCss>
                <FlexRow className="p-2">
                    <FinalPayCss>
                        {Number(totalPoint).toLocaleString()}
                    </FinalPayCss>
                    <FinalPayCss>원</FinalPayCss>
                </FlexRow>
            </FlexRow>
            {/*작물 수확 금액*/}
            {status === 4 ? (
                <CropPoint />
            ) : (
                <div style={{ marginBottom: '3rem' }}></div>
            )}
        </>
    );
};
export default ChargeDetail;
