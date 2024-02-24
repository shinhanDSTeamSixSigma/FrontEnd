import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import { LuImagePlus } from 'react-icons/lu';
import axios from 'axios';
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
const Height = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8rem;
`;

const DiaryRegist = () => {
    const marginLeft = {
        margin: '0.2rem',
        fontSize: '0.8em',
    };
    const image = {
        margin: 'auto 0.1rem',
    };

    const navigate = useNavigate();

    const contentRef = useRef();
    const [content, setContent] = useState('');

    const [memberNo, setMemberNo] = useState(1);
    const [cropNo, setCropNo] = useState(1);

    const [diaryDate, setDiaryDate] = useState(new Date());
    const [cropBuyDate, setCropBuyDate] = useState(null);
    const [dateDifferenceInDays, setDateDifferenceInDays] = useState(null);

    const [sensorInfo, setSensorInfo] = useState([]);

    useEffect(() => {
        getCropBuyDate();
        sensorInfoData();
    }, [memberNo, cropNo]);

    useEffect(() => {
        if (cropBuyDate) {
            calculateDateDifference();
        }
    }, [diaryDate, cropBuyDate]);

    const getCropBuyDate = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8080/calendar/crop/buy-date',
                {
                    params: {
                        memberNo: memberNo,
                        cropNo: cropNo,
                    },
                },
            );

            const buyDate = new Date(response.data);
            setCropBuyDate(buyDate);
        } catch (error) {
            console.error('Error fetching crop buy date:', error);
        }
    };

    const sensorInfoData = () => {
        const formattedDiaryDate = new Date(diaryDate);

        axios
            .get('http://localhost:8080/calendar/sensor-info', {
                params: {
                    memberNo: memberNo,
                    cropNo: cropNo,
                    diaryDate: formattedDiaryDate,
                },
            })
            .then((res) => {
                setSensorInfo(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const calculateDateDifference = () => {
        const today = new Date();
        const differenceInDays = Math.floor(
            (today - cropBuyDate) / (1000 * 60 * 60 * 24),
        );
        setDateDifferenceInDays(differenceInDays);
    };

    const save = async () => {
        try {
            const requestData = {
                diaryDate: diaryDate,
                content: content,

                memberNo: memberNo,
                cropNo: cropNo,
            };

            // 일기 등록 요청
            const response = await axios.post(
                'http://localhost:8080/diary/register',
                requestData,
            );

            // 일기 등록 성공 시 처리
            console.log('일기 등록 성공:', response.data);
            navigate('/diary');
        } catch (error) {
            console.error('Error registering diary:', error);
        }
    };

    return (
        <>
            <StyledContainer>
                <FlexRow style={{ fontWeight: '700', margin: '0.5rem' }}>
                    <div>{diaryDate.toLocaleDateString()}</div>
                    <div>({dateDifferenceInDays}일차)</div>
                </FlexRow>
                <Picture>
                    <Height>
                        <LuImagePlus />
                    </Height>
                </Picture>
                {sensorInfo.length > 0 && (
                    <FlexRow style={{ margin: '0 0.5rem 0.5rem' }}>
                        {sensorInfo.map((data, index) => (
                            <FlexRow key={index} style={{ margin: 'auto' }}>
                                <div
                                    className="d-flex justify-content-end"
                                    style={marginLeft}
                                >
                                    <FaCircle color="#F97777" style={image} />
                                    <div>{data[1]}°C</div>
                                </div>
                                <div
                                    className="d-flex justify-content-end"
                                    style={marginLeft}
                                >
                                    <FaCircle color="#BACCFD" style={image} />
                                    <div>{data[2]}%</div>
                                </div>
                                <div
                                    className="d-flex justify-content-end"
                                    style={marginLeft}
                                >
                                    <FaCircle color="#FCC9A7" style={image} />
                                    <div>{data[3]}lx</div>
                                </div>
                            </FlexRow>
                        ))}
                    </FlexRow>
                )}
                <Content>
                    <textarea
                        placeholder="오늘은 어땠나요?"
                        ref={contentRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Content>
            </StyledContainer>
            <FullButton name="등록하기" onClick={save}></FullButton>
        </>
    );
};
export default DiaryRegist;
