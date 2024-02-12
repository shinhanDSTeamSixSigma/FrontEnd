import styled from 'styled-components';
import TitleName from '../../../../components/point/TitleName';
import MyPointBlank from '../../../../components/point/MyPointBlank';
import MyPointDetail from '../../../../components/point/MyPointDetail';
import MyPoint from '../../../../components/point/MyPoint';

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
        <TitleName name="나의 포인트" />
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
