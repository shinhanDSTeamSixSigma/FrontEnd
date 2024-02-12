import TitleDivisionLine from '../TitleDivisionLine';
import styled from 'styled-components';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const TextCss = styled.div`
  font-weight: 600;
  font-size: 1em;
  margin: 0.3rem auto;
`;
const ContentMargin = styled.div`
  margin: auto 0;
`;
const FarmImage = styled.div`
  border: 1px solid #f5f5f5;
  background-color: #f5f5f5;
  width: 6.5rem;
  height: 6.5rem;
  margin-right: 1rem;
  border-radius: 0.8rem;
`;

const CropInfo = () => {
  const containerMargin = {
    margin: '1rem 1rem 2rem 1rem',
  };
  const farmName = {
    fontWeight: '600',
    fontSize: '0.8em',
  };
  const cropName = {
    fontWeight: '600',
    fontSize: '1.4em',
  };
  const detailName = {
    fontSize: '1em',
    color: '#878787',
  };
  return (
    <>
      <div>
        <TextCss>구매 정보</TextCss>
        <TitleDivisionLine />
      </div>
      <FlexRow style={containerMargin}>
        <FarmImage />
        <ContentMargin>
          <div style={farmName}>토심이네 농장</div>
          <div style={cropName}>봉선화</div>
          <FlexRow style={detailName}>
            <div>16평</div>|<div>320,000원</div>
          </FlexRow>
        </ContentMargin>
      </FlexRow>
    </>
  );
};
export default CropInfo;
