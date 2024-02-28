import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoArrowBackSharp } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CropImage from '../../../components/crop/CropImage';
import CropCatebox from '../../../components/crop/CropCatebox';
const StyledContainer = styled.div`
    background-color: white;
    border-radius: 0.8rem;
    margin: 1.5em;
`;
const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const Container = styled.div`
    display: flex;
    align-items: center;
`;
const Title = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
    margin-right: 0.5em;
`;
const GreenText = styled.div`
    margin-top: 0.5em;
    color: #4f6f52; /* 초록색 */
    font-size: 0.7rem;
    font-weight: 600;
`;
const GrayText = styled.div`
    color: #585858; /* 회색 */
    font-size: 0.6rem;
    margin-top: 0.3em;
`;
const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`;
const DivLine = styled.div`
    background: #90c8ac;
    width: 4rem;
    height: 0.1em;
    margin-top: 1.5rem;
`;
const ImageContainer = styled.div`
    width: 40vw; /* viewport 너비의 28% */
    height: 40vw; /* viewport 너비의 28% */
    max-width: 200px; /* 최대 너비 */
    max-height: 200px; /* 최대 높이 */
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden; /* 이미지가 컨테이너를 벗어나지 않도록 함 */
    border-radius: 1rem;
`;
const SubTitle = styled.div`
    font-size: 0.9rem;
    font-weight: 500;
    margin-right: 0.5rem;
    margin-left: 0.2rem;
    margin-top: 0.3rem;
`;
const Content = styled.div`
    font-size: 0.8rem;
    color: #585858; /* 회색 */
    margin-right: 0.7em;
    margin-left: 0.2rem;
    margin-top: 0.3em;
`;
const SummaryText = styled.div`
    margin-left: 0.8rem;
`;
const BackButton = styled(IoArrowBackSharp)`
    color: var(--color-textgrey);
    margin-bottom: 0.5rem;
    cursor: pointer;
`;

const baseUrl = process.env.REACT_APP_BASE_URL;
const CropDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cropDetail, setCropDetail] = useState(null);

    useEffect(() => {
        const fetchCropDetail = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/crop-dict/detail/${id}`,
                );
                setCropDetail(response.data); // API에서 받아온 작물 상세 정보를 상태에 업데이트
                console.log(response.data);
                console.log(id);
            } catch (error) {
                console.error('Error fetching crop detail:', error);
            }
        };

        fetchCropDetail();
    }, [id]); // cropDictNo가 변경될 때마다 실행

    const getSeasons = (cropDetail) => {
        const seaseons = [];
        if (cropDetail.spring === 1) seaseons.push('봄');
        if (cropDetail.summer === 1) seaseons.push('여름');
        if (cropDetail.fall === 1) seaseons.push('가을');
        if (cropDetail.winter === 1) seaseons.push('겨울');
        return seaseons.join(', ');
    };
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <>
            <StyledContainer>
                <BackButton onClick={handleBack} size="20" />
                <FlexRow>
                    <ImageContainer>
                        <img
                            src={`${baseUrl}/img/${
                                cropDetail && cropDetail.image
                            }`}
                            alt="cropImage"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </ImageContainer>
                    <SummaryText>
                        <Container>
                            <Title>{cropDetail && cropDetail.cropName}</Title>
                            <CropCatebox
                                name={
                                    cropDetail &&
                                    cropDetail.cropCategoryEntity.cropCateName
                                }
                            ></CropCatebox>
                        </Container>
                        <GreenText>
                            {cropDetail && cropDetail.summary}
                        </GreenText>
                        <GrayText>
                            제철시기 : {cropDetail && getSeasons(cropDetail)}
                        </GrayText>
                        <GrayText>
                            난이도 : {cropDetail && cropDetail.summary}
                        </GrayText>
                        <GrayText>
                            재배기간 : {cropDetail && cropDetail.term}일
                        </GrayText>
                        <GrayText>
                            발아온도 : {cropDetail && cropDetail.lowTemp} ~{' '}
                            {cropDetail && cropDetail.highTemp} 도
                        </GrayText>
                    </SummaryText>
                </FlexRow>
                <FlexColumn>
                    <DivLine />
                    <SubTitle>작물설명</SubTitle>
                    {cropDetail &&
                        cropDetail.cropContent
                            .split('▷')
                            .map((paragraph, index) => (
                                <Content key={index}>{paragraph}</Content>
                            ))}
                    <DivLine />
                    <SubTitle>재배팁</SubTitle>
                    {cropDetail &&
                        cropDetail.tip
                            .split('▷')
                            .map((tip, index) => (
                                <Content key={index}>{tip}</Content>
                            ))}
                    <DivLine />
                    <SubTitle>효과</SubTitle>
                    <Content>{cropDetail && cropDetail.effect}</Content>
                    <DivLine />
                    <SubTitle>주요성분</SubTitle>
                    <Content>{cropDetail && cropDetail.nutrient}</Content>
                </FlexColumn>
            </StyledContainer>
        </>
    );
};
export default CropDetailPage;
