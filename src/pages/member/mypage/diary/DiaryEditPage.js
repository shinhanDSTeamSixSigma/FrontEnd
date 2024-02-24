import React, { useState } from 'react';
import styled from 'styled-components';
import DiaryDetailTitle from '../../../../components/diary/DiaryDetailTitle';
import DiaryEdit from '../../../../components/diary/DiaryEdit';

const baseUrl = process.env.REACT_APP_BASE_URL;

const StyledContainer = styled.div`
    color: black;
    font-size: 0.8em;
    margin: auto 1.5rem auto;
`;

const DiaryEditPage = () => {
    const [memberNo, setMemberNo] = useState(1); // 추후 변경
    const [cropNo, setCropNo] = useState(1); // 추후 변경

    return (
        <>
            <StyledContainer>
                <DiaryDetailTitle
                    memberNo={memberNo}
                    cropNo={cropNo}
                    baseUrl={baseUrl}
                />
            </StyledContainer>
            <DiaryEdit baseUrl={baseUrl} />
        </>
    );
};
export default DiaryEditPage;
