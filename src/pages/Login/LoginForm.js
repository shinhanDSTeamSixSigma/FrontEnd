import styled from 'styled-components';
import StyledHeader from '../../components/StyledHeader';
import StyledBody from '../../components/StyledBody';
import React, { useState } from 'react';

const FlexRow = styled.div`
    // row로 붙여주는 느낌
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const RegisterForm = ({ onSubmit }) => {
    const [memberId, setMemberId] = useState('');
    const [memberPwd, setMemberPwd] = useState('');
    const [memberName, setMemberName] = useState('');
    const [phone, setPhone] = useState('');
    const [nickname, setNickname] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [memberPoint, setMemberPoint] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [farmer, setFarmer] = useState(false); // 농부 여부 체크

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            memberId,
            memberPwd,
            memberName,
            phone,
            nickname,
            address1,
            address2,
            memberPoint,
            zipcode,
            farmer,
        });
    };

    return (
        <>
            <StyledBody>
                <div
                    style={{
                        display: 'flex',
                        alignContent: 'center',
                        justifyContent: 'center',
                        paddingBottom: '3rem',
                    }}
                >
                    <img
                        className="greenwavelogo"
                        alt="greenwavelogo"
                        src={
                            process.env.PUBLIC_URL +
                            '/img/memberMypage/logo.png'
                        }
                    />
                </div>
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                    <form onSubmit={handleSubmit}>
                        {/* 이메일 입력란 */}
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md mb-4">
                            <label className="block w-full text-sm font-medium leading-6 text-gray-900 ">
                                이메일
                                <input
                                    type="email"
                                    value={memberId}
                                    placeholder="이메일을 입력하세요"
                                    className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    onChange={(e) =>
                                        setMemberId(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        {/* 비밀번호 입력란 */}
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md mb-4">
                            <label className="block w-full text-sm font-medium leading-6 text-gray-900">
                                비밀번호
                                <input
                                    type="password"
                                    value={memberPwd}
                                    placeholder="비밀번호를 입력하세요"
                                    className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    onChange={(e) =>
                                        setMemberPwd(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        {/* 이름 입력란 */}
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md mb-4">
                            <label className="block w-full text-sm font-medium leading-6 text-gray-900">
                                이름
                                <input
                                    type="text"
                                    value={memberName}
                                    placeholder="이름을 입력하세요"
                                    className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    onChange={(e) =>
                                        setMemberName(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        {/* 번호 입력란 */}
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md mb-4">
                            <label className="block w-full text-sm font-medium leading-6 text-gray-900">
                                번호
                                <input
                                    type="text"
                                    value={phone}
                                    placeholder="번호를 입력하세요"
                                    className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </label>
                        </div>
                        {/* 닉네임 입력란 */}
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md mb-4">
                            <label className="block w-full text-sm font-medium leading-6 text-gray-900">
                                닉네임
                                <input
                                    type="text"
                                    value={nickname}
                                    placeholder="닉네임을 입력하세요"
                                    className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    onChange={(e) =>
                                        setNickname(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        {/* 주소 1 입력란 */}
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md mb-4">
                            <label className="block w-full text-sm font-medium leading-6 text-gray-900">
                                주소 1
                                <input
                                    type="text"
                                    value={address1}
                                    placeholder="주소를 입력하세요"
                                    className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    onChange={(e) =>
                                        setAddress1(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        {/* 주소 2 입력란 */}
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md mb-4">
                            <label className="block w-full text-sm font-medium leading-6 text-gray-900">
                                주소 2
                                <input
                                    type="text"
                                    value={address2}
                                    placeholder="상세 주소를 입력하세요"
                                    className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    onChange={(e) =>
                                        setAddress2(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        {/* 프로필 입력란 */}
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md mb-4">
                            <label className="block w-full text-sm font-medium leading-6 text-gray-900">
                                프로필
                                <input
                                    type="text"
                                    value={zipcode}
                                    placeholder="프로필을 입력하세요"
                                    className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    onChange={(e) => setZipcode(e.target.value)}
                                />
                            </label>
                        </div>
                        {/* 농부 여부 확인란 */}

                        <div className="flex items-center">
                            <label className="block w-full text-sm font-medium leading-6 text-gray-900">
                                농부이신가요?
                                <input
                                    type="checkbox"
                                    checked={farmer}
                                    onChange={(e) =>
                                        setFarmer(e.target.checked)
                                    }
                                    style={{
                                        verticalAlign: 'middle', // 체크박스 수직 정렬
                                        appearance: 'none', // 기본 체크박스 스타일 숨김
                                        width: '1.2em', // 체크박스 크기 조정
                                        height: '1.2em', // 체크박스 크기 조정
                                        border: '2px solid #90C8AC', // 체크박스 테두리 스타일
                                        borderRadius: '4px', // 체크박스 테두리 둥글게 처리
                                        backgroundColor: farmer
                                            ? '#90C8AC'
                                            : 'transparent', // 체크 여부에 따른 배경색 지정
                                    }}
                                />
                            </label>
                        </div>
                        {/* 제출 버튼 */}
                        <div>
                            <button type="submit">회원가입</button>
                        </div>
                    </form>
                </div>
            </StyledBody>
            <style>
                {`
                    
                    .StyledBody {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        
                        font-size: 1rem; 
                        min-height: 100vh; 
                        background-color: #B7F0B1; 
                    }
                    
                    form {
                        width: 400px; 
                        padding: 20px;
                        background-color: #ffffff; 
                        border-radius: 10px; 
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
                    }
                    
                    form div {
                        margin-bottom: 10px;
                    }
                    
                    label {
                        display: block;
                        margin-bottom: 5px;
                    }
                    
                    input[type="text"],
                    input[type="password"],
                    input[type="email"] {
                        width: 100%;
                        padding: 8px;
                        border: 1px solid #ccc;
                        border-radius: 15px;
                    }
                    
                    input[type="checkbox"] {
                        margin-left: 5px;
                        width: 1rem;
                        height : 1rem;
                    }
                    
                    button[type="submit"] {
                        width: 100%;
                        padding: 10px;
                        background-color: #90C8AC; /* 녹색 배경 */
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                    }
                    
                    button[type="submit"]:hover {
                        background-color: #45a049; /* 녹색 배경 (더 짙은 색상) */
                    }
                `}
            </style>
        </>
    );
};

export default RegisterForm;
