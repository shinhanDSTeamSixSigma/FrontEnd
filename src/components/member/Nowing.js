import styled from 'styled-components';

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
const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
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

const Nowing = () => {
    return (
        <>
            <FlexRow
                style={{
                    justifyContent: 'space-between',
                }}
            >
                <FlexRow>
                    <Box>
                        <img
                            className="step"
                            alt="1step"
                            src={
                                process.env.PUBLIC_URL +
                                '/img/memberMypage/1step.png'
                            }
                            style={{ width: '5rem', height: '5rem' }}
                        />
                    </Box>
                    <div style={{ marginLeft: '1rem' }}>
                        <div>쑥쑥이</div>
                        <FlexRowBasic>
                            <div className="text-sm">D+</div>
                            <div className="text-sm">25</div>
                        </FlexRowBasic>
                        <FlexRowBasic style={{ fontSize: '0.6rem' }}>
                            <div>2024/10/1</div>
                            <div> ~ 재배중</div>
                        </FlexRowBasic>
                    </div>
                </FlexRow>
                <div>
                    <div>
                        <button className="flex-none rounded-md bg-[#D5F0C1] px-2 py-1 text-xs shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-2">
                            00이 밥값
                        </button>
                    </div>
                    <div>
                        <button className="flex-none rounded-full bg-[#F5F0BB] px-3.5 py-2.5 text-base shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-2">
                            <b>쑥쑥이</b>는 지금?
                        </button>
                    </div>
                </div>
            </FlexRow>
        </>
    );
};

export default Nowing;
