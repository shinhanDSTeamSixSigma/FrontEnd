import React, { useState, useRef } from 'react';
import { FaCircle } from 'react-icons/fa';
import styled from 'styled-components';
import FullButton from '../FullButton';

const StyledContainer = styled.div`
  background-color: #f9f7c9;
  padding: 0.5rem 1.5rem;
  min-height: 30em;
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
const Content = styled.div`
  background-color: white;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
  padding: 1rem; /* 추가: 내부 여백 설정 */

  textarea {
    width: 100%;
    min-height: 16rem;
    border: none;
    resize: none; /* 리사이즈 비활성화 */
    outline: none; /* 포커스 효과 제거 */
  }
`;

const DiaryEdit = () => {
  const marginAuto = {
    margin: 'auto',
  };
  const marginLeft = {
    margin: '0.2rem',
    fontSize: '0.8em',
  };
  const marginContent = {
    margin: '0 0.5rem 0.5rem',
  };
  const dateCss = {
    fontWeight: '700',
    margin: '0.5rem',
  };
  const image = {
    margin: 'auto 0.1rem',
  };

  const contentRef = useRef();
  const [content, setContent] = useState('');

  const getApi = () => {};
  const save = () => {
    if (window.confirm('일기를 수정하시겠습니까?')) {
      getApi();
    }
  };
  return (
    <>
      <StyledContainer>
        <FlexRow style={dateCss}>
          <div>날짜</div>
          <div>(3일차)</div>
        </FlexRow>
        <Picture></Picture>
        <FlexRow style={marginContent}>
          <FlexRow style={marginAuto}>
            <div className="d-flex justify-content-end" style={marginLeft}>
              <FaCircle color="#F97777" style={image} />
              <div>온도</div>
            </div>
            <div className="d-flex justify-content-end" style={marginLeft}>
              <FaCircle color="#BACCFD" style={image} />
              <div>습도</div>
            </div>
            <div className="d-flex justify-content-end" style={marginLeft}>
              <FaCircle color="#FCC9A7" style={image} />
              <div>조도</div>
            </div>
          </FlexRow>
        </FlexRow>
        <Content>
          <textarea
            placeholder="원래 내용"
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Content>
      </StyledContainer>
      <FullButton name="수정하기" onClick={save}></FullButton>
    </>
  );
};
export default DiaryEdit;
