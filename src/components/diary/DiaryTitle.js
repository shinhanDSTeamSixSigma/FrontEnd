import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import axios from 'axios';
import styled from 'styled-components';
import SelectButton from '../diary/SelectButton';
import TitleUserName from '../../components/diary/TitleUserName';
import TitleDivisionLine from '../TitleDivisionLine';

const baseUrl = process.env.REACT_APP_BASE_URL;

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    margin: auto 0.2rem 0.3rem auto;
`;
const DateCss = styled.div`
    color: #929292;
    font-size: 0.8em;
`;
const FontSize = styled.div`
    font-size: 0.8em;
`;

export default function DiaryTitle() {
    const image = {
        margin: 'auto 0.1rem',
        width: '30%',
    };

    const location = useLocation();
    const isDiaryCalendarPage = location.pathname === '/calendar';

    const diaryButtonStyle = {
        backgroundColor: isDiaryCalendarPage ? '#C4C4C4' : '#90C8AC',
        hoverBackgroundColor: isDiaryCalendarPage ? '#90C8AC' : '#C4DFAA',
    };

    const calendarButtonStyle = {
        backgroundColor: isDiaryCalendarPage ? '#90C8AC' : '#C4C4C4',
        hoverBackgroundColor: isDiaryCalendarPage ? '#C4DFAA' : '#90C8AC',
    };

    const [cropData, setCropData] = useState([]);

    const [memberNo, setMemberNo] = useState(1); // 추후 변경
    const [cropNo, setCropNo] = useState(1); // 추후 변경

    useEffect(() => {
        cropInfoData();
    }, []);

    const cropInfoData = () => {
        axios
            .get(`${baseUrl}/calendar/crop/crop-info`, {
                params: {
                    memberNo: memberNo,
                    cropNo: cropNo,
                },
                withCredentials: true,
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
                        {/*제목 및 버튼*/}
                        <FlexRow>
                            <TitleUserName name={crop[0]} />
                            <FlexRow style={{ marginLeft: 'auto' }}>
                                <SelectButton
                                    name="다이어리"
                                    backgroundColor={
                                        diaryButtonStyle.backgroundColor
                                    }
                                    hoverBackgroundColor={
                                        diaryButtonStyle.hoverBackgroundColor
                                    }
                                    to="/diary"
                                />
                                <SelectButton
                                    name="캘린더"
                                    backgroundColor={
                                        calendarButtonStyle.backgroundColor
                                    }
                                    hoverBackgroundColor={
                                        calendarButtonStyle.hoverBackgroundColor
                                    }
                                    to="/calendar"
                                />
                            </FlexRow>
                        </FlexRow>
                        <TitleDivisionLine />
                        {/*날짜 및 온습도*/}
                        <div class="d-flex bd-highlight mb-0">
                            <div class="me-auto p-2 bd-highlight">
                                <DateCss>
                                    {new Date(crop[1]).toLocaleDateString()}~
                                    {crop[2]
                                        ? new Date(crop[2]).toLocaleDateString()
                                        : '진행중'}
                                </DateCss>
                            </div>
                            <div class="p-2 bd-highlight">
                                <div className="d-flex justify-content-end">
                                    <div className="d-flex justify-content-end">
                                        <FaCircle
                                            color="#F97777"
                                            style={image}
                                        />
                                        <FontSize>온도</FontSize>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <FaCircle
                                            color="#BACCFD"
                                            style={image}
                                        />
                                        <FontSize>습도</FontSize>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <FaCircle
                                            color="#FCC9A7"
                                            style={image}
                                        />
                                        <FontSize>조도</FontSize>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
}
