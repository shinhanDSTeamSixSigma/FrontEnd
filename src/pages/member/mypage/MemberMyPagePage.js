import styled from 'styled-components';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoIosLogOut } from 'react-icons/io';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { IoHomeOutline } from 'react-icons/io5';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { LiaCommentDotsSolid } from 'react-icons/lia';
import { PiNotePencilLight } from 'react-icons/pi';
import Growing from '../../../components/member/Growing';
import Nowing from '../../../components/member/Nowing';
import StyledBody from '../../../components/StyledBody';
import StyledHeader from '../../../components/StyledHeader';
import NoFarm from '../../../components/member/NoFarm';

const FlexRow = styled.div`
    // row로 붙여주는 느낌
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Container = styled.div`
  display: flex;
  align-itmes = center;
`;

const Box = styled.div`
    width: 4rem;
    height: 4rem;
    background-color: #f5f0bb;
    margin: auto 0.3rem auto;
    border-radius: 0.8rem; //모서리 둥글게
    align-contents: center;
    display: flex;
    flex-direction: column;
`;
const Step = styled.div`
    font-size: 0.6rem;
`;

const Fontsize = styled.div`
    font-size: '1rem';
`;

const boxStyle = {
    fontSize: '2rem',
    margin: 'auto',
};
export default function MemberMyPagePage() {
    return (
        <>
            <span className="text-2xl font-black ml-5">마이페이지</span>

            <StyledBody>
                <FlexRow
                    style={{
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                    }}
                >
                    <FlexRow>
                        <img
                            className="pointWallet"
                            alt="profile"
                            src={
                                process.env.PUBLIC_URL +
                                '/img/memberMypage/profile.png'
                            }
                        />
                        <div>
                            <FlexRow>
                                <div className="text-sm mr-[3px]">토심이</div>
                                <div className="text-sm">농부님</div>
                            </FlexRow>
                            <Step style={{ color: '#999999' }}>sk5046</Step>
                        </div>
                    </FlexRow>
                    <FlexRow>
                        <div className="text-sm mr-[3px]">내 포인트 : </div>
                        <div className="text-sm">10,000</div>
                    </FlexRow>
                    <IoSettingsOutline />
                </FlexRow>

                <div
                    style={{
                        width: '100%',
                        height: '2rem',
                        backgroundColor: '#D5F0C1',
                        borderRadius: '0.8rem',
                        display: 'flex',
                        alignContent: 'center',
                    }}
                >
                    <FlexRow
                        style={{
                            justifyContent: 'space-between',

                            marginLeft: '1rem',
                        }}
                    >
                        <FlexRow>
                            <div>
                                <IoIosLogOut color="#73A9AD" />
                            </div>
                            <span className="text-xs">내 포인트 확인/충전</span>
                        </FlexRow>
                        <IoChevronForwardOutline color="#C4C4C4" />
                    </FlexRow>
                </div>

                <hr
                    style={{
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        color: '#90C8AC',
                    }}
                ></hr>

                <FlexRow style={{ justifyContent: 'space-evenly' }}>
                    <Box>
                        <IoHomeOutline style={boxStyle} color="#73A9AD" />
                        <Step
                            style={{
                                justifyContent: 'center',
                                display: 'flex',
                            }}
                            className="text-xs"
                        >
                            재배 내역
                        </Step>
                    </Box>

                    <Box>
                        <LiaCommentDotsSolid style={boxStyle} color="#73A9AD" />
                        <Step
                            style={{
                                justifyContent: 'center',
                                display: 'flex',
                            }}
                            className="text-xs"
                        >
                            리뷰 관리
                        </Step>
                    </Box>
                    <Box>
                        <RiQuestionnaireLine style={boxStyle} color="#73A9AD" />
                        <Step
                            style={{
                                justifyContent: 'center',
                                display: 'flex',
                            }}
                            className="text-xs"
                        >
                            문의 관리
                        </Step>
                    </Box>
                    <Box>
                        <PiNotePencilLight style={boxStyle} color="#73A9AD" />
                        <Step
                            style={{
                                justifyContent: 'center',
                                display: 'flex',
                            }}
                            className="text-xs"
                        >
                            문의 관리
                        </Step>
                    </Box>
                </FlexRow>
                <hr
                    style={{
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        color: '#90C8AC',
                    }}
                ></hr>

                <Growing></Growing>

                <hr
                    style={{
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        color: '#90C8AC',
                    }}
                ></hr>

                <Nowing></Nowing>

                <hr
                    style={{
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        color: '#90C8AC',
                    }}
                ></hr>

                <NoFarm></NoFarm>
            </StyledBody>
        </>
    );
}
