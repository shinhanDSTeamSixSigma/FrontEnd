import styled from "styled-components";
import ReviewRegist from "../../../../components/board/ReviewRegist";
const StyledContainer = styled.div`
    background-color:white;
    border-radius:0.6rem;
    margin:1.5rem;
`;

const FarmerReviewRegist=()=>{
  
    return(
        <>
        <StyledContainer>
            <ReviewRegist/>
        </StyledContainer>
        </>
    )
};
export default FarmerReviewRegist;