import React, { useState } from 'react';
import TitleDivisionLine from '../TitleDivisionLine';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const TextCss = styled.div`
  font-weight: 600;
  font-size: 1em;
  margin: 0.3rem auto;
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

const PointCharge = () => {
  const containerMargin = {
    margin: '1rem 1rem 2rem 1rem',
  };
  const heightMargin = {
    margin: '3rem auto',
  };
  const contentMargin = {
    margin: '0.5rem 1rem 0.5rem 1rem',
  };
  const pointContentMargin = {
    margin: '-1rem 0.5rem 0.5rem 0.5rem',
  };
  const leftMargin = {
    marginLeft: 'auto',
  };
  const autoMargin = {
    justifyContent: 'center',
  };
  const inputCss = {
    width: '12rem',
    marginRight: '1rem',
  };
  const totalPoint = {
    fontSize: '1em',
    color: '#878787',
  };
  const buttonCss = {
    width: '5rem',
    height: '2.4rem',
    fontSize: '1em',
  };

  return (
    <>
      <div>
        <TextCss>포인트</TextCss>
        <TitleDivisionLine />
      </div>
      {/*포인트 결제란*/}
      <div style={containerMargin}>
        <FlexRow style={autoMargin}>
          <div className="input-group mb-3" style={inputCss}>
            <input
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder="320,000"
              disabled
            />
          </div>
          <button
            type="button"
            className="btn btn-outline-secondary"
            style={buttonCss}
          >
            충전하기
          </button>
        </FlexRow>
        <FlexRow style={pointContentMargin}>
          <FlexRow style={totalPoint}>
            <div>남은 보유 포인트</div>
            <div>2000</div>
            <div>P</div>
          </FlexRow>
        </FlexRow>
      </div>
      {/*총 결제 금액*/}
      <div style={heightMargin}>
        <TitleDivisionLine />
        <FlexRow style={contentMargin}>
          <PayCss>결제 금액</PayCss>
          <FlexRow style={leftMargin}>
            <FinalPayCss>0</FinalPayCss>
            <FinalPayCss>원</FinalPayCss>
          </FlexRow>
        </FlexRow>
        <TitleDivisionLine />
      </div>
    </>
  );
};
export default PointCharge;
