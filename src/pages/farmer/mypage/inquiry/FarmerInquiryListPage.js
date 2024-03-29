import styled, { css } from 'styled-components';
import { MdVisibility } from 'react-icons/md';
import axios from 'axios';
import BoardTitle from '../../../../components/board/BoardTitle';
import EmptyBoard from '../../../../components/board/EmptyBoard';
import Button from '../../../../components/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
    margin: 0.5rem 0 1rem 0;
`;
const FlexRowGap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    font-size: 0.8rem;
    color: #878787;
`;
const Title = styled.div`
    font-size: 0.8rem;

    font-weight: 600;
`;
const Totalcnt = styled.div`
    font-size: 0.6rem;
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
    gap: 1rem;
    border: 0.1rem solid lightgray;
    border-radius: 1rem;
    padding: 1.5rem 1.5rem;
    margin-top: 1rem;
    cursor: pointer;
    a {
        text-decoration: none; /* 밑줄 제거 */
        color: inherit; /* 상위 요소의 색상 상속 */
    }
`;
const baseUrl = process.env.REACT_APP_BASE_URL;
const FarmerInquiryListPage = ({ farm }) => {
    const [inquires, setInquiries] = useState([]);
    const [totalInquiries, setTotalInquiries] = useState(0);
    const farmNo = farm.farmNo; //농장번호
    const [memberData, setMemberData] = useState(null); // 농부의 memberNo
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/board/inquiryList?farmNo=${farmNo}&categoryNo=1`,
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
                    isReplied: item.replied ? '답변완료' : '미답변',
                }));
                setInquiries(formattedData);
                setTotalInquiries(formattedData.length);
            } catch (error) {
                console.error('Error fetching inquiries:', error);
            }
        };

        fetchData();
    }, [farmNo]);

    useEffect(() => {
        // 서버에서 사용자 정보 가져오기
        getMemberNo()
            .then((res) => {
                setMemberData(res.memberNo);
                console.log(res);

                console.log('멤버데이터 ', JSON.stringify(memberData));
            })
            .catch((error) => {
                console.log('데이터 안옴!!!!!!');
                console.error(error);
            });
    }, []);

    return (
        <>
            <StyledContainer>
                <FlexRow>
                    <FlexRow style={{ marginRight: 'auto' }}>
                        <BoardTitle name="농부 문의 내역" />
                        <Totalcnt>총 {totalInquiries}개의 문의</Totalcnt>
                    </FlexRow>
                    {/* {memberData === 'MEMBER' && ( */}
                        <Link to={`/farm/inquiry/${farmNo}/regist`}>
                            <Button name="작성" widthHeight="w-14 h-8" />
                        </Link>
                    {/* )} */}
                </FlexRow>

                {inquires.length === 0 ? (
                    <EmptyBoard name="문의내역이 없습니다." />
                ) : (
                    inquires.map((inquiry, index) => (
                        <Link to={`/farm/inquiry/${inquiry.boardNo}/detail`}>
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
export default FarmerInquiryListPage;
