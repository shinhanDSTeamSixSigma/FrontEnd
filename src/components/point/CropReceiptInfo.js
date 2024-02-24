import styled from 'styled-components';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`;
const ContentMargin = styled.div`
    margin: auto 0;
`;
const CropImage = styled.img`
    width: 6.5rem;
    height: 6.5rem;
    margin-right: 1rem;
    border-radius: 0.8rem;
`;

const CropReceiptInfo = ({ baseUrl, crop }) => {
    console.log(crop);
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
                <CropImage src={`${baseUrl}/img${crop.image}`} />
                <ContentMargin style={{ marginRight: '2rem' }}>
                    <div style={farmName}>{crop.farmName}</div>
                    <div style={cropName}>{crop.cropName}</div>
                    <FlexRow style={detailName}>구입일: {crop.buyDate}</FlexRow>
                </ContentMargin>
                <ContentMargin style={{ marginLeft: 'auto' }}>
                    <FlexRow>
                        <div>x</div>
                        <div>1</div>
                    </FlexRow>
                </ContentMargin>
            </FlexRow>
        </>
    );
};
export default CropReceiptInfo;
