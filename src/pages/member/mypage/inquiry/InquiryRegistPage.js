import styled from "styled-components";
import BoardTitle from "../../../../components/board/BoardTitle";
import BoardRegist from "../../../../components/board/BoardRegist";
const StyledContainer = styled.div`
    background-color:white;
    border-radius:0.6rem;
    padding:1.3rem;
`;
const InquiryRegistPage = () => {
    return(
        <>
        <StyledContainer>
            <BoardTitle name="문의하기"></BoardTitle>
            <BoardRegist/>
        </StyledContainer>
        </>
    );
};
export default InquiryRegistPage;