import FarmRead from '../../../components/farm/FarmRead';
import StyledHeader from '../../../components/StyledHeader';
import StyledBody from '../../../components/StyledBody';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';

export default function FarmDetailPage() {
    const { farmNo } = useParams();
    const [queryParams] = useSearchParams();

    return (
        <>
            <StyledHeader>
                <div className="flex justify-between">
                    <div>test detail {farmNo}</div>
                </div>
            </StyledHeader>
            <StyledBody>
                <FarmRead farmNo={farmNo} />
            </StyledBody>
        </>
    );
}
