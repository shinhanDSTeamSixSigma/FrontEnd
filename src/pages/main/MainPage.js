import StyledHeader from '../../components/StyledHeader';
import StyledBody from '../../components/StyledBody';
import MySwiper from '../../components/MySwiper';
import Button from '../../components/Button';
import MyFarmList from '../../components/farm/MyFarmList';

import CropDictSwiper from '../../components/crop/CropDictSwiper';

function dictOnclick(cropDictNo) {
    alert('동작 확인: ' + cropDictNo);
}

const MainPage = () => {
    return (
        <div className="main">
            <MySwiper />
            <StyledBody>
                {/* <CropDictSwiper onClickEvent={dictOnclick} /> */}
                <div className="shadow-2xl h-[30rem] mt-12 overflow-scroll rounded-2xl hide-scrollbar">
                    <MyFarmList />
                </div>
            </StyledBody>
        </div>
    );
};
export default MainPage;
