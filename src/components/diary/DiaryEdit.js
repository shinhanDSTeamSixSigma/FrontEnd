import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';
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

const DiaryEdit = (baseUrl) => {
    const marginLeft = {
        margin: '0.2rem',
        fontSize: '0.8em',
    };
    const image = {
        margin: 'auto 0.1rem',
    };

    const navigate = useNavigate();

    const { diaryNo } = useParams();
    const [diaryDetail, setDiaryDetail] = useState({});
    const contentRef = useRef();

    useEffect(() => {
        diaryListData();
    }, [baseUrl]);

    const diaryListData = () => {
        axios
            .get(`${baseUrl}/diary/list/${diaryNo}`, {
                withCredentials: true,
            })
            .then((res) => {
                // buyDate와 diaryDate의 차이를 계산하여 새로운 속성 추가
                const diaryData = res.data[0][0];
                const censorData = res.data[0][1];
                const cropBuyDate = new Date(diaryData.cropEntity.buyDate);
                const diaryDate = new Date(diaryData.diaryDate);
                const dateDifferenceInDays = Math.floor(
                    (diaryDate - cropBuyDate) / (1000 * 60 * 60 * 24),
                );
                setDiaryDetail({
                    ...diaryData,
                    ...censorData,
                    dateDifferenceInDays: dateDifferenceInDays,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const save = async () => {
        if (window.confirm('일기를 수정하시겠습니까?')) {
            try {
                const diaryDto = {
                    diaryNo: diaryDetail.diaryNo,
                    diaryDate: diaryDetail.diaryDate,
                    content: contentRef.current.value,

                    memberNo: diaryDetail.memberNo,
                    cropNo: diaryDetail.cropNo,
                };

                // HTTP PUT 요청 보내기
                await axios.put(
                    `${baseUrl}/diary/modify/${diaryDto.diaryNo}`,
                    diaryDto,
                    {
                        withCredentials: true,
                    },
                );
                // 성공적으로 수정되었으면 리다이렉션을 수행
                alert('수정 완료');
                navigate('/diary');
            } catch (error) {
                console.error('Error modifying diary:', error);
            }
        }
    };
    return (
        <>
            <StyledContainer>
                <FlexRow style={{ fontWeight: '700', margin: '0.5rem' }}>
                    <div>
                        {new Date(diaryDetail.diaryDate).toLocaleDateString()}
                    </div>
                    <div>({diaryDetail.dateDifferenceInDays}일차)</div>
                </FlexRow>
                <Picture></Picture>
                <FlexRow style={{ margin: '0 0.5rem 0.5rem' }}>
                    <FlexRow style={{ margin: 'auto' }}>
                        <div
                            className="d-flex justify-content-end"
                            style={marginLeft}
                        >
                            <FaCircle color="#F97777" style={image} />
                            <div>{diaryDetail.thomer}°C</div>
                        </div>
                        <div
                            className="d-flex justify-content-end"
                            style={marginLeft}
                        >
                            <FaCircle color="#BACCFD" style={image} />
                            <div>{diaryDetail.soilHumid}%</div>
                        </div>
                        <div
                            className="d-flex justify-content-end"
                            style={marginLeft}
                        >
                            <FaCircle color="#FCC9A7" style={image} />
                            <div>{diaryDetail.lumen}lx</div>
                        </div>
                    </FlexRow>
                </FlexRow>
                <Content>
                    <textarea
                        placeholder="내용을 작성해주세요 :D"
                        ref={contentRef}
                        value={diaryDetail.content}
                        onChange={(e) =>
                            setDiaryDetail({
                                ...diaryDetail,
                                content: e.target.value,
                            })
                        }
                    />
                </Content>
            </StyledContainer>
            <FullButton name="수정하기" onClick={save} />
        </>
    );
};
export default DiaryEdit;
