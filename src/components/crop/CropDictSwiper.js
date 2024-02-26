import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function CropDictUnit(/*cropDict, onClick*/ props) {
    return (
        <section
            className="rounded-circle w-25 h-25"
            // onClick={props.onClickEvent(props.cropDict.cropNo)}
        >
            <img
                src={`http://localhost:8090/img${props.cropDict.image}`}
                className="rounded-circle w-25 h-25"
            ></img>
            <p>{props.cropDict.cropName}</p>
        </section>
    );
}

export default function CropDictSwiper({ onClickEvent }) {
    const [cropDicts, setCropDicts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8090/main/cropDictList',
                    {
                        withCredentials: true,
                    },
                );
                setCropDicts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching crop list:', error);
            }
        };

        fetchData(); // 데이터 가져오기 함수 호출
    }, []);
    return (
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
            {cropDicts &&
                cropDicts.map((dict, idx) => (
                    <SwiperSlide>
                        <CropDictUnit
                            cropDict={dict}
                            onClickEvent={onClickEvent}
                        />
                    </SwiperSlide>
                ))}
        </Swiper>
    );
}
