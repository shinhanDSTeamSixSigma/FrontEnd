import styled from 'styled-components';
import TextDivisionLine from '../TextDivisionLine';
import TitleDetailName from '../point/TitleDetailName';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const PayCss = styled.div`
  font-weight: 600;
  font-size: 1em;
  margin: auto 0;
`;
const FinalPayCss = styled.div`
  font-weight: 600;
  font-size: 1.3em;
  color: #4f6f52;
`;

const ChargeDetail = () => {
  const textCss = {
    display: 'flex',
    justifyContent: 'center',
    width: '1rem',
  };
  return (
    <>
      <TitleDetailName name="결제 정보" />
      {/*토지 대여 금액*/}
      <FlexRow className="d-flex m-1">
        <div className="me-auto p-2">토지 대여</div>
        <FlexRow
          className="p-2"
          style={{ width: '3rem', justifyContent: 'end' }}
        >
          <div>x</div>
          <div style={textCss}>1</div>
        </FlexRow>
        <FlexRow
          className="p-2"
          style={{ width: '5rem', justifyContent: 'end' }}
        >
          <div>320,000</div>
          <div>원</div>
        </FlexRow>
      </FlexRow>
      <TextDivisionLine />
      {/*영양제 결제 금액*/}
      <FlexRow className="d-flex m-1">
        <div className="me-auto p-2">영양제</div>
        <FlexRow
          className="p-2"
          style={{ width: '3rem', justifyContent: 'end' }}
        >
          <div>x</div>
          <div style={textCss}>10</div>
        </FlexRow>
        <FlexRow
          className="p-2"
          style={{ width: '5rem', justifyContent: 'end' }}
        >
          <div>20,000</div>
          <div>원</div>
        </FlexRow>
      </FlexRow>
      <TextDivisionLine />
      {/*총 결제 금액*/}
      <FlexRow className="d-flex m-1">
        <PayCss className="me-auto p-2">총 결제 금액</PayCss>
        <FlexRow className="p-2">
          <FinalPayCss>340,000</FinalPayCss>
          <FinalPayCss>원</FinalPayCss>
        </FlexRow>
      </FlexRow>
      {/*작물 수확 금액*/}
      <div style={{ margin: '3rem auto' }}>
        <TitleDetailName name="작물 수령 정보" />
        <FlexRow className="d-flex m-1">
          <PayCss className="me-auto p-2">포인트 수령</PayCss>
          <FlexRow className="p-2">
            <FinalPayCss>272,000</FinalPayCss>
            <FinalPayCss>원</FinalPayCss>
          </FlexRow>
        </FlexRow>
      </div>
    </>
  );
};
export default ChargeDetail;
