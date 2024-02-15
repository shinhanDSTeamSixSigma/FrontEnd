import styled from 'styled-components';

const Height = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;
const PointWalletImg = styled.div`
  width: 20%;
  margin: auto;
`;
const Position = styled.div`
  text-align: center;
  font-size: 0.8em;
`;

const DiaryBlank = () => {
  return (
    <>
      <Height>
        <PointWalletImg>
          <img
            className="pointWallet"
            alt="pointWallet"
            src={process.env.PUBLIC_URL + '/img/diary/pointWallet.png'}
          />
        </PointWalletImg>
        <Position>
          <div>작성된 일지가 없습니다.</div>
        </Position>
      </Height>
    </>
  );
};
export default DiaryBlank;
