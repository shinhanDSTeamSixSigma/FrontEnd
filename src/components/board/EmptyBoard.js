import styled from "styled-components";
const StyledContainer = styled.div`
    background-color:white;
    font-size:0.8em;
    border-radius:0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 30em;

`;
const EmptyBoard=(props)=>{
    return(
        <>
        <StyledContainer>
            <div className="mb-3 flex-shrink-0">
                <img
                className="h-8 w-9"
                src="/img/board/EmptyBoard.png"
                alt="noimage"
                />
            </div>
            <div>{props.name}</div>
        </StyledContainer>
        </>
    );
};
export default EmptyBoard;