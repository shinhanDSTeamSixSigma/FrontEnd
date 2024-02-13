import styled from "styled-components";
const StyledContainer = styled.div`
    background-color:white;
    font-size:0.8em;
    border-radius:0.8rem;
    margin-left:1.5em;

`;
const FlexColumn=styled.div`
    display:flex;
    flex-direction:column;
`;
const DivLine=styled.div`
    background: #90C8AC;
    width: 5em;
    height: 0.15em;
    margin-top:1em;

`
const SubTitle = styled.div`
    font-size:1.1em;
    font-weight: 500;
    margin-right: 0.5em;
    margin-top:0.2em;
`
const Content =styled.div`
    font-size:0.8em;
    margin-right:0.7em;
    margin-top:0.5em;
`
const CropExplain=()=>{
    return(
        <>
        <StyledContainer>
            <FlexColumn>
                <DivLine/>
                <SubTitle>작물설명</SubTitle>
                <Content>여기는 작물설명</Content>
                <DivLine/>
                <SubTitle>재배팁</SubTitle>
                <DivLine/>
                <SubTitle>효과</SubTitle>
                <DivLine/>
                <SubTitle>주요성분</SubTitle>
            </FlexColumn>
        </StyledContainer>
        </>
    );
};
export default CropExplain;