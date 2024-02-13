import { FaCircle } from 'react-icons/fa';
import styled from 'styled-components';
import TitleUserName from '../../components/diary/TitleUserName';
import TitleDivisionLine from '../TitleDivisionLine';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto 0.2rem 0.3rem auto;
`;
const FontSize = styled.div`
  font-size: 0.8em;
`;

export default function DiaryDetailTitle() {
  const image = {
    margin: 'auto 0.1rem',
    width: '30%',
  };
  return (
    <>
      <FlexRow>
        <TitleUserName name="쑥쑥이" />
      </FlexRow>
      <TitleDivisionLine />
      <div class="d-flex bd-highlight mb-0">
        <div class="p-2 bd-highlight ml-auto">
          <div className="d-flex justify-content-end">
            <div className="d-flex justify-content-end">
              <FaCircle color="#F97777" style={image} />
              <FontSize>온도</FontSize>
            </div>
            <div className="d-flex justify-content-end">
              <FaCircle color="#BACCFD" style={image} />
              <FontSize>습도</FontSize>
            </div>
            <div className="d-flex justify-content-end">
              <FaCircle color="#FCC9A7" style={image} />
              <FontSize>조도</FontSize>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}