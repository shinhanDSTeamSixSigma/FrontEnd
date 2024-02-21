import styled from 'styled-components';

const BodyBody = styled.body`
    color: black;
    background-color: #ffffff;
    font-size: 20px;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    padding-bottom: 1rem;
`;

export default function StyledBody({ children }) {
    return (
        <>
            <BodyBody>{children}</BodyBody>
        </>
    );
}
