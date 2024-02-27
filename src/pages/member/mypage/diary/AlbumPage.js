import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getMemberNo } from '../../../../api/farmApi';
import axios from 'axios';
import styled from 'styled-components';
import StyledBody from '../../../../components/StyledBody';
import DiaryTitle from '../../../../components/diary/DiaryTitle';

const baseUrl = process.env.REACT_APP_BASE_URL;

const CropImage = styled.img`
    width: 6rem;
    height: 6rem;
    border-radius: 0.8rem;
`;
export default function AlbumPage() {
    const location = useLocation(); // 현재 위치
    const { cropNo } = location.state;

    const [memberData, setMemberData] = useState(null); // 농부의 memberNo
    const [crops, setCrops] = useState([]);

    console.log('앨범 페이지' + memberData);
    console.log('앨범 페이지' + cropNo);

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

    useEffect(() => {
        // 서버에서 사용자 정보 가져오기
        getMemberNo()
            .then((res) => {
                setMemberData(res.memberNo);
            })
            .catch((error) => {
                console.log('데이터 안옴!!!!!!');
                console.error(error);
            });
    }, [memberData]);
    return (
        <>
            <div
                style={{
                    color: 'black',
                    fontSize: '0.8em',
                    margin: 'auto 1.5rem auto',
                }}
            >
                <DiaryTitle
                    memberNo={memberData}
                    cropNo={cropNo}
                    baseUrl={baseUrl}
                />
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
                                    src={`${baseUrl}/img/${image}`}
                                ></CropImage>
                            </div>
                        ))}
                </div>
            </StyledBody>
        </>
    );
}
