import React, { useState, useEffect } from 'react';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

export function FarmPay({ setTotalAmount }) {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        updateTotalPrice();
    }, [cartItems]);

    const updateTotalPrice = () => {
        let sum = 0;
        cartItems.forEach((item) => {
            sum += item.price * item.quantity;
        });
        setTotalPrice(sum);
    };

    const handleCheckboxChange = (event, name, price) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setCartItems((prevItems) => [
                ...prevItems,
                { name, price, quantity: 1 },
            ]);
        } else {
            setCartItems((prevItems) =>
                prevItems.filter((item) => item.name !== name),
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
        navigate(`/pay`, { state: { totalPrice, cartItems } }); // 페이지 이동 및 상태 전달
    };
    return (
        <div>
            {/* 메뉴 목록 */}
            <div className="menuList">
                <div className="text-2xl mt-4 mb-3">구매옵션</div>
                {/* 여기에 메뉴 목록을 표시하는 코드 추가 */}
                <div className="menu border-2 mb-1">
                    <input
                        type="checkbox"
                        id="menu1"
                        onChange={(event) =>
                            handleCheckboxChange(event, '농장 평단가', 50000)
                        }
                    />
                    <label htmlFor="menu1">농장 평단가 - 50,000원</label>
                </div>
                <div className="menu border-2">
                    <input
                        type="checkbox"
                        id="menu2"
                        onChange={(event) =>
                            handleCheckboxChange(event, '비료', 10000)
                        }
                    />
                    <label htmlFor="menu2">비료 - 10,000원</label>
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
