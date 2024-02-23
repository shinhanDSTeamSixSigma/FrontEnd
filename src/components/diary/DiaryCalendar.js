import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import FloatingButton from '../diary/FloatingButton';
import '../../styles/diary/diaryCalendar.css';

const DiaryCalendar = () => {
    const handleDateClick = (info) => {
        console.log('클릭한 날짜:', info.dateStr);
    };
    return (
        <>
            <div className="calendar-container">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dayMaxEvents={true}
                    events={[
                        {
                            title: 'aa',
                            start: '2024-02-13',
                            end: '2024-02-14',
                            color: 'transparent',
                        },
                        {
                            title: '축구하기',
                            date: '2024-02-15',
                            color: '#c4dfaa',
                        },
                    ]}
                    height={'25rem'}
                    editable={true}
                    locale={koLocale} // 한국어 설정
                    dayCellContent={({ date }) => (
                        <div>
                            {date.getDate()} {/* 날짜(day)만 표시 */}
                        </div>
                    )}
                    dateClick={handleDateClick}
                />
            </div>
            <Link
                to="/diary/regist"
                style={{
                    padding: '0.5rem 1.5rem',
                    minHeight: '30em',
                }} /*to={`/edit/${id}`}*/
            >
                <FloatingButton />
            </Link>
        </>
    );
};

export default DiaryCalendar;
