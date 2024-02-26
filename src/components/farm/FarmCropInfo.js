import { prefix } from '../../api/farmApi';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // useParams를 가져옵니다.
import styled from 'styled-components';
import CropCatebox from '../crop/CropCatebox';

const url = `${prefix}`;
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
    width: 5rem;
    height: 0.15em;
    margin-top: 1.5rem;
`;
const ImageContainer = styled.div`
    width: 35vw; /* viewport 너비의 28% */
    height: 35vw; /* viewport 너비의 28% */
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
    font-size: 1rem;
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

export default function FarmCropInfo({ farmCrop }) {
    const getSeasons = (cropDetail) => {
        const seaseons = [];
        if (cropDetail.spring === 1) seaseons.push('봄');
        if (cropDetail.summer === 1) seaseons.push('여름');
        if (cropDetail.fall === 1) seaseons.push('가을');
        if (cropDetail.winter === 1) seaseons.push('겨울');
        return seaseons.join(', ');
    };

    return (
        <>
            <div className="my-6 font-semibold">작물 소개</div>
            <StyledContainer>
                <FlexRow>
                    {farmCrop && (
                        <div className="h-32 w-32 mr-[0.3rem]">
                            {
                                <img
                                    src={`${url}/${farmCrop.image}`}
                                    className="h-full rounded-2xl shadow-xl"
                                />
                            }
                        </div>
                    )}

                    <SummaryText>
                        <Container>
                            <Title>
                                {farmCrop && <div>{farmCrop.cropName}</div>}
                            </Title>
                            <CropCatebox
                                name={
                                    farmCrop &&
                                    farmCrop.cropCategoryEntity.cropCateName
                                }
                            ></CropCatebox>
                        </Container>
                        <GreenText>{farmCrop && farmCrop.summary}</GreenText>
                        <GrayText>
                            제철시기 : {farmCrop && getSeasons(farmCrop)}
                        </GrayText>
                        <GrayText>
                            난이도 : {farmCrop && farmCrop.summary}
                        </GrayText>
                        <GrayText>
                            재배기간 : {farmCrop && farmCrop.term}일
                        </GrayText>
                        <GrayText>
                            발아온도 : {farmCrop && farmCrop.lowTemp} ~{' '}
                            {farmCrop && farmCrop.highTemp} 도
                        </GrayText>
                    </SummaryText>
                </FlexRow>
                <FlexColumn>
                    <DivLine />
                    <SubTitle>작물설명</SubTitle>
                    {farmCrop &&
                        farmCrop.cropContent
                            .split('▷')
                            .map((paragraph, index) => (
                                <Content key={index}>{paragraph}</Content>
                            ))}
                    <DivLine />
                    <SubTitle>재배팁</SubTitle>
                    {farmCrop &&
                        farmCrop.tip
                            .split('▷')
                            .map((tip, index) => (
                                <Content key={index}>{tip}</Content>
                            ))}
                    <DivLine />
                    <SubTitle>효과</SubTitle>
                    <Content>{farmCrop && farmCrop.effect}</Content>
                    <DivLine />
                    <SubTitle>주요성분</SubTitle>
                    <Content>{farmCrop && farmCrop.nutrient}</Content>
                </FlexColumn>
            </StyledContainer>
        </>
    );
}
