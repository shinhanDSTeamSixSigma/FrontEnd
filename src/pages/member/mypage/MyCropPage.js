import StyledHeader from '../../../components/StyledHeader';
import StyledBody from '../../../components/StyledBody';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../../styles/crop/mycrop.css';

import { Navigation, Pagination } from 'swiper/modules';

export default function MyCropPage() {
    return (
        <>
            <StyledHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-2xl font-black">
                            토심이네 농장
                        </span>
                        <span className="text-base ml-3">재배내역</span>
                    </div>
                </div>
                <div className="border mt-2 border-[#90C8AC]"></div>
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
                        <SwiperSlide>
                            <div className="flex justify-center">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        `/img/bagil.png`
                                    }
                                ></img>
                            </div>
                            <div className="mt-3">
                                <span>쑥쑥이</span>
                            </div>
                            <div className="text-sm">바질</div>
                            <div className="text-xs mt-2">
                                2024.01.01 ~ 재배중
                            </div>
                            <div className="text-xs ">(D+24)</div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex justify-center">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        `/img/bagil.png`
                                    }
                                ></img>
                            </div>
                            <div className="mt-3">
                                <span>쑥쑥이</span>
                            </div>
                            <div className="text-sm">바질</div>
                            <div className="text-xs mt-2">
                                2024.01.01 ~ 재배중
                            </div>
                            <div className="text-xs ">(D+24)</div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex justify-center">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        `/img/bagil.png`
                                    }
                                ></img>
                            </div>
                            <div className="mt-3">
                                <span>쑥쑥이</span>
                            </div>
                            <div className="text-sm">바질</div>
                            <div className="text-xs mt-2">
                                2024.01.01 ~ 재배중
                            </div>
                            <div className="text-xs ">(D+24)</div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex justify-center">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        `/img/bagil.png`
                                    }
                                ></img>
                            </div>
                            <div className="mt-3">
                                <span>쑥쑥이</span>
                            </div>
                            <div className="text-sm">바질</div>
                            <div className="text-xs mt-2">
                                2024.01.01 ~ 재배중
                            </div>
                            <div className="text-xs ">(D+24)</div>
                        </SwiperSlide>
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
                        <SwiperSlide>
                            <div className="flex justify-center">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        `/img/bagil.png`
                                    }
                                ></img>
                            </div>
                            <div className="mt-3">
                                <span>쑥쑥이</span>
                            </div>
                            <div className="text-sm">바질</div>
                            <div className="text-xs mt-2">
                                2024.01.01 ~ 재배중
                            </div>
                            <div className="text-xs ">(D+24)</div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex justify-center">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        `/img/bagil.png`
                                    }
                                ></img>
                            </div>
                            <div className="mt-3">
                                <span>쑥쑥이</span>
                            </div>
                            <div className="text-sm">바질</div>
                            <div className="text-xs mt-2">
                                2024.01.01 ~ 재배중
                            </div>
                            <div className="text-xs ">(D+24)</div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex justify-center">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        `/img/bagil.png`
                                    }
                                ></img>
                            </div>
                            <div className="mt-3">
                                <span>쑥쑥이</span>
                            </div>
                            <div className="text-sm">바질</div>
                            <div className="text-xs mt-2">
                                2024.01.01 ~ 재배중
                            </div>
                            <div className="text-xs ">(D+24)</div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex justify-center">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        `/img/bagil.png`
                                    }
                                ></img>
                            </div>
                            <div className="mt-3">
                                <span>쑥쑥이</span>
                            </div>
                            <div className="text-sm">바질</div>
                            <div className="text-xs mt-2">
                                2024.01.01 ~ 재배중
                            </div>
                            <div className="text-xs ">(D+24)</div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </StyledBody>
        </>
    );
}
