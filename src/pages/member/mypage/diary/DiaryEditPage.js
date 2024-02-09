import styled from 'styled-components';
import DiaryDetailTitle from '../../../../components/diary/DiaryDetailTitle';
import DiaryRegist from '../../../../components/diary/DiaryRegist';
import DiaryEdit from '../../../../components/diary/DiaryEdit';

const StyledContainer = styled.div`
  color: black;
  font-size: 0.8em;
  margin: auto 1.5rem auto;
`;

const DiaryEditPage = () => {
  return (
    <>
      <StyledContainer>
        <DiaryDetailTitle />
      </StyledContainer>
      <DiaryRegist />
      <DiaryEdit />
    </>
  );
};
export default DiaryEditPage;
