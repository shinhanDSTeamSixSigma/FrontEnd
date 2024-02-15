import styled from 'styled-components';

const StyledContainer = styled.div`
  background-color: #c4dfaa;
  height: 4.5rem;
  margin-bottom: 2rem;

  display: flex;
  flex-direction: row;
  color: gray;
  align-items: center;
  justify-content: center;
`;
const Textmargin = styled.div`
  margin: auto 0.3rem;
  font-size: 0.8em;
`;

const CropStatus = () => {
  return (
    <>
      <StyledContainer>
        <Textmargin>결제 완료</Textmargin>
        <Textmargin>></Textmargin>
        <Textmargin>재배 대기</Textmargin>
        <Textmargin>></Textmargin>
        <Textmargin>재배 진행</Textmargin>
        <Textmargin>></Textmargin>
        <Textmargin>재배 완료</Textmargin>
        <Textmargin>></Textmargin>
        <Textmargin>수령 완료</Textmargin>
      </StyledContainer>
    </>
  );
};
export default CropStatus;
