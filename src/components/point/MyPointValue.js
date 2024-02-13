import styled from 'styled-components';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function MyPointValue() {
  const pointResult = {
    fontWeight: '700',
    fontSize: '1.4em',
    marginLeft: '0.5rem',
  };
  return (
    <>
      {/*포인트 총 합계*/}
      <FlexRow style={{ margin: 'auto 1rem' }}>
        <FlexRow style={{ alignItems: 'center' }}>
          <div className="point-text">
            <img
              className="wallet"
              alt="wallet"
              src={process.env.PUBLIC_URL + '/img/diary/wallet.png'}
            />
          </div>
          <div style={pointResult}>0원</div>
        </FlexRow>
      </FlexRow>
    </>
  );
}
