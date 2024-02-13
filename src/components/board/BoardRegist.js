import styled from "styled-components";
import Button from "../Button";

const StyledContainer = styled.div`
    background-color:white;
    font-size:1em;
    font-weight:600;
    border-radius:0.8rem;
`;
const FlexRow=styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
`;

const BoardRegist=(props)=>{
    return(
        <>
        <StyledContainer>
            <FlexRow>
                <img
                    className="h-2 w-2"
                    src="/img/board/cancel.png"
                    alt="cancel"
                />
        
                <Button name="등록"></Button>
            
            </FlexRow>
        </StyledContainer>
        </>
    )
};
export default BoardRegist;