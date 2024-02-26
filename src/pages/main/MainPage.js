import StyledHeader from '../../components/StyledHeader';
import StyledBody from '../../components/StyledBody';
import MySwiper from '../../components/MySwiper';
import Button from '../../components/Button';
import MyFarmList from '../../components/farm/MyFarmList';
import CropListPage from '../member/dict/CropListPage';
const MainPage = () => {
    return (
        <div className="main">
            <MySwiper />
            <StyledBody>
                <div className="shadow-2xl h-[30rem]  overflow-auto mt-10 rounded-2xl hide-scrollbar">
                    <CropListPage />
                </div>
                <div className="shadow-2xl h-[30rem] mt-12 overflow-scroll rounded-2xl hide-scrollbar">
                    <MyFarmList />
                </div>
            </StyledBody>
        </div>
    );
};
export default MainPage;
