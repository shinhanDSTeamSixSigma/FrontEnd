import styled from "styled-components";
import BoardTitle from "../../../../components/board/BoardTitle";
import EmptyBoard from "../../../../components/board/EmptyBoard";
import Button from "../../../../components/Button";
import { Link } from "react-router-dom";
const StyledContainer = styled.div`
    background-color:white;
    border-radius:0.6rem;
    padding:1.3rem;
`;
const FlexRow=styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
`;

const InquiryListPage = () => {
    return(
        <>
        <StyledContainer>
            <FlexRow>
                <BoardTitle name="농부 문의 내역" style={{ marginRight: 'auto' }}/>
            
                <Link to="/customer-inquiry/regist">
                        <Button name="문의하기"/>
                </Link>
            </FlexRow>
            <EmptyBoard name="작성하신 문의내역이 없습니다."/>
        </StyledContainer>
        </>
    );
};
export default InquiryListPage;