import React, { useState, useEffect } from 'react';
import Button from '../Button';
import { useNavigate, useParams } from 'react-router-dom';
import { getOne, getFarmCropAll } from '../../api/farmApi';
import { prefix } from '../../api/farmApi';

const url = `${prefix}`;
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
            {myFarm && <div>농장이름 - {myFarm.farmName}</div>}
            {myCrop && <div>작물 - {myCrop.cropName}</div>}

            {myCrop && (
                <div>
                    <img src={`${url}/${myCrop.image}`} />
                </div>
            )}
            {/* 메뉴 목록 */}
            <div className="menuList">
                <div className="text-2xl mt-4 mb-3">구매옵션</div>
                {/* 여기에 메뉴 목록을 표시하는 코드 추가 */}
                <div className="menu border-2 mb-1">
                    <input
                        type="checkbox"
                        id="menu1"
                        onChange={(event) =>
                            handleCheckboxChange(event, 1, '1평', 50000)
                        }
                    />
                    <label htmlFor="menu1">1평 - 50,000원</label>
                </div>
                <div className="menu border-2">
                    <input
                        type="checkbox"
                        id="menu2"
                        onChange={(event) =>
                            handleCheckboxChange(event, 2, '비료', 10000)
                        }
                    />
                    <label htmlFor="menu2">비료 - 5,000원</label>
                </div>
            </div>

            {/* 장바구니 내용 표시 */}
            <div id="rightmenus">
                <div className="text-2xl mt-4 mb-3">장바구니</div>
                {cartItems.map((item) => (
                    <div
                        key={item.name}
                        className="rightmenu border-2 mb-2"
                        data-menu-name={item.name}
                    >
                        <input type="hidden" value={item.menuUrl} />
                        <div>{item.name}</div>
                        <div className="">
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
                            <span>{item.price * item.quantity}원</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 총 금액 표시 */}
            <div className="flex justify-end  bottom-10">
                <div className="sumAmount text-right mr-4">
                    총 금액: {totalPrice}원
                </div>
                <div>
                    <Button
                        name={'결제하기'}
                        widthHeight={'w-20'}
                        onClick={() => handlePayment()}
                    />
                    <button
                        onClick={handlePayment}
                        className="w-20 bg-[#80BCBD] block rounded-md "
                    >
                        결제하기
                    </button>
                </div>
            </div>
        </div>
    );
}
