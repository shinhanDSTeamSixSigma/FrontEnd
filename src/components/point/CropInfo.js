import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { prefix } from '../../api/farmApi';

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
const url = `${prefix}`;

const CropInfo = ({ cartItems, myCrop, myFarm }) => {
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
            <FlexRow style={{ margin: '1rem 1rem 2rem 1rem' }}>
                <FarmImage>
                    {myCrop && (
                        <div>
                            <img
                                src={`${url}/${myCrop.image}`}
                                style={{ width: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    )}
                </FarmImage>
                <ContentMargin style={{ marginRight: '2rem' }}>
                    <div style={farmName}>{myFarm.farmName}</div>
                    <div>{myCrop && <div>{myCrop.cropName}</div>}</div>
                    <FlexRow>
                        {cartItems.map((element, idx) => (
                            <div key={idx}>
                                <div style={cropName}>{element.name}</div>
                                <div style={detailName}>
                                    {(element.price * element.quantity)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    원
                                </div>
                            </div>
                        ))}
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
            </FlexRow>
        </>
    );
};
export default CropInfo;
