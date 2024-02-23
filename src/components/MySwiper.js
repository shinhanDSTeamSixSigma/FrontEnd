import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../styles/swiper.css';

import {
    Autoplay,
    Navigation,
    EffectCoverflow,
    Pagination,
} from 'swiper/modules';

export default function MySwiper() {
    return (
        <>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 70,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Navigation, EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img
                        src={process.env.PUBLIC_URL + `/img/farmImage6.png`}
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={process.env.PUBLIC_URL + `/img/farmImage1.png`}
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={process.env.PUBLIC_URL + `/img/farmImage2.png`}
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={process.env.PUBLIC_URL + `/img/farmImage3.png`}
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={process.env.PUBLIC_URL + `/img/farmImage7.png`}
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={process.env.PUBLIC_URL + `/img/farmImage8.png`}
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={process.env.PUBLIC_URL + `/img/farmImage9.png`}
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={process.env.PUBLIC_URL + `/img/farmImage10.png`}
                        alt=""
                    />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
