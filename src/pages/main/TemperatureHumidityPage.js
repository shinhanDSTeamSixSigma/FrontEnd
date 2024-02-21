import styled from 'styled-components';
import StyledHeader from '../../components/StyledHeader';
import StyledBody from '../../components/StyledBody';
import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';

import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

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
const data = {
    // 각 막대별 라벨
    labels: ['온도', '습도', '온도', '습도', '온도', '습도', '온도', '습도'],
    datasets: [
        {
            borderWidth: 1, // 테두리 두께
            data: [16, 12, 20, 13, 5, 14, 19, 6], // 수치
            backgroundColor: [
                '#F5F0BB',
                '#C4DFAA',
                '#90C8AC',
                '#73A9AD',
                '#F5F0BB',
                '#C4DFAA',
                '#90C8AC',
                '#73A9AD',
            ], // 각 막대 색
        },
    ],
};

const TemperaturHumidityPage = () => {
    return (
        <>
            <StyledHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-2xl font-black">쑥쑥이</span>는
                        지금?
                    </div>
                    <div className="text-sm pt-2">
                        함께한지
                        <span className=""> 56</span>일째
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
                        backgroundColor: '#F9F7C9',
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
                            <span className="text-sm pl-3 pr-3 font-black">
                                일간
                            </span>
                            <span className="text-sm pr-3">주간</span>
                            <span className="text-sm pr-3">월간</span>
                        </FlexRow>

                        <FlexRow
                            style={{
                                justifyContent: 'space-evenly',
                                marginBottom: '1rem',
                            }}
                        >
                            {/* <FaAngleLeft />
                            <span className="text-sm">01.13 ~ 01.19</span>
                            <FaAngleRight /> */}
                        </FlexRow>

                        <div style={{ width: '100%', height: '20rem' }}>
                            <Bar data={data} options={options} />
                        </div>
                    </div>
                </div>
            </StyledBody>
        </>
    );
};

export default TemperaturHumidityPage;
