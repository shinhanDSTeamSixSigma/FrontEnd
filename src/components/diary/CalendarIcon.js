import styled from 'styled-components';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 0.8em;
`;

const CalendarIcon = () => {
    const styledContainer = {
        backgroundColor: '#c4dfaa',
        margin: '0 auto 2rem',
        height: '4rem',
        justifyContent: 'center',
        alignItems: 'center',
    };
    return (
        <>
            <FlexRow style={styledContainer}>
                <FlexRow style={{ margin: '1rem' }}>
                    <div>이미지</div>
                    <div>물 준 날</div>
                </FlexRow>
                <FlexRow style={{ margin: '1rem' }}>
                    <div>이미지</div>
                    <div>영양제 준 날</div>
                </FlexRow>
            </FlexRow>
        </>
    );
};
export default CalendarIcon;
