import styled from "styled-components";
const CateBox=styled.div`
    background: #73A9AD;
    border-radius:0.3rem;
    width: 5em;
    height: 2em;
    color:white;
    font-size:0.5em;
    font-weight:400;
    display: flex;
    align-items: center;
    justify-content: center;

`
const CropCatebox=(props)=>{
    return(
        <>
        <CateBox>{props.name}</CateBox>
        </>
    );
};
export default CropCatebox;