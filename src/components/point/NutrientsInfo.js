import styled from 'styled-components';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`;
const ContentMargin = styled.div`
    margin: auto 0;
`;
const NutrientsImage = styled.div`
    border: 1px solid #f5f5f5;
    background-color: #f5f5f5;
    width: 6.5rem;
    height: 6.5rem;
    margin-right: 1rem;
    border-radius: 0.8rem;
`;

const NutrientsInfo = () => {
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
                <NutrientsImage />
                <ContentMargin style={{ marginRight: '2rem' }}>
                    <div style={farmName}>토심이네 농장</div>
                    <div style={cropName}>고급 영양제</div>
                    <FlexRow style={detailName}>
                        <div>2,000원</div>
                    </FlexRow>
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
export default NutrientsInfo;
