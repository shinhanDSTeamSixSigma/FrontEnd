import styled from 'styled-components';
import TitleName from '../../../../components/point/TitleName';
import MyPointValue from '../../../../components/point/MyPointValue';
import PointCharge from '../../../../components/point/PointCharge';
import FullButton from '../../../../components/FullButton';
import Payment from '../../../../components/point/Payment';

const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
`;

const PointChargePage = () => {
    return (
        <>
            <StyledContainer>
                <TitleName name="충전하기" />
                <MyPointValue />
                <PointCharge />
            </StyledContainer>
            <FullButton name="충전하기" />
            <Payment></Payment>
        </>
    );
};
export default PointChargePage;
