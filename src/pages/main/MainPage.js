import StyledHeader from '../../components/StyledHeader';
import StyledBody from '../../components/StyledBody';
import MySwiper from '../../components/MySwiper';
import Button from '../../components/Button';
import CropDictSwiper from '../../components/crop/CropDictSwiper';

function dictOnclick(cropDictNo) {
    alert('동작 확인: ' + cropDictNo);
}

const MainPage = () => {
    return (
        <div className="main">
            <MySwiper />
            <StyledBody>
                <div className="shadow-2xl h-60 mt-3">작물 사전</div>
                <CropDictSwiper onClickEvent={dictOnclick} />
                <div className="shadow-2xl h-60 mt-12">농장 리스트</div>
            </StyledBody>
        </div>
    );
};
export default MainPage;
