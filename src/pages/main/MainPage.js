import StyledHeader from '../../components/StyledHeader';
import StyledBody from '../../components/StyledBody';
import MySwiper from '../../components/MySwiper';
import Button from '../../components/Button';
import MyFarmList from '../../components/farm/MyFarmList';
const MainPage = () => {
    return (
        <div className="main">
            <StyledHeader>
                <MySwiper />
            </StyledHeader>
            <StyledBody>
                <div>리뷰 많은 Top3</div>
                <div className="shadow-2xl h-[30rem] mt-2 overflow-hidden rounded-2xl hide-scrollbar">
                    {' '}
                    <MyFarmList numberOfItems={3} />
                </div>
            </StyledBody>
        </div>
    );
};
export default MainPage;
