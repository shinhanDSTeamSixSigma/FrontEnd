import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import { TfiPencil } from 'react-icons/tfi';
import { RiDeleteBinLine } from 'react-icons/ri';
import styled from 'styled-components';
import axios from 'axios';
import DiaryBlank from '../diary/DiaryBlank';

const StyledContainer = styled.div`
    background-color: white;
    font-size: 0.8em;
    border-radius: 0.8rem;
    padding: 1.3rem;
    margin: 1.3rem auto;
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
const Height = styled.div`
    height: 30em;
    display: flex;
    align-items: center;
`;

const DiaryContentDetail = () => {
    const marginContent = {
        margin: '0 0.5rem 0.5rem',
    };
    const image = {
        margin: 'auto 0.1rem',
    };

    const [diaryList, setDiaryList] = useState([]);

    const [memberNo, setMemberNo] = useState(1); // 추후 변경
    const [cropNo, setCropNo] = useState(1); // 추후 변경
    const [diaryDate, setDiaryDate] = useState();

    useEffect(() => {
        diaryListData();
    }, [memberNo, cropNo]);

    const diaryListData = () => {
        axios
            .get('http://localhost:8080/diary/list', {
                params: {
                    memberNo: memberNo,
                    cropNo: cropNo,
                },
            })
            .then((res) => {
                // 2차원 배열의 각 내부 배열에 대해 map을 사용
                const diaryListWithDateDiff = res.data.map((diaryGroup) =>
                    diaryGroup.map((diary) => {
                        const cropEntity = diary.cropEntity || {}; // cropEntity가 없을 경우 빈 객체로 초기화
                        const cropBuyDate = new Date(cropEntity.buyDate);
                        const diaryDate = new Date(diary.diaryDate);
                        const dateDifferenceInDays = Math.abs(
                            Math.floor(
                                (diaryDate - cropBuyDate) /
                                    (1000 * 60 * 60 * 24),
                            ),
                        );

                        return {
                            ...diary,
                            dateDifferenceInDays: dateDifferenceInDays,
                        };
                    }),
                );

                setDiaryList(diaryListWithDateDiff);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDeleteClick = async (diaryNo) => {
        try {
            // HTTP DELETE 요청 보내기
            await axios.delete(`http://localhost:8080/diary/delete/${diaryNo}`);

            // 성공 시에 다른 로직 수행 가능
            console.log('일기 삭제 성공');
            alert('삭제되었습니다');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting diary:', error);
        }
    };
    return (
        <>
            {diaryList && diaryList.length > 0 ? (
                diaryList.map((diary, index) => (
                    <div key={'인덱스' + index}>
                        <StyledContainer>
                            <Picture></Picture>
                            <FlexRow style={marginContent}>
                                <FlexRow style={{ fontWeight: 'bold' }}>
                                    <div>
                                        {new Date(
                                            diary[0].diaryDate,
                                        ).toLocaleDateString()}
                                    </div>
                                    <div>
                                        ({diary[0].dateDifferenceInDays}
                                        일차)
                                    </div>
                                </FlexRow>
                                <FlexRow style={{ marginLeft: 'auto' }}>
                                    <div className="d-flex justify-content-end">
                                        <FaCircle
                                            color="#F97777"
                                            style={image}
                                        />
                                        <div>{diary[1].thomer}°C</div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <FaCircle
                                            color="#BACCFD"
                                            style={image}
                                        />
                                        <div>{diary[1].soilHumid}%</div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <FaCircle
                                            color="#FCC9A7"
                                            style={image}
                                        />
                                        <div>{diary[1].lumen}lx</div>
                                    </div>
                                </FlexRow>
                            </FlexRow>
                            {/*내용*/}
                            <div className="content" style={marginContent}>
                                {diary[0].content}
                            </div>
                            <FlexRow
                                style={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                }}
                            >
                                <Link to={`list/${diary[0].diaryNo}`}>
                                    <TfiPencil />
                                </Link>
                                <button
                                    onClick={() =>
                                        handleDeleteClick(diary[0].diaryNo)
                                    }
                                >
                                    <RiDeleteBinLine />
                                </button>
                            </FlexRow>
                        </StyledContainer>
                    </div>
                ))
            ) : (
                <Height>
                    <DiaryBlank />
                </Height>
            )}
        </>
    );
};
export default DiaryContentDetail;
