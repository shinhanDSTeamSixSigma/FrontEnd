import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DiaryTitle from '../../../../components/diary/DiaryTitle';
import DiaryCalendar from '../../../../components/diary/DiaryCalendar';
import CalendarIcon from '../../../../components/diary/CalendarIcon';

const baseUrl = process.env.REACT_APP_BASE_URL;

const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
`;

const DiaryCalendarPage = () => {
    const location = useLocation(); // 현재 위치
    const { memberNo, cropNo } = location.state;

    return (
        <>
            <StyledContainer>
                <DiaryTitle
                    memberNo={memberNo}
                    cropNo={cropNo}
                    baseUrl={baseUrl}
                />
                <DiaryCalendar
                    memberNo={memberNo}
                    cropNo={cropNo}
                    baseUrl={baseUrl}
                />
            </StyledContainer>
            <CalendarIcon />
        </>
    );
};
export default DiaryCalendarPage;
