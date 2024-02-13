// import React, { createContext, useContext, useEffect, useState } from 'react';
// import fetchUserRole from './fetchUserRole'; // 사용자 역할을 가져오는 함수 import

// const UserContext = createContext();

// export const useUser = () => useContext(UserContext);

// export const UserProvider = ({ children }) => {
//     const [userRole, setUserRole] = useState('member'); // 사용자 역할 상태

//     useEffect(() => {
//         // 컴포넌트가 마운트될 때 한 번만 사용자 역할을 가져와 설정
//         const getUserRole = async () => {
//             const role = await fetchUserRole();
//             setUserRole(role);
//         };

//         getUserRole();
//     }, []);

//     return (
//         <UserContext.Provider value={{ userRole, setUserRole }}>
//             {children}
//         </UserContext.Provider>
//     );
// };
