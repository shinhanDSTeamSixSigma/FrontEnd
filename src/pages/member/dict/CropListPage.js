import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CropImage from '../../../components/crop/CropImage';
import CropCatebox from '../../../components/crop/CropCatebox';
const StyledContainer = styled.div`
    background-color: white;
    font-size: 1em;
    border-radius: 0.8rem;
    margin: auto 1.5rem auto;
`;
const Title = styled.div`
    font-size: 1em;
    font-weight: 600;
    margin-left: 1rem;
`;
const CropItemList = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 1em;
`;
const CropItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.6em;
    width: 33%;
    height: 40%;
`;
const ItemContent = styled.div`
    margin-top: 0.3em;
    display: flex;
    justify-content: center;
`;
const ImageContainer = styled.div`
    width: 26vw; /* viewport 너비의 28% */
    height: 26vw; /* viewport 너비의 28% */
    max-width: 200px; /* 최대 너비 */
    max-height: 200px; /* 최대 높이 */
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden; /* 이미지가 컨테이너를 벗어나지 않도록 함 */
    border-radius: 1em;
`;
const CropName = styled.div`
    font-size: 0.8em;
    font-weight: 500;
`;

const baseUrl = process.env.REACT_APP_BASE_URL;
function CropListPage() {
    const [cropList, setCropList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/crop-dict/list`);
                setCropList(response.data); // API에서 받아온 작물 목록을 상태에 업데이트
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching crop list:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <StyledContainer>
            <Title>작물정보</Title>
            <CropItemList>
                {cropList.map((crop, index) => (
                    <CropItem key={index}>
                        {/* Link 컴포넌트를 사용하여 해당 작물의 상세 페이지로 이동 */}
                        <Link to={`/crop-detail/${crop.cropDictNo}`}>
                            <ImageContainer>
                                <img
                                    src={`${baseUrl}/img/${crop.image}`}
                                    alt="cropImage"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </ImageContainer>
                            <ItemContent>
                                <CropCatebox
                                    name={crop.cropCategoryEntity.cropCateName}
                                ></CropCatebox>
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
