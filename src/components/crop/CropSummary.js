import styled from "styled-components";
import CropImage from "./CropImage";

const StyledContainer = styled.div`
    background-color:white;
    border-radius:0.8rem;
    padding:1.3rem;
`;
const FlexRow=styled.div`
    display:flex;
    flex-direction:row;
`;
const Container = styled.div`
    display:flex;
    align-items:center;
`
const Image = styled.div`
    margin-right:1em;
    width: 8em;
    height: 8em;
    border-radius:0.5rem;
    background: #F9F7C9;
`
const Title = styled.div`
    font-size:1.2em;
    font-weight: 500;
    margin-right: 0.5em;
    
`
const CateBox=styled.div`
    background: #008A82;
    border-radius:0.3rem;
    width: 6em;
    height: 2.8em;
    color:white;
    font-size:0.5em;
    font-weight:400;
    display: flex;
    align-items: center;
    justify-content: center;

`
const GreenText = styled.div`
    margin-top:0.5em;
    color: #4F6F52; /* 초록색 */
    font-size:0.7em;
    font-weight:bold;
`;
const GrayText = styled.div`
    color: #585858; /* 회색 */
    font-size:0.6em;
    margin-top:0.3em;
`;

const CropSummary =() =>{
    return (
       
        <>
        <StyledContainer>
            <FlexRow>
            <CropImage/>
            <div>
                <Container>
                    <Title>작물이름</Title>
                    <CateBox>바질과</CateBox>

                </Container>
                <GreenText>요약글</GreenText>
                <GrayText>제철시기 : </GrayText>
                <GrayText>난이도 : </GrayText>
                <GrayText>재배기간 : 일</GrayText>
                <GrayText>발아온도 : ~ 도</GrayText>
            </div>
            </FlexRow>
        </StyledContainer>
        </>
    );
};
export default CropSummary;