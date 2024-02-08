import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsExclamationCircle } from 'react-icons/bs';
import Title from './TitleName';
import Button from '../Button';
import DropdownButton from './DropDownButton';
import TitleDivisionLine from './TitleDivisionLine';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const PointBoxColor = styled.div`
  background-color: #d9d9d9;
  border-radius: 0.8rem;
  padding: 1.2rem;
  margin: 1rem auto;
`;
const MarginLeft = styled.div`
  margin: 0.4rem 0.4rem 0 auto;
`;
const TextMargin = styled.div`
  margin: 0.4rem auto 0.4rem 0;
`;
const CustomDatePicker = styled(DatePicker)`
  .react-datepicker__header:not(.react-datepicker__header--has-time-select) {
    background-color: #80bcbd;
  }
`;

export default function MyPoint() {
  const point = {
    margin: 'auto 1rem',
  };
  const pointText = {
    alignItems: 'center',
  };
  const pointResult = {
    fontWeight: '700',
    fontSize: '1.4em',
    marginLeft: '0.5rem',
  };
  const marginLeft = {
    marginLeft: 'auto',
  };
  const marginLeft2 = {
    margin: 'auto 0 auto auto',
  };
  const date = {
    marginBottom: '0.5rem',
  };
  const image = {
    margin: 'auto 0.3rem',
  };
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <Title name="나의 포인트" />
      {/*포인트 총 합계*/}
      <FlexRow style={point}>
        <FlexRow style={pointText}>
          <div className="point-text">
            <img
              className="wallet"
              alt="wallet"
              src={process.env.PUBLIC_URL + '/img/diary/wallet.png'}
            />
          </div>
          <div style={pointResult}>0원</div>
        </FlexRow>
        <div style={marginLeft}>
          <Button name="충전하기" />
        </div>
      </FlexRow>
      {/*포인트 박스*/}
      <PointBoxColor>
        <FlexRow>
          <FlexRow>
            <TextMargin>적립 예정 포인트</TextMargin>
            <BsExclamationCircle style={image} />
          </FlexRow>
          <MarginLeft>0 원</MarginLeft>
        </FlexRow>
        <FlexRow>
          <TextMargin>보너스 포인트</TextMargin>
          <MarginLeft>0 원</MarginLeft>
        </FlexRow>
      </PointBoxColor>
      {/*날짜 및 필터*/}
      <FlexRow style={date}>
        <CustomDatePicker
          showIcon
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy/MM"
          showMonthYearPicker
          showFullMonthYearPicker
        />
        <div style={marginLeft2}>
          <FlexRow>
            <img
              className="filter"
              alt="filter"
              src={process.env.PUBLIC_URL + '/img/diary/filter.png'}
            />
            <DropdownButton />
          </FlexRow>
        </div>
      </FlexRow>
      <TitleDivisionLine />
    </>
  );
}
