import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MyPointBlank from '../../../../components/diary/MyPointBlank';
import MyPointDetail from '../../../../components/diary/MyPointDetail';
import MyPoint from '../../../../components/diary/MyPoint';

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

const PointDetailPage = () => {
  return (
    <>
      <StyledContainer>
        <MyPoint />
        <MyPointDetail />
        <Height>
          <MyPointBlank />
        </Height>
      </StyledContainer>
    </>
  );
};
export default PointDetailPage;
