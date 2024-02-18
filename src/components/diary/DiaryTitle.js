import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
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
    return (
        <>
            {/*제목 및 버튼*/}
            <FlexRow>
                <TitleUserName name="쑥쑥이" />
                <FlexRow style={{ marginLeft: 'auto' }}>
                    <SelectButton
                        name="다이어리"
                        backgroundColor={diaryButtonStyle.backgroundColor}
                        hoverBackgroundColor={
                            diaryButtonStyle.hoverBackgroundColor
                        }
                        to="/diary"
                    />
                    <SelectButton
                        name="캘린더"
                        backgroundColor={calendarButtonStyle.backgroundColor}
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
                    <DateCss>23.12.31~진행중</DateCss>
                </div>
                <div class="p-2 bd-highlight">
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
