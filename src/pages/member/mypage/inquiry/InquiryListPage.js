import styled, { css } from "styled-components";
import { MdVisibility } from 'react-icons/md';
import axios from "axios";
import BoardTitle from "../../../../components/board/BoardTitle";
import EmptyBoard from "../../../../components/board/EmptyBoard";
import Button from "../../../../components/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const StyledContainer = styled.div`
    background-color:white;
    border-radius:0.6rem;
    margin:1.5rem;
`;
const FlexRow=styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
`;
const FlexRowGap=styled.div`
    display:flex;
    flex-direction:row;
    gap:2rem;
`;
const Title=styled.div`
    font-size:1.2rem;
    font-weight: 600;
`
const RepliedFont=styled.div`
    ${(props) =>
        props.isReplied &&
        css`
            color: #90C8AC;
            font-weight: 600;
        `}

    ${(props) =>
        !props.isReplied &&
        css`
            color: #4F6F52;
            font-weight: 600;
        `}
`
const ViewsContainer = styled.div`
    display: flex;
    align-items: center;
`;
const InquiryItem=styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    border: 0.1rem solid lightgray;
    border-radius: 1rem;
    padding: 2rem 1.5rem;
    margin-top: 1rem;
    cursor: pointer;
`;
const InquiryListPage = () => {
    
    const [inquires, setInquiries] = useState([]);
    const farmNo =50; //농장번호 1번의 문의글 목록

    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await axios.get(`http://localhost:8090/board/inquiryList?farmNo=${farmNo}&categoryNo=1`);
              // 날짜 형식 변환
              const formattedData = response.data.map(item => ({
                    ...item,
                    createdDate: new Date(item.createdDate).toLocaleDateString('ko-KR',{
                        year: 'numeric',
                        month: '2-digit', 
                        day: '2-digit'
                    })
                }));
                setInquiries(formattedData); // API에서 받아온 작물 목록을 상태에 업데이트
                console.log(formattedData);
              
            
          } catch (error) {
              console.error("Error fetching inquiries:", error);
            }
          };
       
          fetchData(); // 데이터 가져오기 함수 호출
        }, [farmNo]);

        const getReplied = (data) => {
            return data.isReplied ? "답변완료" : "미답변";
        }
      
    return(
        <>
        <StyledContainer>
            <FlexRow>
                <BoardTitle name="농부 문의 내역" style={{ marginRight: 'auto' }}/>
            
                <Link to={`/customer-inquiry/${farmNo}/regist`}>
                        <Button name="문의하기" widthHeight= 'w-18 h-10'/>
                </Link>
            </FlexRow>
            {inquires.length ===0 ?(
                <EmptyBoard name="작성하신 문의내역이 없습니다."/>
            ) : (
                inquires.map((inquiry,index) =>(
                    <Link to={`/customer-inquiry/${inquiry.boardNo}/detail`}>
                    <InquiryItem key={index}>
                        <FlexRow>
                            <Title>{inquiry.title}</Title>
                            <RepliedFont>{getReplied(inquiry)}</RepliedFont>
                        </FlexRow>
                        <div>{inquiry.boardContent}</div>
                        <FlexRowGap>
                            <div>{inquiry.memberId}</div>
                            <div>{inquiry.createdDate}</div>
                            <ViewsContainer>
                                <MdVisibility style={{ marginRight: '0.5rem' }} /> {/* Icon component */}
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