import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getMemberNo } from '../../../../api/farmApi';
import Button from '../../../../components/Button';
import StyledBody from '../../../../components/StyledBody';
import StyledHeader from '../../../../components/StyledHeader';
import TitleDivisionLine from '../../../../components/TitleDivisionLine';

const baseUrl = process.env.REACT_APP_BASE_URL;

const calculateDaysSince = (startDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const daysDiff = Math.round((currentDate - new Date(startDate)) / oneDay);
    return daysDiff;
};
export default function CropStreamingPage({}) {
    const location = useLocation();
    const crop = location.state.crop;
    const cropNickname = location.state.cropNickname;
    const buyDate = location.state.buyDate;

    let cropNicknameData = '';
    let cropBuyDate = '';
    if (crop != null) {
        cropNicknameData = crop.cropNickname;
        cropBuyDate = crop.buyDate;
    } else {
        cropNicknameData = cropNickname;
        cropBuyDate = buyDate;
    }
    console.log(crop);

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
                <div className="h-72 border">스트리밍 영상</div>
                <div className="flex justify-evenly mt-8 ">
                    <div className=" text-center flex items-center">
                        <img
                            src={process.env.PUBLIC_URL + `/img/Ellipse1.png`}
                            alt=""
                        />
                        <span className="ml-2">24.9</span> °⁣C
                    </div>
                    <div className=" text-center flex items-center">
                        <img
                            src={process.env.PUBLIC_URL + `/img/Ellipse2.png`}
                            alt=""
                        />
                        <span className="ml-2">50</span>%
                    </div>
                    <div className=" text-center flex items-center">
                        <img
                            src={process.env.PUBLIC_URL + `/img/Ellipse3.png`}
                            alt=""
                        />
                        <span className="ml-2">25</span>lx
                    </div>
                </div>
                <section className="d-flex justify-content-center mt-8">
                    <Button
                        className="d-flex justify-content-center mt-8"
                        name={'캡쳐하기'}
                        widthHeight={'w-40 h-11'}
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
                    />
                </section>
            </StyledBody>
        </>
    );
}
