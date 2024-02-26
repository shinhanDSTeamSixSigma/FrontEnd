import FarmRead from '../../../components/farm/FarmRead';
import StyledHeader from '../../../components/StyledHeader';
import StyledBody from '../../../components/StyledBody';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';

export default function MemberDetailFarmpage() {
    const { farmNo } = useParams();
    const [queryParams] = useSearchParams();

    return (
        <>
            <StyledHeader></StyledHeader>
            <StyledBody>
                <FarmRead farmNo={farmNo} />
            </StyledBody>
        </>
    );
}
