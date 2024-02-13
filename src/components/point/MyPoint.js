import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsExclamationCircle } from 'react-icons/bs';
import Button from '../Button';
import DropdownButton from './DropDownButton';
import TitleDivisionLine from '../TitleDivisionLine';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyPointValue from './MyPointValue';

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
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState('');
  const getStringDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;

    if (month < 10) {
      month = `0${month}`;
    }
    return `${year}-${month}`;
  };
  return (
    <>
      <FlexRow>
        {/*포인트 총 합계*/}
        <MyPointValue />
        <div style={{ marginLeft: 'auto' }}>
          <Button name="충전하기" />
        </div>
      </FlexRow>
      {/*포인트 박스*/}
      <PointBoxColor>
        <FlexRow>
          <FlexRow>
            <TextMargin>적립 예정 포인트</TextMargin>
            <BsExclamationCircle style={{ margin: 'auto 0.3rem' }} />
          </FlexRow>
          <MarginLeft>0 원</MarginLeft>
        </FlexRow>
        <FlexRow>
          <TextMargin>보너스 포인트</TextMargin>
          <MarginLeft>0 원</MarginLeft>
        </FlexRow>
      </PointBoxColor>
      {/*날짜 및 필터*/}
      <FlexRow style={{ marginBottom: '0.5rem' }}>
        <CustomDatePicker
          showIcon
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setDate(getStringDate(date)); // 클릭한 date 값을 문자열로 변환하여 setDate로 저장
            console.log('date:', date); // date 값 콘솔에 출력
            console.log('getStringDate:', getStringDate(date)); // getStringDate 함수 결과 콘솔에 출력
          }}
          dateFormat="yyyy/MM"
          showMonthYearPicker
          showFullMonthYearPicker
          value={getStringDate(startDate)} // value prop을 통해 문자열로 변환된 startDate 값을 전달
          type="date" // type prop을 통해 input type을 지정
        />
        <div style={{ margin: 'auto 0 auto auto' }}>
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
