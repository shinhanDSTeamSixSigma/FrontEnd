import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`;

export default function MyPointValue({ memberNo, baseUrl }) {
    const pointResult = {
        fontWeight: '700',
        fontSize: '1.4em',
        marginLeft: '0.5rem',
    };

    const [points, setPoint] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

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
    return (
        <>
            {/*포인트 총 합계*/}
            <FlexRow style={{ margin: 'auto 1rem' }}>
                <FlexRow style={{ alignItems: 'center' }}>
                    <div className="point-text">
                        <img
                            className="wallet"
                            alt="wallet"
                            src={
                                process.env.PUBLIC_URL + '/img/diary/wallet.png'
                            }
                        />
                    </div>
                    <div style={pointResult}>
                        {points.toLocaleString('ko-KR')} 원
                    </div>
                </FlexRow>
            </FlexRow>
        </>
    );
}
