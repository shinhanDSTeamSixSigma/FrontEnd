import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getMemberNo } from '../../../../api/farmApi';
import Button from '../../../../components/Button';
import StyledBody from '../../../../components/StyledBody';
import StyledHeader from '../../../../components/StyledHeader';
import TitleDivisionLine from '../../../../components/TitleDivisionLine';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
var streamingaddr = '';

const calculateDaysSince = (startDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const daysDiff = Math.round((currentDate - new Date(startDate)) / oneDay);
    return daysDiff;
};

function streamingCaptureBtnOnclicked() {
    console.log('capture activate');
    let canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    document.body.appendChild(canvas);
    let context = canvas.getContext('2d');
    let captureBtn = document.getElementById('captureBtn');
    let streamingImg = document.getElementById('streamingImg');
    let hiidenbtn = document.getElementById('hiddenBtn');
    streamingImg.crossOrigin = 'Anonymous';
    try {
        context.drawImage(streamingImg, 0, 0);
        let dataURL = canvas.toDataURL('image/jpeg');
        hiidenbtn.href = dataURL;
        let d = new Date();
        hiidenbtn.download =
            d.getFullYear() +
            ('0' + (d.getMonth() + 1)).slice(-2) +
            ('0' + d.getDate()).slice(-2) +
            ('0' + d.getHours()).slice(-2) +
            ('0' + d.getMinutes()).slice(-2) +
            ('0' + d.getSeconds()).slice(-2) +
            '.jpg';
    } catch (e) {
        console.error(e);
        alert('캡쳐에 문제가 발생했습니다!');
    }
    canvas.parentNode.removeChild(canvas);
}

function waterSignal() {
    fetch(streamingaddr + ':82/water', { method: 'POST', body: 'WATER' })
        .then((response) => console.log('response:', response))
        .catch((error) => console.log('error:', error));
    alert('물 시그널 전송');
}

export default function CropStreamingPage({}) {
    const location = useLocation();
    const crop = location.state.crop;
    const cropNickname = location.state.cropNickname;
    const buyDate = location.state.buyDate;
    const [cropData, setCropData] = useState([]);
    let cropNicknameData = '';
    let cropBuyDate = '';
    let cropNo = 0;
    if (crop != null) {
        cropNicknameData = crop.cropNickname;
        cropBuyDate = crop.buyDate;
        streamingaddr = crop.streamingAddr;
        cropNo = crop.cropNo;
    } else {
        cropNicknameData = cropNickname;
        cropBuyDate = buyDate;
    }
    console.log(crop);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/mypage/streaming/${cropNo}`,
                    {
                        withCredentials: true,
                    },
                );
                setCropData(response.data); // API에서 받아온 작물 목록을 상태에 업데이트
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching crop list:', error);
            }
        };

        fetchData(); // 데이터 가져오기 함수 호출
    }, []);

    // const farmNo = crop.farmEntity.farmNo;
    // const navigate = useNavigate();

    // const handlePayment2 = () => {
    //     // 결제하기 버튼 클릭 시 실행되는 함수
    //     navigate(`/farm/pay/${farmNo}`, { state: crop }); // 페이지 이동 및 상태 전달
    // };

    // useEffect(() => {
    //     handlePayment2();
    // }, []);

    return (
        <>
            <StyledHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-2xl font-black">
                            {cropNicknameData}
                        </span>
                        는 지금?
                    </div>
                    <div className="text-sm pt-2">
                        함께한지 {calculateDaysSince(cropBuyDate)} 일째
                    </div>
                </div>
            </StyledHeader>
            <div className="border mt-2 border-[#90C8AC]"></div>
            <TitleDivisionLine />
            <div style={{ marginBottom: '5rem' }}></div>
            <StyledBody>
                <div
                    className="d-flex h-72"
                    style={{ justifyContent: 'center' }}
                >
                    <img
                        id="streamingImg"
                        src={streamingaddr + `:81/stream`}
                        alt="streaming"
                        crossOrigin="anonymous"
                        className="center"
                        width={'450rem'}
                    ></img>
                </div>
                <div className="flex justify-evenly mt-8 ">
                    <div
                        id="streaming_section"
                        className=" text-center flex items-center"
                    >
                        <img
                            src={process.env.PUBLIC_URL + `/img/Ellipse1.png`}
                            alt=""
                        />
                        <span className="ml-2">{cropData.thomer}</span> °⁣C
                    </div>
                    <div className=" text-center flex items-center">
                        <img
                            src={process.env.PUBLIC_URL + `/img/Ellipse2.png`}
                            alt=""
                        />
                        <span className="ml-2">{cropData.soilHumid}</span>%
                    </div>
                    <div className=" text-center flex items-center">
                        <img
                            src={process.env.PUBLIC_URL + `/img/Ellipse3.png`}
                            alt=""
                        />
                        <span className="ml-2">{cropData.lumen}</span>lx
                    </div>
                </div>
                <section className="d-flex justify-content-center mt-8">
                    <Button
                        id="captureBtn"
                        className="d-flex justify-content-center mt-8"
                        name={'캡쳐하기'}
                        widthHeight={'w-40 h-11'}
                        captureButtonEffect={() =>
                            streamingCaptureBtnOnclicked()
                        }
                    />
                    <div style={{ width: '2rem' }}></div>
                    {/* <Button
                        className="d-flex justify-content-center mt-8"
                        name={'영양제 주기'}
                        widthHeight={'w-40 h-11'}
                        //onClick={handlePayment2(farmNo)}
                    /> */}
                    <div style={{ width: '2rem' }}></div>
                    <Button
                        className="d-flex justify-content-center mt-8"
                        name={'물주기'}
                        widthHeight={'w-40 h-11'}
                        captureButtonEffect={() => waterSignal()}
                    />
                    <button id="hiddenBtn" width="0rem" height="0rem" />
                </section>
            </StyledBody>
        </>
    );
}
