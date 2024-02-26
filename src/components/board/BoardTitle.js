import styled from "styled-components";
const StyledContainer = styled.div`
    background-color:white;
    font-size:1em;
    font-weight:600;
    border-radius:0.8rem;
    margin-left:0.5rem;
`;
const BoardTitle=(props)=>{
    return(
        <>
        <StyledContainer>
            {props.name}
        </StyledContainer>
        </>
    )
};
export default BoardTitle;