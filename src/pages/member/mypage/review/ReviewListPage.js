import styled, { css } from 'styled-components';
import axios from 'axios';
import { IoArrowBackSharp } from 'react-icons/io5';
import BoardTitle from '../../../../components/board/BoardTitle';
import EmptyBoard from '../../../../components/board/EmptyBoard';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from '../../../../components/board/StarRating.js';
import { getMemberNo } from '../../../../api/farmApi';

const StyledContainer = styled.div`
    background-color: white;
    border-radius: 0.6rem;
    margin: 1.5rem;
`;
const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0.5rem 1rem 1rem 0;
`;
const FlexRowGap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    font-size: 0.6rem;
    color: #878787;
`;
const Totalcnt = styled.div`
    font-size: 1rem;
    font-weight: 500;
    color: #878787;
`;
const FarmName = styled.div`
    font-size: 0.8rem;
    font-weight: 600;
    color: #878787;
`;
const Content = styled.div`
    font-size: 0.8rem;
    font-weight: 500;
`;
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
`;

const InquiryItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 0.1rem solid lightgray;
    border-radius: 1rem;
    padding: 1.2rem 1.2rem;
    margin-top: 1rem;
    cursor: pointer;
`;

export const BackButton = styled(IoArrowBackSharp)`
    color: var(--color-textgrey);
    cursor: pointer;
`;
const baseUrl = process.env.REACT_APP_BASE_URL;
const ReviewListPage = () => {
    const [reviews, setReviews] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [memberData, setMemberData] = useState();
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/mypage'); // 마이페이지로 이동
    };
    console.log(baseUrl);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/review/${memberData.memberNo}/list`,
                    {
                        withCredentials: true,
                    },
                );

                // 날짜 형식 변환
                const formattedData = response.data.map((item) => ({
                    ...item,

                    createdDate: new Date(item.createdDate).toLocaleDateString(
                        'ko-KR',
                        {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        },
                    ),
                }));

                setReviews(formattedData);
                setTotalReviews(formattedData.length);
                console.log(formattedData);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchData(); // 데이터 가져오기 함수 호출
    }, [memberData]);

    useEffect(() => {
        // 서버에서 사용자 정보 가져오기
        getMemberNo()
            .then((res) => {
                setMemberData(res);
                setNickname(res.nickname); // 닉네임 설정
                console.log(res);

                console.log('멤버데이터 ', JSON.stringify(res.memberNo));
                // if (res.role !== 'FARMER') {
                //     console.log(res.role);
                //     alert('농부만 들어갈 수 있는 페이지 입니다!');
                //     window.location.href = '/';
                // }
            })
            .catch((error) => {
                console.log('데이터 안옴!!!!!!');
                console.error(error);
            });
    }, []);

    return (
        <>
            <StyledContainer>
                <BackButton onClick={handleBack} size="20" />
                <FlexRow>
                    <FlexRow style={{ marginRight: '1rem' }}>
                        <TitleContainer>
                            <BoardTitle name={`${nickname}의 리뷰`} />
                        </TitleContainer>

                        <Totalcnt>({totalReviews})</Totalcnt>
                    </FlexRow>
                </FlexRow>

                {reviews.length === 0 ? (
                    <EmptyBoard name="리뷰내역이 없습니다." />
                ) : (
                    reviews.map((review, index) => (
                        <Link to={`/review/${review.reviewNo}/detail`}>
                            <InquiryItem key={index}>
                                <FarmName>{review.farmId}네 농장</FarmName>
                                <StarRating
                                    rating={review.rating}
                                    size="1rem"
                                />
                                <Content>{review.reviewContent}</Content>
                                <FlexRowGap>
                                    <div>{review.memberId}</div>
                                    <div>{review.createdDate}</div>
                                </FlexRowGap>
                            </InquiryItem>
                        </Link>
                    ))
                )}
            </StyledContainer>
        </>
    );
};
export default ReviewListPage;
