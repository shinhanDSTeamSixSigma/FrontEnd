import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FlexRow = styled.div`
  font-size: 0.8em;
  position: relative;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 4rem; /* 드롭다운 넓이 조절 */
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
  left: -1.5rem;
`;

const DropdownItem = styled.button`
  width: 100%;
  height: 2rem;
  padding: 0.1em; /* 내부 padding 추가 */
  border: none;
  background: none;
  text-align: center;
`;

const DropdownButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [articleType, setArticleType] = useState('전체');
  const articleTypeList = ['전체', '적립', '사용'];

  const articleBtnExpandHandler = () => {
    setIsExpanded(!isExpanded);
  };

  const articleTypeHandler = (type) => {
    setArticleType(type);
    setIsExpanded(false);
  };

  return (
    <FlexRow>
      <button onClick={articleBtnExpandHandler}>{articleType}</button>
      <DropdownContainer isVisible={isExpanded}>
        {articleTypeList.map((type, idx) => (
          <DropdownItem key={type} onClick={() => articleTypeHandler(type)}>
            {type}
            {idx !== articleTypeList.length - 1}
          </DropdownItem>
        ))}
      </DropdownContainer>
    </FlexRow>
  );
};

export default DropdownButton;
