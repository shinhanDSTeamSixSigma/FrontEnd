import React, { useState, useEffect } from 'react';
import { FaCircle } from 'react-icons/fa';
import axios from 'axios';
import styled from 'styled-components';
import TitleUserName from '../../components/diary/TitleUserName';
import TitleDivisionLine from '../TitleDivisionLine';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    margin: auto 0.2rem 0.3rem auto;
`;
const FontSize = styled.div`
    font-size: 0.8em;
`;

export default function DiaryDetailTitle() {
    const image = {
        margin: 'auto 0.1rem',
        width: '30%',
    };

    const [cropData, setCropData] = useState([]);

    const [memberNo, setMemberNo] = useState(1); // 추후 변경
    const [cropNo, setCropNo] = useState(1); // 추후 변경

    useEffect(() => {
        cropInfoData();
    }, []);

    const cropInfoData = () => {
        axios
            .get('http://localhost:8080/calendar/crop/crop-info', {
                params: {
                    memberNo: memberNo,
                    cropNo: cropNo,
                },
            })
            .then((res) => {
                setCropData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            {Array.isArray(cropData) &&
                cropData.map((crop, index) => (
                    <div key={index}>
                        <FlexRow>
                            <TitleUserName name={crop[0]} />
                        </FlexRow>
                    </div>
                ))}
            <TitleDivisionLine />
            <div class="d-flex bd-highlight mb-0">
                <div class="p-2 bd-highlight ml-auto">
                    <div className="d-flex justify-content-end">
                        <div className="d-flex justify-content-end">
                            <FaCircle color="#F97777" style={image} />
                            <FontSize>온도</FontSize>
                        </div>
                        <div className="d-flex justify-content-end">
                            <FaCircle color="#BACCFD" style={image} />
                            <FontSize>습도</FontSize>
                        </div>
                        <div className="d-flex justify-content-end">
                            <FaCircle color="#FCC9A7" style={image} />
                            <FontSize>조도</FontSize>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
