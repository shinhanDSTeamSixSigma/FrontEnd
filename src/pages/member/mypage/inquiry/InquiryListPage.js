import styled, { css } from 'styled-components';
import { MdVisibility } from 'react-icons/md';
import axios from 'axios';
import { IoArrowBackSharp } from 'react-icons/io5';
import BoardTitle from '../../../../components/board/BoardTitle';
import EmptyBoard from '../../../../components/board/EmptyBoard';
import Button from '../../../../components/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMemberNo } from '../../../../api/farmApi';

const StyledContainer = styled.div`
    background-color: white;
    border-radius: 0.6rem;
    margin: 1.5rem;
`;
const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0.5rem 1rem 1rem 0;
`;
const FlexRowGap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
    font-size: 0.8rem;
    color: #878787;
`;
const Title = styled.div`
    font-size: 1rem;
    font-weight: 600;
`;
const Totalcnt = styled.div`
    font-size: 0.8rem;
    font-weight: 500;
    color: #878787;
    margin: 0.5rem 0 0 0.8rem;
`;
const Content = styled.div`
    font-size: 0.8rem;
    font-weight: 500;
`;
const RepliedFont = styled.div`
    ${(props) =>
        props.isReplied &&
        css`
            color: #4f6f52;
            font-size: 0.8rem;

            font-weight: 600;
        `}

    ${(props) =>
        !props.isReplied &&
        css`
            color: #90c8ac;
            font-size: 0.8rem;
            font-weight: 600;
        `}
`;
const ViewsContainer = styled.div`
    display: flex;
    align-items: center;
`;
const InquiryItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    border: 0.1rem solid lightgray;
    border-radius: 1rem;
    padding: 1.5rem 1.5rem;
    margin-top: 1rem;
    cursor: pointer;
`;
export const BackButton = styled(IoArrowBackSharp)`
    color: var(--color-textgrey);
    cursor: pointer;
`;

const baseUrl = process.env.REACT_APP_BASE_URL;
const InquiryListPage = () => {
    const [inquires, setInquiries] = useState([]);
    const [totalInquiries, setTotalInquiries] = useState(0);
    const [memberData, setMemberData] = useState();
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/mypage'); // 마이페이지로 이동
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (memberData && memberData.memberNo) {
                    const response = await axios.get(
                        `${baseUrl}/board/${memberData.memberNo}/inquiryList?categoryNo=1`,
                        {
                            withCredentials: true,
                        },
                    );

                    // 날짜 형식 변환
                    const formattedData = response.data.map((item) => ({
                        ...item,
                        createdDate: new Date(
                            item.createdDate,
                        ).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        }),
                        isReplied: item.replied ? '답변완료' : '미답변',
                    }));

                    setInquiries(formattedData); // API에서 받아온 작물 목록을 상태에 업데이트
                    setTotalInquiries(formattedData.length);
                } else {
                    console.error('Member data or memberNo is not defined.');
                }
            } catch (error) {
                console.error('Error fetching inquiries:', error);
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
                    <FlexRow style={{ marginRight: 'auto' }}>
                        <BoardTitle name={`${nickname}의 문의`} />
                        <Totalcnt>총 {totalInquiries}개의 문의</Totalcnt>
                    </FlexRow>
                    {/* <Link to={`/inquiry/${farmNo}/regist`}>
                    <Button name="문의하기" widthHeight= 'w-18 h-10'/>
                </Link> */}
                </FlexRow>

                {inquires.length === 0 ? (
                    <EmptyBoard name="작성하신 문의내역이 없습니다." />
                ) : (
                    inquires.map((inquiry, index) => (
                        <Link to={`/inquiry/${inquiry.boardNo}/detail`}>
                            <InquiryItem key={index}>
                                <FlexRow>
                                    <Title>{inquiry.title}</Title>
                                    <RepliedFont isReplied={inquiry.replied}>
                                        {' '}
                                        {inquiry.replied
                                            ? '답변완료'
                                            : '미답변'}
                                    </RepliedFont>
                                </FlexRow>
                                <Content>{inquiry.boardContent}</Content>
                                <FlexRowGap>
                                    <div>{inquiry.nickname}</div>
                                    <div>{inquiry.createdDate}</div>
                                    <ViewsContainer>
                                        <MdVisibility
                                            style={{ marginRight: '0.5rem' }}
                                        />{' '}
                                        {/* Icon component */}
                                        <div>{inquiry.views}</div>
                                    </ViewsContainer>
                                </FlexRowGap>
                            </InquiryItem>
                        </Link>
                    ))
                )}
            </StyledContainer>
        </>
    );
};
export default InquiryListPage;
