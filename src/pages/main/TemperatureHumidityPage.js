import styled from 'styled-components';
import StyledHeader from '../../components/StyledHeader';
import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';

const FlexRow = styled.div`
    // row로 붙여주는 느낌
    display: flex;
    flex-direction: row;
    align-items: center;
`;

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
            <hr
                style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    color: '#90C8AC',
                }}
            ></hr>

            <div className="flex justify-end" style={{ paddingBottom: '1rem' }}>
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
                        <FaAngleLeft />
                        <span className="text-sm">01.13 ~ 01.19</span>
                        <FaAngleRight />
                    </FlexRow>

                    <div
                        style={{
                            display: 'flex',
                            alignContent: 'center',
                            justifyContent: 'center',
                            paddingBottom: '3rem',
                        }}
                    >
                        <img
                            className="tempChart"
                            alt="tempChart"
                            src={
                                process.env.PUBLIC_URL +
                                '/img/memberMypage/tempChart.png'
                            }
                        />
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignContent: 'center',
                            justifyContent: 'center',
                            paddingBottom: '3rem',
                        }}
                    >
                        <img
                            className="tempChart"
                            alt="tempChart"
                            src={
                                process.env.PUBLIC_URL +
                                '/img/memberMypage/tempChart.png'
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TemperaturHumidityPage;
