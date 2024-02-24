import styled from "styled-components";
import BoardRegist from "../../../../components/board/BoardRegist";
const StyledContainer = styled.div`
    background-color:white;
    border-radius:0.6rem;
    margin:1.5rem;
`;
const FarmerInquiryRegistPage = () => {
    return(
        <>
        <StyledContainer>
            <BoardRegist/>
        </StyledContainer>
        </>
    );
};
export default FarmerInquiryRegistPage;