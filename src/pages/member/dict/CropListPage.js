import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CropImage from "../../../components/crop/CropImage";
import CropCatebox from "../../../components/crop/CropCatebox";
const StyledContainer = styled.div`
    background-color:white;
    font-size:1em;
    border-radius:0.8rem;
    margin-left:1.5em;
`;
const CropItemList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around; /* 항목 간의 공간을 균등하게 배치 */
`;
const CropItem = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-bottom:0.3em;
    width: 30%;
`;
const ItemContent = styled.div`
    margin-top: 0.5em; 
`;
const CropName = styled.div`
    font-size:0.8em;
    font-weight: 600;
`
function CropListPage() {
  const [cropList, setCropList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8090/api/crop-list");
        setCropList(response.data); // API에서 받아온 작물 목록을 상태에 업데이트
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching crop list:", error);
      }
    };
 
    fetchData(); // 데이터 가져오기 함수 호출
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <StyledContainer>
        
        <h1>작물정보</h1>
        <CropItemList>
            {cropList.map((crop, index) => (
                <CropItem key={index}>
                    {/* Link 컴포넌트를 사용하여 해당 작물의 상세 페이지로 이동 */}
                    <Link to={`/crop-detail/${crop.cropDictNo}`}>
                        <ItemContent>
                            <CropImage  width="6em" height="6em"src="" alt=""/>
                        </ItemContent>
                        <ItemContent>
                            <CropCatebox name={crop.cropCategoryEntity.cropCateName}></CropCatebox>
                        </ItemContent>
                        <ItemContent>
                            <CropName>{crop.cropName}</CropName>
                        </ItemContent>
                    </Link>
                </CropItem>            
            ))}
            </CropItemList>
        
    </StyledContainer>
  );
}

export default CropListPage;