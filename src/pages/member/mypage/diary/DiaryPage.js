import styled from 'styled-components';
import DiaryTitle from '../../../../components/diary/DiaryTitle';
import DiaryBlank from '../../../../components/diary/DiaryBlank';
import DiaryContent from '../../../../components/diary/DiaryContent';

const StyledContainer = styled.div`
  color: black;
  font-size: 0.8em;
  margin: auto 1.5rem auto;
`;
const Height = styled.div`
  height: 30em;
  display: flex;
  align-items: center;
`;

const DiaryPage = () => {
  return (
    <>
      <StyledContainer>
        <DiaryTitle />
      </StyledContainer>
      <DiaryContent />
      <Height>
        <DiaryBlank />
      </Height>
    </>
  );
};
export default DiaryPage;
