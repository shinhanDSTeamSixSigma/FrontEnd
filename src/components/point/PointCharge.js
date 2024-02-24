import { LiaCcVisa } from 'react-icons/lia';
import { RiKakaoTalkFill } from 'react-icons/ri';
import styled from 'styled-components';
import TitleDetailName from '../point/TitleDetailName';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem;
    font-size: 0.9rem;
    align-items: center;
`;
const FlexCol = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
`;
const ContentMargin = styled.div`
    margin: 1rem 0.2rem 2rem;
`;
const ButtonCss = styled.div`
    width: 4rem;
    height: 2.4rem;
    font-size: 0.9em;
    margin: auto 0.5rem 0.5rem;
    align-items: center;
`;

const PointCharge = ({
    selectedAmount,
    selectedPaymentOption,
    handleAmountClick,
    handlePaymentOptionClick,
}) => {
    const icon = {
        fontSize: '2rem',
        marginRight: '1rem',
    };

    return (
        <>
            {/*포인트 충전 금액 설정*/}
            <div style={{ marginTop: '2rem' }}></div>
            <TitleDetailName name="충전 금액" />
            <ContentMargin>
                <ButtonCss
                    type="button"
                    className={`btn btn-outline-secondary ${
                        selectedAmount === '10000' ? 'active' : ''
                    }`}
                    onClick={() => handleAmountClick('10000')}
                >
                    1만원
                </ButtonCss>
                <ButtonCss
                    type="button"
                    className={`btn btn-outline-secondary ${
                        selectedAmount === '30000' ? 'active' : ''
                    }`}
                    onClick={() => handleAmountClick('30000')}
                >
                    3만원
                </ButtonCss>
                <ButtonCss
                    type="button"
                    className={`btn btn-outline-secondary ${
                        selectedAmount === '50000' ? 'active' : ''
                    }`}
                    onClick={() => handleAmountClick('50000')}
                >
                    5만원
                </ButtonCss>
                <ButtonCss
                    type="button"
                    className={`btn btn-outline-secondary ${
                        selectedAmount === '70000' ? 'active' : ''
                    }`}
                    onClick={() => handleAmountClick('70000')}
                >
                    7만원
                </ButtonCss>
                <ButtonCss
                    type="button"
                    className={`btn btn-outline-secondary ${
                        selectedAmount === '100000' ? 'active' : ''
                    }`}
                    onClick={() => handleAmountClick('100000')}
                >
                    10만원
                </ButtonCss>
                <ButtonCss
                    type="button"
                    className={`btn btn-outline-secondary ${
                        selectedAmount === '500000' ? 'active' : ''
                    }`}
                    onClick={() => handleAmountClick('500000')}
                >
                    50만원
                </ButtonCss>
            </ContentMargin>
            {/*포인트 결제 방식 설정*/}
            <TitleDetailName name="결제 수단" />
            <FlexCol>
                <label className="has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 ..">
                    <FlexRow>
                        <LiaCcVisa style={icon} />
                        신용카드
                        <input
                            type="radio"
                            name="payment-option"
                            className="checked:border-indigo-500 ..."
                            style={{ marginLeft: 'auto' }}
                            onClick={() =>
                                handlePaymentOptionClick(
                                    'html5_inicis.INIBillTst',
                                )
                            }
                        />
                    </FlexRow>
                </label>
                <label className="has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 ..">
                    <FlexRow>
                        <RiKakaoTalkFill style={icon} />
                        카카오페이
                        <input
                            type="radio"
                            name="payment-option"
                            className="checked:border-indigo-500 ..."
                            style={{ marginLeft: 'auto' }}
                            onClick={() => handlePaymentOptionClick('kakaopay')}
                        />
                    </FlexRow>
                </label>
            </FlexCol>
        </>
    );
};
export default PointCharge;
