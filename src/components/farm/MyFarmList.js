import StyledHeader from '../StyledHeader';
import StyledBody from '../StyledBody';

export default function MyFarmList() {
    return (
        <>
            <StyledHeader>내 농장 목록</StyledHeader>
            <StyledBody>
                <div className="shadow-2xl h-60 mt-12">내 농장물 상태</div>
                <div className="shadow-2xl h-60 mt-12">작물 분류</div>
                <div className="shadow-2xl h-60 mt-12">인기 농부 리스트</div>
                <div className="shadow-2xl h-60 mt-12">공지사항 게시글</div>
            </StyledBody>
        </>
    );
}
