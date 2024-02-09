import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DiaryContentDetail from '../diary/DiaryContentDetail';
import FloatingButton from '../diary/FloatingButton';

const StyledContainer = styled.div`
  background-color: #f9f7c9;
  padding: 0.5rem 1.5rem;
  min-height: 30em;
`;

const DiaryContent = () => {
  return (
    <>
      <StyledContainer>
        <DiaryContentDetail />
        <DiaryContentDetail />
        <Link to="crop-diary-edit" /*to={`/edit/${id}`}*/>
          <FloatingButton />
        </Link>
      </StyledContainer>
    </>
  );
};
export default DiaryContent;
