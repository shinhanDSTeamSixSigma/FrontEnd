import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import Search from '../components/Search';

export default function Layout({ handleModalToggle, handleCloseModal }) {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달의 열림/닫힘 상태를 나타내는 상태

    function handleModalToggle() {
        setIsModalOpen(!isModalOpen); // 모달의 열림/닫힘 상태를 토글
    }

    function handleCloseModal() {
        setIsModalOpen(false); // 모달을 닫습니다.
    }
    return (
        <div>
            <Header handleModalToggle={handleModalToggle} />
            <Search
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseModal}
            />
            <Outlet />
            <Footer />
        </div>
    );
}
