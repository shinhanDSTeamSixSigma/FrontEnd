import React, { useState } from 'react';
import TitleDetailName from './TitleDetailName';
import TitleDivisionLine from '../TitleDivisionLine';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
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
  return (
    <>
      <TitleDetailName name="포인트" />
      {/*포인트 결제란*/}
      <div style={{ margin: '1rem 1rem 2rem 1rem' }}>
        <FlexRow style={{ justifyContent: 'center' }}>
          <div
            className="input-group mb-3"
            style={{ width: '12rem', marginRight: '1rem' }}
          >
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
            style={{ width: '5rem', height: '2.4rem', fontSize: '1em' }}
          >
            충전하기
          </button>
        </FlexRow>
        <FlexRow style={{ margin: '-1rem 0.5rem 0.5rem 0.5rem' }}>
          <FlexRow style={{ fontSize: '1em', color: '#878787' }}>
            <div>남은 보유 포인트</div>
            <div>2000</div>
            <div>P</div>
          </FlexRow>
        </FlexRow>
      </div>
      {/*총 결제 금액*/}
      <div style={{ margin: '3rem auto' }}>
        <TitleDivisionLine />
        <FlexRow style={{ margin: '0.5rem 1rem 0.5rem 1rem' }}>
          <PayCss>결제 금액</PayCss>
          <FlexRow style={{ marginLeft: 'auto' }}>
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
