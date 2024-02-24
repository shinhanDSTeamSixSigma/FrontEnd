import StyledHeader from '../../../../components/StyledHeader';
import StyledBody from '../../../../components/StyledBody';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
var cropNo = 6;
export default function AlbumPage() {
    const [crops, setCrops] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8090/mypage/album/${cropNo}`,
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
            <StyledHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-2xl font-black">
                            {crops.cropData && crops.cropData.cropNickname}
                        </span>
                        는 지금?
                    </div>
                    <div className="text-sm font-bold pt-2">
                        함께한지
                        <span className="">
                            {' '}
                            {crops.cropData && crops.cropData.dueDate}
                        </span>
                        일째
                    </div>
                </div>
                <div className="border mt-2 border-[#90C8AC]"></div>
            </StyledHeader>
            <StyledBody>
                <span>앨범</span>
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
                                <img
                                    src={`http://localhost:8090/img${image}`}
                                ></img>
                            </div>
                        ))}
                </div>
            </StyledBody>
        </>
    );
}
