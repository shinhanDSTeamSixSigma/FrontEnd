import styled from 'styled-components';
import TitleDivisionLine from '../TitleDivisionLine';

const TextCss = styled.div`
  font-weight: 600;
  font-size: 1em;
  margin: 0.3rem auto;
`;

export default function TitleDetailName(props) {
  return (
    <>
      <TextCss>{props.name}</TextCss>
      <TitleDivisionLine />
    </>
  );
}
