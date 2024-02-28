import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import axios from 'axios';
import styled from 'styled-components';
import SelectButton from '../diary/SelectButton';
import TitleUserName from '../../components/diary/TitleUserName';
import TitleDivisionLine from '../TitleDivisionLine';

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

export default function DiaryTitle({ memberNo, cropNo, baseUrl }) {
    const image = {
        margin: 'auto 0.1rem',
        width: '30%',
    };

    const navigate = useNavigate();
    const handleButtonClick = (path) => {
        navigate(path, { state: { memberNo, cropNo } });
    };

    const [cropData, setCropData] = useState([]);

    const location = useLocation();
    const isCalendarPage = location.pathname === '/diary/calendar';
    const isDiaryPage = location.pathname === '/diary';
    const isAlbumPage = location.pathname === '/diary/album';

    const sharedColor = '#C4C4C4';

    const diaryButtonStyle = {
        backgroundColor: isDiaryPage ? '#90C8AC' : sharedColor,
        hoverBackgroundColor: isDiaryPage ? '#C4DFAA' : '#C4DFAA',
    };

    const calendarButtonStyle = {
        backgroundColor: isCalendarPage ? '#90C8AC' : sharedColor,
        hoverBackgroundColor: isCalendarPage ? '#C4DFAA' : '#C4DFAA',
    };

    const albumButtonStyle = {
        backgroundColor: isAlbumPage ? '#90C8AC' : sharedColor,
        hoverBackgroundColor: isAlbumPage ? '#C4DFAA' : '#C4DFAA',
    };

    useEffect(() => {
        cropInfoData();
    }, [memberNo, cropNo]);

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
                console.log('res.data : : : ', res.data);
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
                                    name="캘린더"
                                    backgroundColor={
                                        calendarButtonStyle.backgroundColor
                                    }
                                    hoverBackgroundColor={
                                        calendarButtonStyle.hoverBackgroundColor
                                    }
                                    onClick={() =>
                                        handleButtonClick('/diary/calendar')
                                    }
                                />
                                <SelectButton
                                    name="다이어리"
                                    backgroundColor={
                                        diaryButtonStyle.backgroundColor
                                    }
                                    hoverBackgroundColor={
                                        diaryButtonStyle.hoverBackgroundColor
                                    }
                                    onClick={() => handleButtonClick('/diary')}
                                />
                                <SelectButton
                                    name="앨범"
                                    backgroundColor={
                                        albumButtonStyle.backgroundColor
                                    }
                                    hoverBackgroundColor={
                                        albumButtonStyle.hoverBackgroundColor
                                    }
                                    onClick={() =>
                                        handleButtonClick('/diary/album')
                                    }
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
