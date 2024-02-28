import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const FlexRow = styled.div`
    // row로 붙여주는 느낌
    width: 100%;
    height: 8rem;
    background-color: #aad9bb;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 0.8rem; //모서리 둥글게
`;
const FlexRowGap = styled.div`
    background-color: #aad9bb;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.8rem; //모서리 둥글게
    margin-right: 0.5rem;
`;

const FlexRowBasic = styled.div`
    // row로 붙여주는 느낌
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #666666; /* 폰트 색상 추가 */
`;

const Box = styled.div`
    border-radius: 0.8rem; //모서리 둥글게
    align-contents: center;
    display: flex;
    flex-direction: column;
`;

// D + () 값을 나타내기 위한 날짜 차이 계산
const calculateDaysSince = (startDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // 하루의 밀리초 수
    const currentDate = new Date(); // 현재 날짜
    const daysDiff = Math.round((currentDate - new Date(startDate)) / oneDay); // 두 날짜 사이의 일 수
    return daysDiff;
};

const Nowing = ({ crops }) => {
    const navigate = useNavigate();

    const handleClick = (crop) => {
        // 클릭된 버튼의 cropNo를 사용하여 이동
        navigate('/mypage/temperature', { state: { crop } });
    };
    const handleClickStreaming = (crop) => {
        // 클릭된 버튼의 cropNo를 사용하여 이동
        navigate('/mypage/streaming', { state: { crop } });
    };
    const handleClickDiary = (crop) => {
        const memberNo = crop.memberEntity.memberNo;
        const cropNo = crop.cropNo;
        const cropNickname = crop.cropNickname;
        const buyDate = crop.buyDate;
        navigate('/diary/calendar', {
            state: { memberNo, cropNo, cropNickname, buyDate },
        });
    };

    return (
        <>
            {crops.map((crop, index) => (
                <FlexRow
                    key={index}
                    style={{
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                    }}
                >
                    <FlexRow>
                        <Box>
                            <img
                                className="step"
                                alt="step"
                                src={
                                    crop.cropState === 1
                                        ? process.env.PUBLIC_URL +
                                          '/img/memberMypage/1step.png'
                                        : crop.cropState === 2
                                        ? process.env.PUBLIC_URL +
                                          '/img/memberMypage/2step.png'
                                        : crop.cropState === 3
                                        ? process.env.PUBLIC_URL +
                                          '/img/memberMypage/3step.png'
                                        : crop.cropState === 4
                                        ? process.env.PUBLIC_URL +
                                          '/img/memberMypage/4step.png'
                                        : null // 또는 다른 이미지 경로 또는 값
                                }
                                style={{
                                    width: '5rem',
                                    height: '5rem',
                                    marginLeft: '0.5rem',
                                }}
                            />
                        </Box>

                        <div style={{ marginLeft: '0.5rem' }}>
                            <div
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                }}
                            >
                                {crop.cropNickname}
                            </div>
                            <FlexRowBasic>
                                <div className="text-sm">D+</div>
                                <div className="text-sm">
                                    {calculateDaysSince(crop.buyDate)}
                                </div>
                            </FlexRowBasic>
                            <div
                                style={{ fontSize: '0.7rem', color: '#666666' }}
                            >
                                {new Date(crop.buyDate).toLocaleDateString(
                                    undefined,
                                    {
                                        month: '2-digit',
                                        day: '2-digit',
                                    },
                                )}
                            </div>
                            <div
                                style={{ fontSize: '0.7rem', color: '#666666' }}
                            >
                                {crop.endDate === null
                                    ? ' ~ 재배중'
                                    : '재배 완료'}
                            </div>
                        </div>
                    </FlexRow>

                    <div>
                        <FlexRowGap>
                            <button
                                onClick={() => handleClickDiary(crop)}
                                className="ml-1 flex-none rounded-md bg-[#D5F0C1] text-sm shadow-sm hover:bg-[#73A9AD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                style={{ width: '4.5rem', height: '2.5rem' }}
                            >
                                다이어리
                            </button>
                            <button
                                onClick={() => handleClick(crop)}
                                className="ml-1 mr-1 flex-none rounded-md bg-[#D5F0C1] text-sm shadow-sm hover:bg-[#73A9AD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                style={{ width: '4.5rem', height: '2.5rem' }}
                            >
                                통계
                            </button>
                        </FlexRowGap>

                        <div
                            style={{
                                justifyContent: 'center',
                                display: 'flex',
                            }}
                            key={crop.cropNo}
                        >
                            <button
                                onClick={() => handleClickStreaming(crop)}
                                className="mt-1 ml-1 flex-none rounded-md bg-[#F5F0BB] text-sm shadow-sm hover:bg-[#F4A460] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                style={{
                                    width: '8rem',
                                    height: '4rem',
                                }}
                            >
                                <b>{crop.cropNickname}</b>
                                (이)는 지금?
                            </button>
                        </div>
                    </div>
                </FlexRow>
            ))}
        </>
    );
};

export default Nowing;
