import styled from 'styled-components';
import TitleName from '../../../../components/point/TitleName';
import TitleDetailName from '../../../../components/point/TitleDetailName';
import CropInfo from '../../../../components/point/CropInfo';
import ChargeDetail from '../../../../components/point/ChargeDetail';
import NutrientsInfo from '../../../../components/point/NutrientsInfo';
import CropStatus from '../../../../components/point/CropStatus';

const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
`;

const PaymentDetailPage = () => {
    return (
        <>
            <StyledContainer>
                <TitleName name="작물 영수증" />
            </StyledContainer>
            <CropStatus />
            <StyledContainer>
                <TitleDetailName name="구매 정보" />
                <CropInfo />
                <NutrientsInfo />
                <ChargeDetail />
            </StyledContainer>
        </>
    );
};
export default PaymentDetailPage;
