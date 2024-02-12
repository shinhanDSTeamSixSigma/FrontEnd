import styled from "styled-components";
const Image = styled.div`
    margin-right:1em;
    width: 8em;
    height: 8em;
    border-radius:0.5rem;
    background: #F9F7C9;
`
const CropImage =() =>{
    return (
        <>
        <Image>이미지 컴포넌트</Image>
        </>
    );
};
export default CropImage;