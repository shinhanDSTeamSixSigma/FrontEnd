import styled from 'styled-components';
import TitleName from '../../../../components/point/TitleName';
import CropInfo from '../../../../components/point/CropInfo';
import PointCharge from '../../../../components/point/PointCharge';
import FullButton from '../../../../components/FullButton';

const StyledContainer = styled.div`
  color: black;
  font-size: 0.8em;
  margin: auto 1.5rem auto;
`;

const PayApplyPage = () => {
  return (
    <>
      <StyledContainer>
        <TitleName name="결제하기" />
        <CropInfo />
        <PointCharge />
      </StyledContainer>
      <FullButton name="결제하기" />
    </>
  );
};
export default PayApplyPage;
