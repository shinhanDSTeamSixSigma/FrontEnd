import styled from 'styled-components';
import DiaryTitle from '../../../../components/diary/DiaryTitle';
import DiaryContent from '../../../../components/diary/DiaryContent';

const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
`;

const DiaryPage = () => {
    return (
        <>
            <StyledContainer>
                <DiaryTitle />
            </StyledContainer>
            <DiaryContent />
        </>
    );
};
export default DiaryPage;
