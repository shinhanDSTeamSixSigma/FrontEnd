// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMemberNo } from '../../api/farmApi';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // 예시로, 로그인 상태 확인 및 사용자 정보 가져오는 로직
        // 이 부분은 실제 애플리케이션에 맞게 구현해야 합니다.
        const fetchUser = async () => {
            // 사용자 정보 가져오기 로직 (예: API 호출)
            const user = await getMemberNo().then((res) => {
                setCurrentUser(res.role);
            }); // getMemberNo는 사용자 정보를 가져오는 함수
            setCurrentUser(user);
        };

        fetchUser();
    }, []);
    useEffect(() => {
        console.log(currentUser);
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
