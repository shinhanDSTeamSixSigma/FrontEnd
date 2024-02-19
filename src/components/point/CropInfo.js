import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`;
const ContentMargin = styled.div`
    margin: auto 0;
`;
const FarmImage = styled.div`
    border: 1px solid #f5f5f5;
    background-color: #f5f5f5;
    width: 6.5rem;
    height: 6.5rem;
    margin-right: 1rem;
    border-radius: 0.8rem;
`;

const CropInfo = () => {
    const location = useLocation(); // useLocation 훅을 사용하여 현재 위치의 정보를 가져옵니다.
    const { cartItems, totalPrice } = location.state;

    const farmName = {
        fontWeight: '600',
        fontSize: '0.8em',
    };
    const cropName = {
        fontWeight: '600',
        fontSize: '1.4em',
    };
    const detailName = {
        fontSize: '1em',
        color: '#878787',
    };
    return (
        <>
            {/* 어떤 농장인지만 가져오면됩니다 */}
            <FlexRow style={{ margin: '1rem 1rem 2rem 1rem' }}>
                <FarmImage />
                <ContentMargin style={{ marginRight: '2rem' }}>
                    <div style={farmName}>토심이네 농장</div>
                    <div style={cropName}>평 수</div>
                    <FlexRow style={detailName}>
                        {cartItems.map((element, idx) => (
                            <div key={idx} className="flex">
                                <div>수량 - {element.quantity} </div>
                                <div className="ml-2">
                                    금액 - {element.price * element.quantity} 원
                                </div>
                            </div>
                        ))}
                        {/* {cartItems.forEach(
                            (item, idx) =>
                                (
                                    <div>
                                        {item.name} - {item.quantity}평
                                    </div>
                                ) | <p>금액: {item.price * item.quantity}원</p>,
                        )} */}
                    </FlexRow>
                </ContentMargin>
                <ContentMargin style={{ marginLeft: 'auto' }}>
                    <FlexRow>
                        {cartItems.map((element, idx) => (
                            <div key={idx}>
                                <div>x{element.quantity}</div>
                            </div>
                        ))}
                    </FlexRow>
                </ContentMargin>
                {/* 총금액 - {totalPrice} 원 */}
            </FlexRow>
        </>
    );
};
export default CropInfo;
