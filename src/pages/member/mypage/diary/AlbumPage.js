import StyledBody from '../../../../components/StyledBody';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DiaryTitle from '../../../../components/diary/DiaryTitle';

const baseUrl = process.env.REACT_APP_BASE_URL;

const CropImage = styled.img`
    width: 6rem;
    height: 6rem;
    border-radius: 0.8rem;
`;

var cropNo = 6;

export default function AlbumPage() {
    const [crops, setCrops] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/mypage/album/${cropNo}`,
                    { withCredentials: true },
                );
                setCrops(response.data); // API에서 받아온 작물 목록을 상태에 업데이트
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching crop list:', error);
            }
        };

        fetchData(); // 데이터 가져오기 함수 호출
    }, []);
    console.log(crops);
    return (
        <>
            <div
                style={{
                    color: 'black',
                    fontSize: '0.8em',
                    margin: 'auto 1.5rem auto',
                }}
            >
                <DiaryTitle />
            </div>
            <StyledBody>
                <div style={{ fontSize: '1rem' }}>앨범</div>
                <div className="flex flex-wrap mt-3 justify-start">
                    {/*Array(9)
                        .fill()
                        .map((_, index) => (
                            <div
                                key={index}
                                className="h-24 w-24 border ml-auto mb-3"
                            >
                                ㅇㅇ
                            </div>
                        ))*/}
                    {crops.images &&
                        crops.images.map((image, index) => (
                            <div
                                key={index}
                                className="h-24 w-24 border ml-auto mb-3"
                            >
                                <CropImage
                                    src={`${baseUrl}/img${image}`}
                                ></CropImage>
                            </div>
                        ))}
                </div>
            </StyledBody>
        </>
    );
}
