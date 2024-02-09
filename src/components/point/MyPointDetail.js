import TextDivisionLine from '../TextDivisionLine';
import styled from 'styled-components';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto 0.5rem;
`;
const TextMargin = styled.div`
  margin: 0.5rem;
`;

const MyPointDetail = () => {
  const date = {
    width: '20%',
    textAlign: 'center',
  };
  const content = {
    width: '50%',
  };
  const point = {
    width: '30%',
    textAlign: 'right',
  };
  return (
    <>
      <FlexRow>
        <TextMargin style={date}>날짜</TextMargin>
        <TextMargin style={content}>내용</TextMargin>
        <TextMargin style={point}>내역</TextMargin>
      </FlexRow>
      <TextDivisionLine />
    </>
  );
};
export default MyPointDetail;
