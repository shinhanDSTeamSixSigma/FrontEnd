import styled from 'styled-components';
import StyledHeader from '../StyledHeader';

const Box = styled.div`
    margin: auto 0.3rem auto;
    border-radius: 0.8rem; //모서리 둥글게
    align-contents: center;
    display: flex;
    flex-direction: column;
`;

const FlexRow = styled.div`
    // row로 붙여주는 느낌
    width: 20rem;
    height: 7rem;
    background-color: #f5f0bb;
    display: flex;
    gap: 1rem;
    flex-direction: row;
    align-items: center;
    border-radius: 0.8rem; //모서리 둥글게
`;

const Step = styled.div`
    justify-content: center;
    display: flex;
    font-size: 0.6rem;
`;

const Growing = () => {
    return (
        <>
            <div>
                <span className="mb-1 text-base font-black">작물의 단계</span>
            </div>
            <FlexRow>
                <Box>
                    <img
                        className="step"
                        alt="1step"
                        src={
                            process.env.PUBLIC_URL +
                            '/img/memberMypage/1step.png'
                        }
                    />
                    <Step className="font-black">1단계</Step>
                </Box>
                <Box>
                    <img
                        className="step"
                        alt="2step"
                        src={
                            process.env.PUBLIC_URL +
                            '/img/memberMypage/2step.png'
                        }
                    />
                    <Step className="font-black">2단계</Step>
                </Box>
                <Box>
                    <img
                        className="step"
                        alt="3step"
                        src={
                            process.env.PUBLIC_URL +
                            '/img/memberMypage/3step.png'
                        }
                    />
                    <Step className="font-black">3단계</Step>
                </Box>
                <Box>
                    <img
                        className="step"
                        alt="4step"
                        src={
                            process.env.PUBLIC_URL +
                            '/img/memberMypage/4step.png'
                        }
                    />
                    <Step className="font-black">4단계</Step>
                </Box>
            </FlexRow>
        </>
    );
};

export default Growing;
