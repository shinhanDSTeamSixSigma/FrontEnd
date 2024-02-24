import styled, { css } from 'styled-components';
import { MdVisibility } from 'react-icons/md';
import axios from 'axios';
import BoardTitle from '../../../../components/board/BoardTitle';
import EmptyBoard from '../../../../components/board/EmptyBoard';
import Button from '../../../../components/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
            color: #90c8ac;
            font-weight: 600;
        `}

    ${(props) =>
        !props.isReplied &&
        css`
            color: #4f6f52;
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
const FarmerInquiryListPage = ({ farm }) => {
    const [inquires, setInquiries] = useState([]);
    const [totalInquiries, setTotalInquiries] = useState(0);
    const farmNo = farm.farmNo; //농장번호 50번의 문의글 목록

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8090/board/inquiryList?farmNo=${farmNo}&categoryNo=1`,
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

    return (
        <>
            <StyledContainer>
                <FlexRow>
                    <FlexRow style={{ marginRight: 'auto' }}>
                        <BoardTitle name="농부 문의 내역" />
                        <Totalcnt>총 {totalInquiries}개의 문의</Totalcnt>
                    </FlexRow>
                    <Link to={`/farm/inquiry/${farmNo}/regist`}>
                        <Button name="문의하기" widthHeight="w-18 h-10" />
                    </Link>
                </FlexRow>

                {inquires.length === 0 ? (
                    <EmptyBoard name="문의내역이 없습니다." />
                ) : (
                    inquires.map((inquiry, index) => (
                        <Link to={`/farm/inquiry/${inquiry.boardNo}/detail`}>
                            <InquiryItem key={index}>
                                <FlexRow>
                                    <Title>{inquiry.title}</Title>
                                    <RepliedFont>
                                        {inquiry.isReplied}
                                    </RepliedFont>
                                </FlexRow>
                                <Content>{inquiry.boardContent}</Content>
                                <FlexRowGap>
                                    <div>{inquiry.memberId}</div>
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
