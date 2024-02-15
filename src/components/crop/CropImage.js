import styled from "styled-components";
const Image = styled.div`
    // margin-right:1em;
    width: ${(props)=>props.width};
    height: ${(props)=>props.height};
    border-radius:0.5rem;
    background: #F9F7C9;
`
const CropImage =({width,height}) =>{
    return (
        <>
        <Image width={width} height={height}>이미지 컴포넌트</Image>
        </>
    );
};
export default CropImage;