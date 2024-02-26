import React, { useState, useEffect } from 'react';
import StyledHeader from './StyledHeader';
import Button from './Button';
import { searchFarm } from '../api/farmApi';
import { useNavigate } from 'react-router-dom';

export default function Search({ isModalOpen, handleCloseModal }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // react-router-dom의 useNavigate 훅 사용

    const handleSearch = async () => {
        try {
            console.log(searchTerm);
            const searchData = await searchFarm(searchTerm);
            setSearchResult(searchData);
            console.log('searchData', searchData);
        } catch (error) {
            setError(error);
            console.log(error);
        }
    };

    const handleFarmItemClick = (farmNo) => {
        // 농장 상세 페이지로 이동
        navigate(`/farm/read/${farmNo}`);
        // 모달 닫기
        handleCloseModal();
    };

    return (
        <>
            {isModalOpen && (
                <StyledHeader>
                    <div className="flex h-12 mt-5 ">
                        <input
                            type="search"
                            id="default-search"
                            className="block w-10/12 pl-4 pr-4 border-none text-sm rounded-lg bg-[#D9D9D9]  focus:outline-none dark:text-[#878787] ml-auto mr-3 "
                            placeholder="농장을 검색하세요..."
                            required
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                        />
                        <Button
                            widthHeight={'w-20 h-11'}
                            name={'검색'}
                            handlePayment={handleSearch}
                        />
                    </div>
                    {error && <p>Error: {error.message}</p>}
                    {Array.isArray(searchResult) && searchResult.length > 0 ? (
                        <div>
                            <h2 style={{ paddingTop: '2rem' }}>검색 결과:</h2>
                            <ul className="divide-y divide-gray-200">
                                {searchResult.map((result) => (
                                    <li key={result.farmNo} className="py-4 ">
                                        <div
                                            className="w-full flex"
                                            onClick={() =>
                                                handleFarmItemClick(
                                                    result.farmNo,
                                                )
                                            } // 농장 클릭 이벤트 추가
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="d-flex shadow border rounded w-full">
                                                <div className="ml-3">
                                                    <div>
                                                        <h2 className="text-xl font-bold text-gray-900">
                                                            {result.farmName}
                                                        </h2>
                                                    </div>
                                                    <div className="d-flex bd-highlight mt-1">
                                                        <p className="text-lg">
                                                            ⭐
                                                        </p>
                                                        <p className="mt-1 font-bold">
                                                            {result.farmRating}
                                                        </p>{' '}
                                                        <p className="mt-2 ml-1 text-sm">
                                                            (
                                                            {
                                                                result.farmOrderNum
                                                            }
                                                            )
                                                        </p>
                                                        <p className="ml-2 mr-2 mt-1 text-sm">
                                                            |
                                                        </p>
                                                        <p className="mt-1 text-sm">
                                                            경력{' '}
                                                            {result.farmCareer}
                                                            년
                                                        </p>
                                                        <p className="ml-2 mr-2 mt-1 text-sm">
                                                            |
                                                        </p>
                                                        <p className="mt-1 text-sm">
                                                            {result.farmAddress}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500 mt-3">
                                                            {result.farmContent}
                                                        </p>
                                                    </div>
                                                </div>
                                                <img
                                                    className="w-25 h-25 rounded flex-shrink-1 bd-highlight ms-auto shadows mt-2 mb-2 mr-2 ml-2"
                                                    src={result.image}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}
                </StyledHeader>
            )}
        </>
    );
}
