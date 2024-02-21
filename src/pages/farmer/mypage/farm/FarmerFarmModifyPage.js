import { useParams } from 'react-router-dom';
import ModifyFarm from '../../../../components/farm/ModifyFarm';

export default function FarmerFarmModifyPage() {
    const { farmNo } = useParams();

    return (
        <>
            <div className="p-4 w-full bg-white">수정</div>
            <ModifyFarm farmNo={farmNo} />
        </>
    );
}
