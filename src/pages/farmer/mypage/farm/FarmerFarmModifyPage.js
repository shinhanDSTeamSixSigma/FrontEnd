import { useParams } from 'react-router-dom';
import ModifyFarm from '../../../../components/farm/ModifyFarm';

export default function FarmerFarmModifyPage() {
    const { farmNo } = useParams();

    return (
        <>
            <ModifyFarm farmNo={farmNo} />
        </>
    );
}
