import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // useParams를 가져옵니다.
import styled from "styled-components";
import CropSummary from '../../../components/crop/CropSummary';
import CropExplain from '../../../components/crop/CropExplain';

const CropDetailPage = () => {
    const { cropDictNo } = useParams(); // useParams를 사용하여 URL 파라미터를 가져옵니다.
    const [cropDetail, setCropDetail] = useState(null);

    useEffect(() => {
        const fetchCropDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:8090/api/crop-detail/${cropDictNo}`);
            setCropDetail(response.data); // API에서 받아온 작물 상세 정보를 상태에 업데이트
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching crop detail:", error);
        }
        };

        fetchCropDetail();
    }, [cropDictNo]); // cropDictNo가 변경될 때마다 실행

    return(
        <>
            <CropSummary/>
            <CropExplain/>
        </>
    );
};
export default CropDetailPage;