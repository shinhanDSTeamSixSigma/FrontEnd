import React, { useState } from 'react';
import styled from 'styled-components';
import DiaryTitle from '../../../../components/diary/DiaryTitle';
import DiaryContent from '../../../../components/diary/DiaryContent';

const baseUrl = process.env.REACT_APP_BASE_URL;

const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
`;

const DiaryPage = () => {
    const [memberNo, setMemberNo] = useState(1); // 추후 변경
    const [cropNo, setCropNo] = useState(1); // 추후 변경

    return (
        <>
            <StyledContainer>
                <DiaryTitle
                    memberNo={memberNo}
                    cropNo={cropNo}
                    baseUrl={baseUrl}
                />
            </StyledContainer>
            <DiaryContent
                memberNo={memberNo}
                cropNo={cropNo}
                baseUrl={baseUrl}
            />
        </>
    );
};
export default DiaryPage;
