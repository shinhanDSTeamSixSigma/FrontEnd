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
    function FarmObject(props) {
        return (
            <div className="d-flex shadow border rounded w-full">
                <div className="ml-3">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {props.farm.farmName}
                        </h2>
                    </div>
                    <div className="d-flex bd-highlight mt-1">
                        {/*<p className="text-sm text-gray-500">
                            {props.farm.farm_rating}
        </p>*/}
                        <p className="text-lg">⭐</p>
                        <p className="mt-1 font-bold">
                            {props.farm.farmRating}
                        </p>{' '}
                        <p className="mt-2 ml-1 text-sm">
                            ({props.farm.farmOrderNum})
                        </p>
                        <p className="ml-2 mr-2 mt-1 text-sm">|</p>
                        <p className="mt-1 text-sm">
                            경력 {props.farm.farmCareer}년
                        </p>
                        <p className="ml-2 mr-2 mt-1 text-sm">|</p>
                        <p className="mt-1 text-sm">{props.farm.farmAddress}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mt-3">
                            {props.farm.farmContent}
                        </p>
                    </div>
                </div>
                <img
                    className="w-25 h-25 rounded flex-shrink-1 bd-highlight ms-auto shadows mt-2 mb-2 mr-2 ml-2"
                    src={props.farm.image}
                    alt=""
                />
            </div>
        );
    }
    return (
        <>
            <StyledHeader>농장 목록 </StyledHeader>
            <StyledBody>
                <ul className="divide-y divide-gray-200">
                    {serverData.dtoList.map((key, idx) => (
                        <li key={key.farmNo} className="py-4 ">
                            <div
                                onClick={() => handleFarmItemClick(key.farmNo)}
                                style={{ cursor: 'pointer' }}
                                // to={moveToRead(key.farmNo)}
                                // to={`/farm/read/${key.farmNo}`}
                                className="w-full flex"
                            >
                                {/* <img
                                className="h-10 w-10 rounded-full"
                                src={farm[key['img']]}
                                alt="일단 비우기"
                            /> */}
                                {/*<div className="font-extrabold text-2xl ">
                                    {idx + 1}
                        </div>
                                <div className="ml-5">
                                    <p className="text-xl font-medium text-gray-900">
                                        {key.farmName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {key.farmContent}
                                    </p>
                                </div>*/}
                                <FarmObject farm={key} />
                            </div>
                        </li>
                    ))}
                </ul>
            </StyledBody>
            <Paging serverData={serverData} movePage={moveToList} />
        </>
    );
}
