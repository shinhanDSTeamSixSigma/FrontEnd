import styled from 'styled-components';

const BodyHeader = styled.header`
    color: black;
    font-size: 20px;
    margin: 1.5rem 1rem 1.5rem;
`;
export default function StyledHeader({ children }) {
    return (
        <>
            <BodyHeader>{children}</BodyHeader>
        </>
    );
}
