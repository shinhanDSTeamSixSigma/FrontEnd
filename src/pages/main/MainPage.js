import StyledHeader from '../../components/StyledHeader';
import StyledBody from '../../components/StyledBody';
import MySwiper from '../../components/MySwiper';
import Button from '../../components/Button';
const MainPage = () => {
    return (
        <div className="main">
            <MySwiper />
            <StyledBody>
                <div className="shadow-2xl h-60 mt-12">내 농장물 상태</div>
                <div className="shadow-2xl h-60 mt-12">작물 분류</div>
                <div className="shadow-2xl h-60 mt-12">인기 농부 리스트</div>
                <div className="shadow-2xl h-60 mt-12">공지사항 게시글</div>
            </StyledBody>
        </div>
    );
};
export default MainPage;
