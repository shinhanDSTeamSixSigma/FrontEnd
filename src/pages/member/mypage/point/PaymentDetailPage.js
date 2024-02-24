import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TitleName from '../../../../components/point/TitleName';
import TitleDetailName from '../../../../components/point/TitleDetailName';
import ChargeDetail from '../../../../components/point/ChargeDetail';
import CropReceiptInfo from '../../../../components/point/CropReceiptInfo';
import CropStatus from '../../../../components/point/CropStatus';

const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
`;

const PaymentDetailPage = () => {
    const location = useLocation();
    const { crop } = location.state;

    return (
        <>
            <StyledContainer>
                <TitleName name="작물 영수증" />
            </StyledContainer>
            <CropStatus />
            <StyledContainer>
                <TitleDetailName name="구매 정보" />
                <CropReceiptInfo crop={crop} />
                <ChargeDetail crop={crop} />
            </StyledContainer>
        </>
    );
};
export default PaymentDetailPage;
