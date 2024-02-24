
import { Link } from 'react-router-dom';
import FarmTypeAlignList from '../../../components/farm/FarmTypeAlign';
import MyFarmList from '../../../components/farm/MyFarmList';

export default function FarmPage() {
    return (
        <>
            <ul className="divide-y divide-gray-200">
                <MyFarmList />
            </ul>
        </>
    );
}
