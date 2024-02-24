import { useState, useEffect } from 'react';
import axios from 'axios';
import DropdownButton from './DropDownButton';
import DatePicker from 'react-datepicker';
import TitleDivisionLine from '../TitleDivisionLine';
import TextDivisionLine from '../TextDivisionLine';
import styled from 'styled-components';
import MyPointBlank from '../../components/point/MyPointBlank';

const baseUrl = process.env.REACT_APP_BASE_URL;

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    margin: auto 0.5rem;
`;
const TextMargin = styled.div`
    margin: 1rem 0.3rem;
`;
const Height = styled.div`
    height: 30em;
    display: flex;
    align-items: center;
`;
const CustomDatePicker = styled(DatePicker)`
    .react-datepicker__header:not(.react-datepicker__header--has-time-select) {
        background-color: #80bcbd;
    }
`;

const MyPointDetail = () => {
    //axios 설정값
    const [points, setPoint] = useState([]);
    console.log(points);

    //데이터
    const [memberNo, setMemberNo] = useState(1); // 추후 변경

    const currentTime = new Date();
    const [year, setYear] = useState(currentTime.getFullYear());
    const [month, setMonth] = useState(currentTime.getMonth() + 1);

    const [changeValue, setChangeValue] = useState(2);

    //달력
    const [startDate, setStartDate] = useState(new Date());
    const [date, setDate] = useState('');

    const getStringDate = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        if (month < 10) {
            return `${year}-0${month}`;
        }
        return `${year}-${month}`;
    };
    const handleDropdownChange = (value) => {
        setChangeValue(value);
    };

    useEffect(() => {
        fetchData(); // 초기 로딩 시에도 데이터를 불러옴
    }, [year, month, changeValue]);

    const fetchData = () => {
        axios
            .get(`${baseUrl}/pay/point-detail`, {
                params: {
                    memberNo: memberNo,
                    changeValue: changeValue,
                    year: year,
                    month: month,
                },
                withCredentials: true,
            })
            .then((res) => {
                setPoint(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getTextBasedOnChargeCause = (value) => {
        if (value === 0) return '충전';
        if (value === 1) return '구매 적립';
        if (value === 2) return '작물 포인트 적립';
        if (value === 3) return '토지 대여';
        if (value === 4) return '영양제 구매';
        return '';
    };
    const getTextBasedOnChargeValue = (value) => {
        return value === 0 ? '+' : '-';
    };

    return (
        <>
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

                        setYear(date.getFullYear());
                        setMonth(date.getMonth() + 1);
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
                            src={
                                process.env.PUBLIC_URL + '/img/diary/filter.png'
                            }
                        />
                        <DropdownButton onChangeValue={handleDropdownChange} />
                    </FlexRow>
                </div>
            </FlexRow>
            <TitleDivisionLine />
            {/*포인트 내역*/}
            {points && points.length > 0 ? (
                points.map((point) => (
                    <div key={point[0]}>
                        <FlexRow>
                            <TextMargin
                                style={{ width: '25%', textAlign: 'left' }}
                            >
                                {new Date(point[2]).toLocaleString('ko-KR', {
                                    year: '2-digit',
                                    month: '2-digit',
                                    day: '2-digit',
                                })}
                            </TextMargin>
                            <TextMargin style={{ width: '45%' }}>
                                {getTextBasedOnChargeCause(point[4])}
                            </TextMargin>
                            <TextMargin
                                style={{
                                    width: '30%',
                                    textAlign: 'right',
                                    color: '#4F6F52',
                                    fontWeight: '700',
                                }}
                            >
                                {getTextBasedOnChargeValue(point[3])}
                                {point[1].toLocaleString('ko-KR')}
                            </TextMargin>
                        </FlexRow>
                        <TextDivisionLine />
                    </div>
                ))
            ) : (
                <Height>
                    <MyPointBlank />
                </Height>
            )}
            <div style={{ marginBottom: '7rem' }}></div>
        </>
    );
};
export default MyPointDetail;
