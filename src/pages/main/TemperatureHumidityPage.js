import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StyledHeader from '../../components/StyledHeader';
import StyledBody from '../../components/StyledBody';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const baseUrl = process.env.REACT_APP_BASE_URL;

const options = {
    legend: {
        display: true,
    },
    scales: {
        yAxes: [
            {
                ticks: {
                    min: 0,
                    stepSize: 0.5,
                },
            },
        ],
    },
    maintainAspectRatio: false,
};

const calculateDaysSince = (startDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const daysDiff = Math.round((currentDate - new Date(startDate)) / oneDay);
    return daysDiff;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}.${day}`;
};

const TemperaturHumidityPage = () => {
    const location = useLocation();
    const crop = location.state.crop;

    const [sensorData, setSensorData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [chartData, setChartData] = useState(null);
    const [weeklyChartData, setWeeklyChartData] = useState(null);
    const [selectedChart, setSelectedChart] = useState('daily');

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = () => {
        axios
            .get(`${baseUrl}/cropLogs/${crop.cropNo}`, {
                withCredentials: true,
            })
            .then((res) => {
                setSensorData(res.data);

                const firstDate = res.data[0].sensorTime;
                const lastDate = res.data[res.data.length - 1].sensorTime;
                setStartDate(firstDate);
                setEndDate(lastDate);

                prepareChartData(res.data);
                prepareWeeklyChartData(res.data);
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
            timeLabels.push(formatDate(entry.sensorTime));
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

    const prepareWeeklyChartData = (sensorData) => {
        const weeklyData = [];
        const timeLabels = [];

        for (let i = 0; i < sensorData.length; i += 7) {
            const weeklyChunk = sensorData.slice(i, i + 7);
            const humiditySum = weeklyChunk.reduce(
                (acc, entry) => acc + entry.humidity,
                0,
            );
            const lumenSum = weeklyChunk.reduce(
                (acc, entry) => acc + entry.lumen,
                0,
            );
            const solidHumidSum = weeklyChunk.reduce(
                (acc, entry) => acc + entry.soilHumid,
                0,
            );
            const thomerSum = weeklyChunk.reduce(
                (acc, entry) => acc + entry.thomer,
                0,
            );

            const weeklyAverage = {
                humidity: humiditySum / weeklyChunk.length,
                lumen: lumenSum / weeklyChunk.length,
                solidHumid: solidHumidSum / weeklyChunk.length,
                thomer: thomerSum / weeklyChunk.length,
            };

            weeklyData.push(weeklyAverage);
            const startDate = formatDate(weeklyChunk[0].sensorTime);
            const endDate = formatDate(
                weeklyChunk[weeklyChunk.length - 1].sensorTime,
            );
            timeLabels.push(`${startDate} ~ ${endDate}`);
        }

        const chartData = {
            labels: timeLabels,
            datasets: [
                {
                    label: '습도',
                    data: weeklyData.map((entry) => entry.humidity),
                    borderColor: '#F5F0BB',
                    backgroundColor: '#F5F0BB',
                },
                {
                    label: '조도',
                    data: weeklyData.map((entry) => entry.lumen),
                    borderColor: '#C4DFAA',
                    backgroundColor: '#C4DFAA',
                },
                {
                    label: '토양 습도',
                    data: weeklyData.map((entry) => entry.solidHumid),
                    borderColor: '#90C8AC',
                    backgroundColor: '#90C8AC',
                },
                {
                    label: '온도',
                    data: weeklyData.map((entry) => entry.thomer),
                    borderColor: '#73A9AD',
                    backgroundColor: '#73A9AD',
                },
            ],
        };

        setWeeklyChartData(chartData);
    };

    const handleChartToggle = (chartType) => {
        setSelectedChart(chartType);
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
                        함께한지 {calculateDaysSince(crop.createdDate)} 일째
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
                    <button
                        className={`flex-none rounded-lg ${
                            selectedChart === 'daily'
                                ? 'bg-[#C4DFAA]'
                                : 'bg-[#C4C4C4]'
                        } px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-[#C4DFAA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-2 mr-3`}
                        onClick={() => handleChartToggle('daily')}
                    >
                        일간
                    </button>
                    <button
                        className={`flex-none rounded-lg ${
                            selectedChart === 'weekly'
                                ? 'bg-[#C4DFAA]'
                                : 'bg-[#C4C4C4]'
                        } px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-[#C4DFAA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-2 mr-3`}
                        onClick={() => handleChartToggle('weekly')}
                    >
                        주간
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
                            <span
                                className={`text-sm pl-3 pr-3 ${
                                    selectedChart === 'daily'
                                        ? 'font-black'
                                        : ''
                                }`}
                            >
                                일간
                            </span>
                            <span
                                className={`text-sm pr-3 ${
                                    selectedChart === 'weekly'
                                        ? 'font-black'
                                        : ''
                                }`}
                            >
                                주간
                            </span>
                        </FlexRow>

                        <FlexRow
                            style={{
                                justifyContent: 'space-evenly',
                                marginBottom: '1rem',
                            }}
                        >
                            <FlexRow style={{ margin: '0.5rem 0' }}>
                                <span className="text-sm mr-1">
                                    {formatDate(startDate)} ~{' '}
                                    {formatDate(endDate)}
                                </span>
                            </FlexRow>
                        </FlexRow>

                        {/* Original chart */}
                        <div
                            style={{
                                display:
                                    selectedChart === 'daily'
                                        ? 'block'
                                        : 'none',
                                width: '100%',
                                height: '20rem',
                            }}
                        >
                            {chartData && (
                                <Line data={chartData} options={options} />
                            )}
                        </div>

                        {/* Weekly chart */}
                        <div
                            style={{
                                display:
                                    selectedChart === 'weekly'
                                        ? 'block'
                                        : 'none',
                                width: '100%',
                                height: '20rem',
                            }}
                        >
                            {weeklyChartData && (
                                <Line
                                    data={weeklyChartData}
                                    options={options}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </StyledBody>
        </>
    );
};

export default TemperaturHumidityPage;
