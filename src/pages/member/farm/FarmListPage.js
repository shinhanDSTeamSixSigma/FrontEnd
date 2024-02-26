import { Link } from 'react-router-dom';
import FarmTypeAlignList from '../../../components/farm/FarmTypeAlign';
import MyFarmList from '../../../components/farm/MyFarmList';

export default function FarmPage() {
    return (
        <>
            <div className="divide-y divide-gray-200">
                <MyFarmList numberOfItems={10} />
            </div>
        </>
    );
}
