import StyledHeader from '../StyledHeader';
import StyledBody from '../StyledBody';
import { getAllList, getPaging } from '../../api/farmApi';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button';
import useCustomMove from '../../hooks/useCustomMove';
import Paging from '../paging/Paging';

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totoalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0,
};
export default function MyFarmList() {
    // const [farm, setFarm] = useState(initState);

    const { page, size, moveToList, moveToRead } = useCustomMove();
    const navigate = useNavigate();

    // useEffect(() => {
    //     getAllList().then((data) => {
    //         console.log(data);
    //         setFarm(data);
    //     });
    // }, []);

    const [serverData, setServerData] = useState(initState);
    useEffect(() => {
        getPaging({ page, size }).then((data) => {
            console.log(data);
            setServerData(data);
        });
    }, [page, size]);

    const handleFarmItemClick = (farmNo) => {
        moveToRead(farmNo);
    };

    return (
        <>
            <StyledHeader>농장 목록 </StyledHeader>
            <StyledBody>
                <ul className="divide-y divide-gray-200">
                    {serverData.dtoList.map((key, idx) => (
                        <li key={key.farmNo} className="py-4 ">
                            <div className="font-extrabold text-2xl ">
                                {idx + 1}
                            </div>
                            <div
                                className="shadow-xl h-28  mt-2 mb-12 rounded-2xl flex cursor-pointer "
                                onClick={() => handleFarmItemClick(key.farmNo)}
                            >
                                <div className="mt-auto mb-auto ml-4 mr-4">
                                    <p className="text-sm">{key.farmName}</p>
                                    <p className="text-xs text-gray-500">
                                        {key.farmContent}
                                    </p>
                                </div>
                                <div className="ml-3 mt-auto mb-auto">
                                    <img
                                        src={
                                            process.env.PUBLIC_URL +
                                            `/img/farm1.png`
                                        }
                                    ></img>
                                </div>
                            </div>

                            {/* <div
                                onClick={() => handleFarmItemClick(key.farmNo)}
                                style={{ cursor: 'pointer' }}
                                
                                className="w-full flex"
                            >
                            
                            </div> */}
                        </li>
                    ))}
                </ul>
            </StyledBody>
            <Paging serverData={serverData} movePage={moveToList} />
        </>
    );
}
