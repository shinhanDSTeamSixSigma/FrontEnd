import styled from 'styled-components';
import TitleName from '../../../../components/point/TitleName';
import TitleDetailName from '../../../../components/point/TitleDetailName';
import CropInfo from '../../../../components/point/CropInfo';
import FullButton from '../../../../components/FullButton';
import NutrientsInfo from '../../../../components/point/NutrientsInfo';
import PointApply from '../../../../components/point/PointApply';
import { useLocation } from 'react-router-dom';
const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
`;

const PayApplyPage = () => {
    const location = useLocation(); // 현재 위치
    const { cartItems, totalPrice, myCrop, myFarm } = location.state;
    return (
        <>
            <StyledContainer>
                <TitleName name="결제하기" />
                <TitleDetailName name="구매 정보" />
                <CropInfo
                    cartItems={cartItems}
                    myCrop={myCrop}
                    myFarm={myFarm}
                />
                {/* <NutrientsInfo /> */}
                <PointApply totalPrice={totalPrice} />
            </StyledContainer>
            <FullButton name="결제하기" />
        </>
    );
};
export default PayApplyPage;
