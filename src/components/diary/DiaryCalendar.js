import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';
import Modal from 'react-modal';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import FloatingButton from '../diary/FloatingButton';
import '../../styles/diary/diaryCalendar.css';
import Button from '../Button';

const baseUrl = process.env.REACT_APP_BASE_URL;

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`;
// 모달 스타일
const modalStyle = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        zIndex: 10,
    },
    content: {
        position: 'absolute',
        border: '1px solid rgb(204, 204, 204)',
        background: '#f9f7c9',
        overflow: 'auto',
        borderRadius: '2rem 2rem 0 0',
        outline: 'none',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '16rem',
        top: 'auto',
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
    },
};

const DiaryCalendar = () => {
    const [diaryData, setDiaryData] = useState([]);
    const [diaryDate, setDiaryDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const memberNo = 1;
    const cropNo = 1;

    const image = {
        margin: 'auto 0.1rem',
    };

    const handleDateClick = (info) => {
        const clickedDate = info.dateStr;
        console.log('클릭한 날짜:', clickedDate);
        setDiaryDate(clickedDate);
        setIsModalOpen(true);

        // 모달이 열릴 때 모달 내부 데이터를 불러옴
        fetch(`${baseUrl}/diary/list/${info.event.extendedProps.diaryNo}`, {
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => setModalData(data))
            .catch((error) =>
                console.error('모달 데이터를 불러오는 동안 오류 발생:', error),
            );
    };
    const handleEventClick = (info) => {
        const clickedTitleDate = formatDate(info.event.start);
        console.log('클릭한 타이틀:', clickedTitleDate);
        setDiaryDate(clickedTitleDate);
        setIsModalOpen(true);

        const diaryNo = info.event.extendedProps.diaryNo;
        console.log(diaryNo);

        // 모달이 열릴 때 모달 내부 데이터를 불러옴
        fetch(`${baseUrl}/diary/list/${diaryNo}`, {
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                setModalData(data);
                console.log(data);
            })
            .catch((error) =>
                console.error('모달 데이터를 불러오는 동안 오류 발생:', error),
            );

        console.log(modalData);
    };
    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Date(date).toLocaleDateString(
            'en-US',
            options,
        );

        // 형식을 'MM/DD/YYYY'에서 'YYYY-MM-DD'로 변경
        const [month, day, year] = formattedDate.split('/');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${baseUrl}/calendar/total-list?memberNo=${memberNo}&cropNo=${cropNo}`,
                    {
                        credentials: 'include',
                    },
                );
                const data = await response.json();
                setDiaryData(data);
            } catch (error) {
                console.error(
                    '다이어리 데이터를 불러오는 동안 오류 발생:',
                    error,
                );
            }
        };

        fetchData();
    }, [memberNo, cropNo]);

    useEffect(() => {
        if (diaryDate && diaryData) {
            setIsModalOpen(true); // 모달을 열기 위한 상태 업데이트
        }
    }, [diaryDate, diaryData]);

    const closeModal = () => {
        setIsModalOpen(false); // 모달을 닫기 위한 상태 업데이트
        setModalData(null);
    };

    return (
        <>
            <div className="calendar-container">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dayMaxEvents={true}
                    events={[
                        ...(diaryData.length > 0
                            ? diaryData.map((diary) => ({
                                  title: '일기',
                                  start: diary.diaryDate,
                                  color: '#c4dfaa',
                                  extendedProps: { diaryNo: diary.diaryNo },
                              }))
                            : []),
                    ]}
                    eventContent={(eventInfo) => {
                        return {
                            html: `<div style="font-size: 24px;"><span role="img" aria-label="일기">📔</span></div>`,
                        };
                    }}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    eventDisplay="block"
                    height={'25rem'}
                    editable={true}
                    locale={koLocale} // 한국어 설정
                    dayCellContent={({ date }) => (
                        <div>
                            {date.getDate()} {/* 날짜(day)만 표시 */}
                        </div>
                    )}
                />
            </div>
            {isModalOpen ? (
                <Modal
                    isOpen={true}
                    style={modalStyle}
                    ariaHideApp={false}
                    onRequestClose={closeModal}
                    shouldCloseOnOverlayClick={true}
                >
                    <div>
                        <div
                            onClick={closeModal}
                            style={{
                                display: 'flex',
                                justifyContent: 'end',
                            }}
                        >
                            <IoIosCloseCircle
                                color="#80BCBD"
                                style={{ fontSize: 'x-large' }}
                            />
                        </div>
                        <FlexRow style={{ margin: 'auto 0.5rem' }}>
                            <div
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '1.3em',
                                }}
                            >
                                {diaryDate}
                            </div>
                            {modalData &&
                                modalData.length > 0 &&
                                modalData[0][1] && (
                                    <FlexRow
                                        style={{
                                            marginLeft: 'auto',
                                            fontSize: 'small',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div className="d-flex justify-content-end">
                                            <FaCircle
                                                color="#F97777"
                                                style={image}
                                            />
                                            <div>
                                                {modalData[0][1].thomer}°C
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <FaCircle
                                                color="#BACCFD"
                                                style={image}
                                            />
                                            <div>
                                                {modalData[0][1].soilHumid}%
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <FaCircle
                                                color="#FCC9A7"
                                                style={image}
                                            />
                                            <div>{modalData[0][1].lumen}lx</div>
                                        </div>
                                    </FlexRow>
                                )}
                        </FlexRow>

                        <div
                            style={{
                                backgroundColor: 'white',
                                height: '5rem',
                                width: '19.2rem',
                                borderRadius: '1rem',
                                padding: '1rem',
                                marginBottom: '1rem',
                            }}
                        >
                            {modalData && modalData.length > 0
                                ? modalData[0][0].content
                                : '작성된 일기가 없어요'}
                        </div>
                        <FlexRow style={{ justifyContent: 'center' }}>
                            <Link to={`/mypage/streaming`}>
                                <Button name="상태보러가기"></Button>
                            </Link>
                            <div style={{ width: '1.5rem' }}></div>
                            {modalData &&
                            modalData.length > 0 &&
                            modalData[0] ? (
                                <Link
                                    to={`/diary/list/${modalData[0][0].diaryNo}`}
                                >
                                    <Button name="일기 수정하기"></Button>
                                </Link>
                            ) : (
                                <Link to="/diary/regist">
                                    <Button name="글 작성하기"></Button>
                                </Link>
                            )}
                        </FlexRow>
                    </div>
                </Modal>
            ) : null}
            {diaryData && diaryData.length > 0 ? (
                <Link to={`/diary/list/${diaryData[0].diaryNo}`}>
                    <FloatingButton />
                </Link>
            ) : (
                <Link
                    to="/diary/regist"
                    style={{
                        padding: '0.5rem 1.5rem',
                        minHeight: '30em',
                    }}
                >
                    <FloatingButton />
                </Link>
            )}
        </>
    );
};

export default DiaryCalendar;
