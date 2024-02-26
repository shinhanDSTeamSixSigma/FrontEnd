import React, { useState, useEffect } from 'react';
import StyledHeader from './StyledHeader';
import Button from './Button';
import { searchFarm } from '../api/farmApi';

export default function Search({ isModalOpen, handleCloseModal }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            console.log(searchTerm);
            const searchData = await searchFarm(searchTerm);
            setSearchResult(searchData);
            console.log(searchData);
        } catch (error) {
            setError(error);
            console.log(error);
        }
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
                        </div>
                    ) : null}
                </StyledHeader>
            )}
        </>
    );
}
