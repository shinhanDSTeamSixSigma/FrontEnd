import { Link } from 'react-router-dom';
import Header from '../../layouts/Header';
import styled from 'styled-components';

const StyledHeader = styled.header`
  color: black;

  font-size: 20px;
  width: 300px;
  margin-left: 1.5rem;
`;
const StyledHeader1 = styled.body`
  color: black;

  font-size: 20px;
  width: 300px;
  margin-left: 2rem;
`;

const MainPage = () => {
  return (
    <>
      <Header />

      <StyledHeader>This is Header.</StyledHeader>
      <StyledHeader1>This is Header.</StyledHeader1>
    </>
  );
};
export default MainPage;
