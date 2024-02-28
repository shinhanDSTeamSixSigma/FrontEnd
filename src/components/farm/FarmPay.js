import React, { useState, useEffect } from 'react';
import Button from '../Button';
import { useNavigate, useParams } from 'react-router-dom';
import { getOne, getFarmCropAll } from '../../api/farmApi';
import { prefix } from '../../api/farmApi';

import styled from 'styled-components';
import TitleDivisionLine from '../TitleDivisionLine';

const url = `${prefix}`;

const FlexRow = styled.div`
    // row로 붙여주는 느낌
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export function FarmPay() {
    // 장바구니(수량, 가격, 이름)
    const [cartItems, setCartItems] = useState([]);
    // 총가격
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    // farmNo(Pathvariable로 받음)
    const { farmNo } = useParams();
    // farmNo에 맞는 농장 데이터값 - 객체
    const [myFarm, setMyFarm] = useState();
    // farmNo에 맞는 농장의 대표작물의 데이터값 - 객체
    const [myCrop, setMyCrop] = useState();
    console.log(myCrop);

    useEffect(() => {
        updateTotalPrice();
    }, [cartItems]);

    // 농장 api
    useEffect(() => {
        getOne(farmNo).then((result) => {
            console.log(result);
            setMyFarm(result);
        });
    }, [farmNo]);

    // 농장 대표 작물 api
    useEffect(() => {
        getFarmCropAll(farmNo).then((result) => {
            console.log(result.getResult);
            setMyCrop(result.getResult);
        });
    }, [farmNo]);

    const updateTotalPrice = () => {
        let sum = 0;
        cartItems.forEach((item) => {
            sum += item.price * item.quantity;
        });
        setTotalPrice(sum);
    };

    // optionNumber - 번호로 나타내기
    const handleCheckboxChange = (event, optionNumber, name, price) => {
        const isChecked = event.target.checked;
        const item = { optionNumber, name, price, quantity: 1 }; // 선택한 옵션을 객체
        if (isChecked) {
            setCartItems((prevItems) => [...prevItems, item]);
        } else {
            setCartItems((prevItems) =>
                prevItems.filter((item) => item.optionNumber !== optionNumber),
            );
        }
    };

    const handleQuantityChange = (event, name) => {
        const quantity = parseInt(event.target.value);
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.name === name ? { ...item, quantity } : item,
            ),
        );
    };

    const handlePayment = () => {
        // 결제하기 버튼 클릭 시 실행되는 함수
        navigate(`/pay`, { state: { totalPrice, cartItems, myCrop, myFarm } }); // 페이지 이동 및 상태 전달
    };

    return (
        <div>
            {myFarm && (
                <div
                    style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        paddingBottom: '1rem',
                        fontSize: '1.2rem',
                    }}
                >
                    {myFarm.farmName}
                </div>
            )}

            <TitleDivisionLine></TitleDivisionLine>

            {/*myCrop && <div>{<img src={`${url}/${myCrop.image}`} />}</div>} */}

            {/* 여기부터 수정함 */}
            <FlexRow style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                <div>
                    <img
                        className="cropImage"
                        alt="crop"
                        src={
                            process.env.PUBLIC_URL +
                            '/img/memberMypage/NoFarm.png'
                        }
                        style={{ width: '130px', marginRight: '1rem' }} // 사진 크기 조정
                    />
                </div>
                {/* 
                <div className="menu border-2">
                    <input
                        type="checkbox"
                        id="menu2"
                        onChange={(event) =>
                            handleCheckboxChange(event, 2, '비료', 5000)
                        }
                    />
                    <label htmlFor="menu2">비료 - 5,000원</label> */}

                <div>
                    <FlexRow style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                        {myCrop && <div>작물 - {myCrop.cropName}</div>}
                    </FlexRow>
                    {/* 메뉴 목록 */}
                    <div className="menuList">
                        <div className="text-sm mt-2 mb-3">농장 평수</div>
                        {/* 여기에 메뉴 목록을 표시하는 코드 추가 */}
                        <div
                            className="menu border-2 mb-1 p-1"
                            style={{ borderRadius: '8px', fontSize: '0.9rem' }}
                        >
                            <input
                                type="checkbox"
                                id="menu1"
                                onChange={(event) =>
                                    handleCheckboxChange(event, 1, '1평', 50000)
                                }
                            />
                            <label
                                htmlFor="menu1"
                                style={{ marginLeft: '0.5rem' }}
                            >
                                1평 - 50,000원
                            </label>
                        </div>
                    </div>
                </div>
            </FlexRow>

            <TitleDivisionLine></TitleDivisionLine>

            {/* 장바구니 내용 표시 */}
            <div id="rightmenus">
                <div className="text-base font-bold mt-4 mb-3">장바구니</div>
                {cartItems.map((item) => (
                    <div
                        key={item.name}
                        className="rightmenu border-2 mb-2"
                        data-menu-name={item.name}
                        style={{ borderRadius: '1rem', padding: '1rem' }}
                    >
                        <input type="hidden" value={item.menuUrl} />
                        <div className="text-sm">{item.name}</div>
                        <div className="text-sm">
                            수량:{' '}
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(event) =>
                                    handleQuantityChange(event, item.name)
                                }
                            />
                        </div>
                        <div>
                            <span className="text-sm">
                                {item.price * item.quantity}원
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 총 금액 표시 */}
            <div className="flex justify-end text-base font-bold bottom-10">
                <div className="sumAmount text-right mt-1 mr-4">
                    총 금액: {totalPrice}원
                </div>
                <div>
                    <button
                        onClick={handlePayment}
                        className="w-20 bg-[#80BCBD] block rounded-md p-1 "
                        style={{ color: 'white' }}
                    >
                        결제하기
                    </button>
                </div>
            </div>
        </div>
    );
}
