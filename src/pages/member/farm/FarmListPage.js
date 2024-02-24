import { Link } from 'react-router-dom';
import FarmTypeAlignList from '../../../components/farm/FarmTypeAlign';
import MyFarmList from '../../../components/farm/MyFarmList';

export default function FarmPage() {
    return (
        <>
            {/* 카테고리별 가로 정렬 
            <FarmTypeAlignList></FarmTypeAlignList>*/}
            {/* ㅁㅁ순 정렬*/}

            {/* 리스트 
            <ul className="">
                {farms.map((farm) => (
                    <li key={farm.farm_no} className="py-4 w-100% ml-5 mr-5">
                        <FarmObject farm={farm} />
                    </li>
                ))}
            </ul>*/}
            <ul className="divide-y divide-gray-200">
                <MyFarmList />
            </ul>
        </>
    );
}
