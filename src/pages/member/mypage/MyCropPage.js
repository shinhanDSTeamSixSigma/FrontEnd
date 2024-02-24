import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import StyledHeader from '../../../components/StyledHeader';
import StyledBody from '../../../components/StyledBody';
import axios from 'axios';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../../styles/crop/mycrop.css';
import TitleDivisionLine from '../../../components/TitleDivisionLine';

const baseUrl = process.env.REACT_APP_BASE_URL;

const CropImage = styled.img`
    width: 5rem;
    height: 5rem;
    border-radius: 0.8rem;
`;

function MyCropUnit({ crop }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/pay/receipt', { state: { crop } });
    };

    return (
        <div onClick={handleClick}>
            <div className="flex justify-center">
                <CropImage src={`${baseUrl}/img${crop.image}`}></CropImage>
            </div>
            <div className="mt-1">
                <span>{crop.cropNickname}</span>
            </div>
            <p className="text-sm">{crop.cropName}</p>
            <p className="text-xs">{crop.farmName}</p>
            <p className="text-xs mt-2">
                {crop.buyDate} ~ {crop.endDate}
            </p>
            <p className="text-xs ">(D+{crop.dueDate})</p>
        </div>
    );
}

export default function MyCropPage() {
    const [crops, setCrops] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/myCropsList`, {
                    withCredentials: true,
                });
                setCrops(response.data); // API에서 받아온 작물 목록을 상태에 업데이트
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching crop list:', error);
            }
        };

        fetchData(); // 데이터 가져오기 함수 호출
    }, []);

    return (
        <>
            <div style={{ margin: '1.5rem 1.5rem 0.5rem 1.5rem' }}>
                <div className="flex justify-between items-center">
                    <div>
                        <span
                            className="text-2xl font-black"
                            style={{ fontSize: '1.2em' }}
                        >
                            내 작물 리스트
                        </span>
                        <span
                            className="text-base ml-3"
                            style={{ fontSize: '0.8em' }}
                        >
                            재배내역
                        </span>
                    </div>
                </div>
            </div>
            <TitleDivisionLine />
            <div
                className=" h-10 bg-[#C4DFAA] pl-3 leading-10 pt-px"
                style={{
                    fontSize: '0.9em',
                    width: '100%',
                    marginTop: '1rem',
                }}
            >
                <div style={{ marginLeft: '1.5rem' }}>재배중인 작물</div>
            </div>
            <div style={{ margin: 'auto 1.5rem 1rem' }}>
                <div className="">
                    <Swiper
                        watchSlidesProgress={true}
                        slidesPerView={3}
                        className="mySwiper mt-5"
                        navigation={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Navigation, Pagination]}
                    >
                        {crops.liveCrops &&
                            crops.liveCrops.map((crop, idx) => (
                                <SwiperSlide key={idx}>
                                    <MyCropUnit crop={crop} />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </div>
            <div
                className="mt-2 h-10 bg-[#C4DFAA] pl-3 leading-10 pt-px "
                style={{
                    fontSize: '0.9em',
                    width: '100%',
                }}
            >
                <div style={{ marginLeft: '1.5rem' }}>재배 완료 작물</div>
            </div>
            <div style={{ margin: 'auto 1.5rem 1rem' }}>
                <div className="">
                    <Swiper
                        watchSlidesProgress={true}
                        slidesPerView={3}
                        className="mySwiper mt-5"
                        navigation={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Navigation, Pagination]}
                    >
                        {crops.doneCrops &&
                            crops.doneCrops.map((crop, idx) => (
                                <SwiperSlide key={idx}>
                                    <MyCropUnit crop={crop} />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
}
