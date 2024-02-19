import styled from 'styled-components';
import StyledHeader from '../../components/StyledHeader';
import StyledBody from '../../components/StyledBody';
import React, { useState } from 'react';

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
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                이메일
                                <input
                                    type="email"
                                    value={memberId}
                                    onChange={(e) =>
                                        setMemberId(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                비밀번호
                                <input
                                    type="password"
                                    value={memberPwd}
                                    onChange={(e) =>
                                        setMemberPwd(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                이름
                                <input
                                    type="text"
                                    value={memberName}
                                    onChange={(e) =>
                                        setMemberName(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                번호
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                닉네임
                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) =>
                                        setNickname(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                주소 1
                                <input
                                    type="text"
                                    value={address1}
                                    onChange={(e) =>
                                        setAddress1(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                주소 2
                                <input
                                    type="text"
                                    value={address2}
                                    onChange={(e) =>
                                        setAddress2(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                프로필
                                <input
                                    type="text"
                                    value={zipcode}
                                    onChange={(e) => setZipcode(e.target.value)}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                농부이신가요?
                                <input
                                    type="checkbox"
                                    checked={farmer}
                                    onChange={(e) =>
                                        setFarmer(e.target.checked)
                                    }
                                />
                            </label>
                        </div>
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
