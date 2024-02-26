import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
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
import NoFarm from '../../../components/member/NoFarm';

import { useNavigate } from 'react-router-dom';

const FlexRow = styled.div`
    // row로 붙여주는 느낌
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Container = styled.div`
    display: flex;
    align-itmes: center;
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

const baseUrl = process.env.REACT_APP_BASE_URL;

export default function MemberMyPagePage() {
    const [userInfo, setUserInfo] = useState({
        memberNo:'',
        memberId: '',
        memberName: '',
        phone: '',
        nickname: '비회원',
        address1: '',
        address2: '',
        memberPoint: '',
        zipcode: '',
        role: '',
    });

    useEffect(() => {
        // 서버에서 사용자 정보 가져오기
        fetchUserInfo();
    }, []);

    const fetchUserInfo = () => {
        axios
            .get(`${baseUrl}/user`, {
                withCredentials: true,
            })
            .then((res) => {
                setUserInfo(res.data);
                if (res.data.role !== 'FARMER') {
                    console.log(res.data.role);
                    alert('농부만 들어갈 수 있는 페이지 입니다!');
                    window.location.href = '/';
                }
                // 사용자 정보를 가져온 후 농작물 정보를 가져옴
                fetchCrops();
            })
            .catch((error) => {
                console.log('데이터 안옴!!!!!!');
                console.error(error);
            });
    };

    const [crops, setCrops] = useState([]);

    const fetchCrops = () => {
        axios
            .get(`${baseUrl}/crops`, {
                withCredentials: true,
            })
            .then((res) => {
                setCrops(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log('농작물 정보를 가져오는 데 실패했습니다.');
                console.error(error);
            });
    };

    // 포인트 페이지로 user 정보 보내기
    const navigate = useNavigate();

    const handleClick = (userInfo) => {
        navigate('/pay/detail', { state: { userInfo } });
    };

    return (
        <>
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
                                <div className="text-sm mr-[3px]">
                                    {userInfo.nickname}
                                </div>
                                <div className="text-sm">농부님</div>
                            </FlexRow>
                            <Step style={{ color: '#999999' }}>
                                {userInfo.memberId}
                            </Step>
                        </div>
                    </FlexRow>
                    <FlexRow>
                        <div className="text-sm mr-[3px]">내 포인트 : </div>
                        <div className="text-sm">{userInfo.memberPoint}</div>
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
                        onClick={() => handleClick(userInfo)}
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

                    <Link to={`/review/${userInfo.memberNo}`}>
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
                    </Link>
                    <Link to={`/inquiry/${userInfo.memberNo}`}>
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
                    </Link>

                    {/* <Box>
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
                    </Box> */}
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

                {crops.length !== 0 && <Nowing crops={crops}></Nowing>}
                <hr
                    style={{
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        color: '#90C8AC',
                    }}
                ></hr>

                {crops.length === 0 && <NoFarm></NoFarm>}
            </StyledBody>
        </>
    );
}
