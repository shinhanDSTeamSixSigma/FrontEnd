import styled from "styled-components";
import CropImage from "./CropImage";
import CropCatebox from "./CropCatebox";

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
const Title = styled.div`
    font-size:1.2em;
    font-weight: 500;
    margin-right: 0.5em;
    
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
            <CropImage width="8em" height="8em"/>
            <div>
                <Container>
                    <Title>작물이름</Title>
                    <CropCatebox name="바질과"></CropCatebox>

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