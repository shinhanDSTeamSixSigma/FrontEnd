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

    const { page, size, moveToList } = useCustomMove();

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

    return (
        <>
            <StyledHeader>내 농장 목록 </StyledHeader>
            <StyledBody>
                <ul className="divide-y divide-gray-200">
                    {serverData.dtoList.map((key, idx) => (
                        <li key={key.farmNo} className="py-4 ">
                            <Link
                                to={`/farm/list/${key.farmNo}`}
                                className="w-full flex"
                            >
                                {/* <img
                                className="h-10 w-10 rounded-full"
                                src={farm[key['img']]}
                                alt="일단 비우기"
                            /> */}
                                <div className="font-extrabold text-2xl ">
                                    {idx + 1}
                                </div>
                                <div className="ml-5">
                                    <p className="text-xl font-medium text-gray-900">
                                        {key.farmName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {key.farmContent}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </StyledBody>
            <Paging serverData={serverData} movePage={moveToList} />
        </>
    );
}
