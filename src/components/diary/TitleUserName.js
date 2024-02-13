import styled from 'styled-components';

const TotalCss = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem auto 0.3rem 0.5rem;
`;
const UserCss = styled.div`
  font-weight: 700;
  font-size: 1.8em;
`;
const TextCss = styled.div`
  font-size: 1.3em;
  margin-top: auto;
`;

export default function TitleUserName(props) {
  return (
    <>
      <TotalCss>
        <UserCss>{props.name}</UserCss>
        <TextCss>의 관찰 일지</TextCss>
      </TotalCss>
    </>
  );
}
