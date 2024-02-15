import React, { useState } from 'react';
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

const DropdownButton = ({ onChangeValue }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [articleType, setArticleType] = useState('전체');
    const articleTypeList = ['전체', '적립', '사용'];

    const articleBtnExpandHandler = () => {
        setIsExpanded(!isExpanded);
    };

    const articleTypeHandler = (type) => {
        let value;
        switch (type) {
            case '전체':
                value = 2;
                break;
            case '적립':
                value = 0;
                break;
            case '사용':
                value = 1;
                break;
            default:
                value = 2;
        }
        setArticleType(type);
        setIsExpanded(false);
        onChangeValue(value); // changeValue 값 변경을 부모 컴포넌트에 알림
    };

    return (
        <FlexRow>
            <button onClick={articleBtnExpandHandler}>{articleType}</button>
            <DropdownContainer isVisible={isExpanded}>
                {articleTypeList.map((type, idx) => (
                    <DropdownItem
                        key={type}
                        onClick={() => {
                            articleTypeHandler(type);
                            console.log('Type:', type);
                        }}
                    >
                        {type}
                        {idx !== articleTypeList.length - 1}
                    </DropdownItem>
                ))}
            </DropdownContainer>
        </FlexRow>
    );
};

export default DropdownButton;
