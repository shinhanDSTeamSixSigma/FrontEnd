import styled from 'styled-components';
import DiaryTitle from '../../../../components/diary/DiaryTitle';
import DiaryCalendar from '../../../../components/diary/DiaryCalendar';
import CalendarIcon from '../../../../components/diary/CalendarIcon';

const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
`;

const DiaryCalendarPage = () => {
    return (
        <>
            <StyledContainer>
                <DiaryTitle />
                <DiaryCalendar />
            </StyledContainer>
            <CalendarIcon />
        </>
    );
};
export default DiaryCalendarPage;
