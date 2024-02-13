import React, { useState } from 'react';
import Header from '../layouts/Header';
import StyledHeader from './StyledHeader';
import Button from './Button';

export default function Search({ isModalOpen, handleCloseModal }) {
    return (
        <StyledHeader>
            {isModalOpen && (
                <div className="flex h-12 mt-5 ">
                    {/* <div className="flex justify-end">
                        <button className="bg-[#80BCBD] rounded-lg w-12 h-12 mr-2">
                            <span
                                className=" text-white close"
                                onClick={handleCloseModal}
                            >
                                &times;
                            </span>
                        </button>
                    </div> */}
                    <input
                        type="search"
                        id="default-search"
                        className="block w-10/12 pl-4 pr-4 border-none text-sm rounded-lg bg-[#D9D9D9]  focus:outline-none dark:text-[#878787] ml-auto mr-3 "
                        placeholder="농장을 검색하세요..."
                        required
                    />
                    <button
                        type="submit"
                        className="block w-16 text-white bg-[#80BCBD] hover:bg-[#80BCBD]-900  focus:outline-none  font-medium rounded-lg text-sm px-4 mr-auto"
                    >
                        검색
                    </button>
                </div>
            )}
        </StyledHeader>
    );
}
