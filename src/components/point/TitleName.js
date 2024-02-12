import styled from 'styled-components';

const TextCss = styled.div`
  font-weight: 700;
  font-size: 1.3em;
  margin: 1rem auto;
`;

export default function TitleName(props) {
  return (
    <>
      <TextCss>{props.name}</TextCss>
    </>
  );
}
