import { Link } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import { TfiPencil } from 'react-icons/tfi';
import { RiDeleteBinLine } from 'react-icons/ri';
import styled from 'styled-components';

const StyledContainer = styled.div`
  background-color: white;
  font-size: 0.8em;
  border-radius: 0.8rem;
  padding: 1.3rem;
  margin: 1.3rem auto;
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const Picture = styled.div`
  background-color: #d9d9d9;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
  height: 8rem;
`;

const DiaryContentDetail = () => {
  const marginLeft = {
    marginLeft: 'auto',
  };
  const marginContent = {
    margin: '0 0.5rem 0.5rem',
  };
  const displayEnd = {
    display: 'flex',
    justifyContent: 'end',
  };
  const fontWeight = {
    fontWeight: '700',
  };
  const image = {
    margin: 'auto 0.1rem',
  };
  return (
    <>
      <StyledContainer>
        <Picture></Picture>
        <FlexRow style={marginContent}>
          <FlexRow style={fontWeight}>
            <div>날짜</div>
            <div>(3일차)</div>
          </FlexRow>
          <FlexRow style={marginLeft}>
            <div className="d-flex justify-content-end">
              <FaCircle color="#F97777" style={image} />
              <div>온도</div>
            </div>
            <div className="d-flex justify-content-end">
              <FaCircle color="#BACCFD" style={image} />
              <div>습도</div>
            </div>
            <div className="d-flex justify-content-end">
              <FaCircle color="#FCC9A7" style={image} />
              <div>조도</div>
            </div>
          </FlexRow>
        </FlexRow>
        {/*내용*/}
        <div className="content" style={marginContent}>
          하이하이하이하이 <br />
          하이하이하이하이 하이하이하이하이
        </div>
        <FlexRow style={displayEnd}>
          <Link to="edit" /*to={`/edit/${id}`}*/>
            <TfiPencil />
          </Link>
          <RiDeleteBinLine />
        </FlexRow>
      </StyledContainer>
    </>
  );
};
export default DiaryContentDetail;
