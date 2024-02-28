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
        handleModalClose();
    };

    const handleModalClose = () => {
        setSearchTerm(''); // 모달이 닫힐 때 searchTerm 초기화
        handleCloseModal();
    };

    const [imagePaths, setImagePaths] = useState({});

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
                            value={searchTerm}
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
                            <h2
                                style={{
                                    paddingTop: '2rem',
                                    fontStyle: 'bold',
                                }}
                            >
                                검색 결과
                            </h2>
                            <div>
                                {searchResult.map((farm) => (
                                    <div
                                        key={farm.farmNo}
                                        className="shadow-xl h-28   mt-2 mb-1 rounded-2xl flex cursor-pointer justify-between"
                                        onClick={() =>
                                            handleFarmItemClick(farm.farmNo)
                                        }
                                    >
                                        <div className="mt-auto mb-auto ml-5 ">
                                            <div className="text-[1.1rem] font-semibold mt-1">
                                                {farm.farmName}
                                            </div>
                                            <div className="flex text-[0.7rem] mb-1">
                                                <div className="text-[0.7rem] font-semibold flex justify-center items-center">
                                                    <img
                                                        src={`${process.env.PUBLIC_URL}/img/star.png`}
                                                        alt=""
                                                        className="mr-1 w-4 h-4"
                                                    />
                                                    <span>
                                                        {farm.farmRating.toFixed(
                                                            1,
                                                        )}
                                                    </span>
                                                    <span className="text-[0.7rem] ml-1">
                                                        ({farm.reviewCnt})
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="ml-1">
                                                        | 경력 {farm.farmCareer}
                                                        년
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="ml-1">
                                                        |{' '}
                                                        {farm.farmAddress.replace(
                                                            / .*/,
                                                            '',
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {farm.farmContent}
                                            </p>
                                        </div>
                                        <div className=" rounded-2xl w-20 h-20 flex justify-center items-center mr-3">
                                            {/* {imagePaths &&
                                                imagePaths[farm.farmNo] && (
                                                    <img
                                                        key={0}
                                                        src={`${
                                                            process.env
                                                                .PUBLIC_URL
                                                        }/${
                                                            imagePaths[
                                                                farm.farmNo
                                                            ][0]
                                                        }`}
                                                        alt={`image ${0}`}
                                                        className="h-full rounded-2xl shadow-xl mt-[2rem] "
                                                    />
                                                )} */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </StyledHeader>
            )}
        </>
    );
}
