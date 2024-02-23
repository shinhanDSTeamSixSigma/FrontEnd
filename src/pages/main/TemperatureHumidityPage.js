import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StyledHeader from '../../components/StyledHeader';
import StyledBody from '../../components/StyledBody';
import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';

import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

import { useLocation } from 'react-router-dom';
import axios from 'axios';

const FlexRow = styled.div`
    // row로 붙여주는 느낌
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const options = {
    legend: {
        display: true, // label 보이기 여부
    },
    scales: {
        yAxes: [
            {
                ticks: {
                    min: 0, // y축 스케일에 대한 최소값 설정
                    stepSize: 0.5, // y축 그리드 한 칸당 수치
                },
            },
        ],
    },

    // false : 사용자 정의 크기에 따라 그래프 크기가 결정됨.
    // true : 크기가 알아서 결정됨.
    maintainAspectRatio: false,
};

// D + () 값을 나타내기 위한 날짜 차이 계산
const calculateDaysSince = (startDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // 하루의 밀리초 수
    const currentDate = new Date(); // 현재 날짜
    const daysDiff = Math.round((currentDate - new Date(startDate)) / oneDay); // 두 날짜 사이의 일 수
    return daysDiff;
};

const TemperaturHumidityPage = () => {
    const location = useLocation();
    const crop = location.state.crop;

    const [sensorData, setSensorData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // 서버에서 사용자 정보 가져오기
        fetchLogs();
    }, []);

    const fetchLogs = () => {
        axios
            .get(`http://localhost:8090/cropLogs/${crop.cropNo}`, {
                withCredentials: true,
            })
            .then((res) => {
                setSensorData(res.data);
                console.log(res.data);

                // 데이터가 도착하면 시작 날짜와 끝 날짜를 설정합니다.
                const firstDate = res.data[0].sensorTime;
                const lastDate = res.data[res.data.length - 1].sensorTime;
                setStartDate(firstDate);
                setEndDate(lastDate);

                // 차트 데이터 준비
                prepareChartData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const prepareChartData = (sensorData) => {
        const humidityData = [];
        const lumenData = [];
        const solidHumidData = [];
        const thomerData = [];
        const timeLabels = [];

        sensorData.forEach((entry) => {
            humidityData.push(entry.humidity);
            lumenData.push(entry.lumen);
            solidHumidData.push(entry.soilHumid);
            thomerData.push(entry.thomer);
            timeLabels.push(new Date(entry.sensorTime).toLocaleDateString());
        });

        const chartData = {
            labels: timeLabels,
            datasets: [
                {
                    label: '습도',
                    data: humidityData,
                    borderColor: '#F5F0BB',
                    backgroundColor: '#F5F0BB',
                },
                {
                    label: '조도',
                    data: lumenData,
                    borderColor: '#C4DFAA',
                    backgroundColor: '#C4DFAA',
                },
                {
                    label: '토양 습도',
                    data: solidHumidData,
                    borderColor: '#90C8AC',
                    backgroundColor: '#90C8AC',
                },
                {
                    label: '온도',
                    data: thomerData,
                    borderColor: '#73A9AD',
                    backgroundColor: '#73A9AD',
                },
            ],
        };

        setChartData(chartData);
    };

    return (
        <>
            <StyledHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-2xl font-black">
                            {crop.cropNickname}
                        </span>
                        는 지금?
                    </div>
                    <div className="text-sm pt-2">
                        함께한지
                        <span className="">
                            {' '}
                            {calculateDaysSince(crop.createdDate)}
                        </span>
                        일째
                    </div>
                </div>
            </StyledHeader>
            <StyledBody>
                <hr
                    style={{
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        color: '#90C8AC',
                    }}
                ></hr>

                <div
                    className="flex justify-end"
                    style={{ paddingBottom: '1rem' }}
                >
                    <button className="flex-none rounded-lg bg-[#C4DFAA] px-3.5 py-2.5 text-sm font-semibold text-black  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-2 mr-3">
                        실시간
                    </button>
                    <button className="flex-none rounded-lg bg-[#C4C4C4] px-3.5 py-2.5 text-sm font-semibold text-black  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-2">
                        통계
                    </button>
                </div>

                <div
                    style={{
                        backgroundColor: '#FFFFF0',
                        height: '100%',
                    }}
                >
                    <div>
                        <FlexRow
                            style={{
                                marginBottom: '2rem',
                                paddingTop: '1rem',
                            }}
                        >
                            <span className="text-sm pl-3 pr-3 ">일간</span>
                            <span className="text-sm pr-3 font-black">
                                주간
                            </span>
                            <span className="text-sm pr-3">월간</span>
                        </FlexRow>

                        <FlexRow
                            style={{
                                justifyContent: 'space-evenly',
                                marginBottom: '1rem',
                            }}
                        >
                            <FaAngleLeft />
                            <FlexRow style={{ margin: '0.5rem 0' }}>
                                <span className="text-sm mr-1">
                                    {new Date(startDate)
                                        .toLocaleDateString()
                                        .slice(0, -1)}
                                </span>
                                <span className="text-sm mr-1">~</span>
                                <span className="text-sm">
                                    {new Date(endDate)
                                        .toLocaleDateString()
                                        .slice(0, -1)}
                                </span>
                            </FlexRow>

                            <FaAngleRight />
                        </FlexRow>

                        {/* Body code */}
                        <div style={{ width: '100%', height: '20rem' }}>
                            {chartData && (
                                <Line data={chartData} options={options} />
                            )}
                        </div>
                    </div>
                </div>
            </StyledBody>
        </>
    );
};

export default TemperaturHumidityPage;
