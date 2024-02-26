import StyledHeader from '../../../components/StyledHeader';
import StyledBody from '../../../components/StyledBody';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../../styles/crop/mycrop.css';
import { Link } from 'react-router-dom';

import { Navigation, Pagination } from 'swiper/modules';

function MyCropUnit(crop) {
    return (
        <Link to={'/pay'}>
            <div className="flex justify-center">
                <img src={`http://localhost:8090/img${crop.crop.image}`}></img>
            </div>
            <div className="mt-1">
                <span>{crop.crop.cropNickname}</span>
            </div>
            <p className="text-sm">{crop.crop.cropName}</p>
            <p className="text-xs">{crop.crop.farmName}</p>
            <p className="text-xs mt-2">
                {crop.crop.buyDate} ~ {crop.crop.endDate}
            </p>
            <p className="text-xs ">(D+{crop.crop.dueDate})</p>
        </Link>
    );
}

export default function MyCropPage() {
    const [crops, setCrops] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8090/myCropsList',
                    {
                        withCredentials: true,
                    },
                    /*.get(`${baseUrl}/user`, {
                    })*/
                );
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
            <StyledHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-2xl font-black">
                            내 작물 리스트
                        </span>
                        <span className="text-base ml-3">재배내역</span>
                    </div>
                </div>
                <div className="border-1 mt-2 border-[#90C8AC]"></div>
            </StyledHeader>
            <StyledBody>
                <div className=" h-11 bg-[#C4DFAA] pl-3 leading-10 pt-px">
                    재배중인 작물
                </div>
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
                                <SwiperSlide>
                                    <MyCropUnit crop={crop} />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
                <div className="mt-2 h-11 bg-[#C4DFAA] pl-3 leading-10 pt-px ">
                    재배완료 작물
                </div>
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
                                <SwiperSlide>
                                    <MyCropUnit crop={crop} />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </StyledBody>
        </>
    );
}
