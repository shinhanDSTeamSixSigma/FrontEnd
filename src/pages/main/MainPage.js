import StyledHeader from '../../components/StyledHeader';
import StyledBody from '../../components/StyledBody';
import MySwiper from '../../components/MySwiper';
import Button from '../../components/Button';
const MainPage = () => {
    return (
        <div className="main">
            <MySwiper />
            <StyledBody>
                <div className="shadow-2xl h-60 mt-3">작물 사전</div>
                <div className="shadow-2xl h-60 mt-12">농장 리스트</div>
            </StyledBody>
        </div>
    );
};
export default MainPage;
