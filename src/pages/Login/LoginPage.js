import React, { useState } from 'react';
import axios from 'axios';
import StyledHeader from '../../components/StyledHeader';
import StyledBody from '../../components/StyledBody';

import { Link } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_BASE_URL;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(
                `${baseUrl}/login?email=${email}&password=${password}`,
            );

            console.log('Authentication successful:', response);
            // 인증 성공 시 다음 작업 수행
            const token = response.data.token;
            console.log(token);

            document.cookie = 'auth=' + token + ';' + 'path=/';

            window.location.href = '/'; // Redirect 방식
        } catch (error) {
            console.error('Authentication failed:', error);
            setError('아이디 혹은 비밀번호가 일치하지 않습니다');
        }
    };

    return (
        <>
            <div className="login-container">
                {error && <div className="error-message">{error}</div>}

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

                    <form onSubmit={handleSubmit}>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md mb-4">
                            <label className="block w-full text-sm font-medium leading-6 text-gray-900 ">
                                아이디(이메일):
                                <input
                                    type="email"
                                    value={email}
                                    placeholder="이메일을 입력하세요"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field"
                                />
                            </label>
                        </div>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md mb-4">
                            <label className="block w-full text-sm font-medium leading-6 text-gray-900">
                                비밀번호:
                                <input
                                    type="password"
                                    value={password}
                                    placeholder="비밀번호를 입력하세요"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="input-field"
                                />
                            </label>
                        </div>
                        <button type="submit" className="submit-button">
                            로그인
                        </button>
                        <div
                            style={{
                                justifyContent: 'center',
                                display: 'flex',
                                paddingTop: '1rem',
                                fontSize: '1rem',
                            }}
                        >
                            <Link to="/signup">회원가입</Link>
                        </div>
                    </form>
                </StyledBody>
            </div>

            <style>
                {`
                .login-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 50px;
                }
                
                .login-form {
                    width: 300px;
                    padding: 20px;
                    background-color: #f2f2f2;
                    border-radius: 5px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
                
                .form-group {
                    margin-bottom: 20px;
                }
                
                .form-label {
                    display: block;
                    margin-bottom: 5px;
                }
                
                .input-field {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                
                .submit-button {
                    width: 100%;
                    padding: 10px;
                    margin-top: 1rem;
                    background-color: #90C8AC;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                
                .submit-button:hover {
                    background-color: #45a049;
                }
                
                .error-message {
                    color: red;
                    margin-top: 10px;
                }
                
                `}
            </style>
        </>
    );
};

export default LoginPage;
