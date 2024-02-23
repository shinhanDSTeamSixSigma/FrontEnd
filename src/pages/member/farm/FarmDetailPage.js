import FarmRead from '../../../components/farm/FarmRead';
import StyledHeader from '../../../components/StyledHeader';
import StyledBody from '../../../components/StyledBody';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
const farm_detail = {
    name: 'Ted Fox',
    email: 'ted.fox@example.com',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    selfLike: false,
};

export default function FarmDetailPage() {
    const { farmNo } = useParams();
    const [queryParams] = useSearchParams();

    return (
        <>
            <StyledHeader>
                {/*<div className="flex justify-between">
                    <div>test detail {farmNo}</div>
    </div>*/}
            </StyledHeader>
            <StyledBody>
                <FarmRead farmNo={farmNo} />
            </StyledBody>
        </>
    );
}
