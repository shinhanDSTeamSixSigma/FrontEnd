import React, { useState, useEffect } from "react";
import axios from "axios";

function CropListPage() {
  const [cropList, setCropList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8090/api/crop-list/all");
        setCropList(response.data); // API에서 받아온 작물 목록을 상태에 업데이트
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching crop list:", error);
      }
    };
 
    fetchData(); // 데이터 가져오기 함수 호출
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div>
      <h1>작물정보</h1>
      <ul>
        {cropList.map((crop) => (
          <li key={crop.crop_dict_no}>{crop.crop_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CropListPage;