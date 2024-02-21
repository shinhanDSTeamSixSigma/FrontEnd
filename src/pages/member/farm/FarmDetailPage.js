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

function FarmDetailPage2() {
    return (
        <>
            {/* 위에 */}
            <div>
                {/*이미지 제목 공유 하트 */}
                <div className="d-flex ml-7 mr-7">
                    <img
                        src={farm_detail.image}
                        className="rounded-5 shadow w-36"
                    />
                    <p className="bg-dark text-danger border w-10 h-10 float-right justify-content-end ms-auto">
                        🤍❤
                    </p>
                </div>
                <div className="d-flex mr-7 ml-7 mt-3">
                    <p className="align-middle w-36 text-center text-xl font-bold pt-2">
                        {farm_detail.name}
                    </p>
                    {/*placeholder */}
                    <img
                        src=""
                        className="ms-auto bg-dark w-10 h-10"
                        alt="공유버튼"
                    ></img>
                </div>
                {/*ㅁㅁ 전문 농장 +위치 */}
                <div className="d-flex mt-3 ml-7 mr-7">
                    <p>미나리과 전문 농장</p>
                    <p className="pl-5 text-gray-430">🌏 서울 어디 어쩌구</p>
                </div>
                {/*미니 텍스트 소개 */}
                <p className="ml-10 mr-10 text-gray-430 mt-1">
                    당근 파슬리 샐러드 어쩌구 전문 유기농 농장이다
                </p>
                <div className="ml-10 mr-10 row align-items-start bg-gray-100 rounded mt-2 mb-5 pt-2 pb-2">
                    <div className="col text-center">
                        <p className="text-sm">신청수</p>
                        <p className="text-sm mt-2 font-bold">67회</p>
                    </div>
                    <div className="col text-center">
                        <p className="text-sm text-center">리뷰 {'>'}</p>
                        <div className="d-flex mt-1">
                            <p>⭐</p>
                            <p className="ml-1 mr-1 font-bold">5.0</p>
                            <p className="text-sm align-text-bottom mt-1">
                                (23)
                            </p>
                        </div>
                    </div>
                    <div className="col text-center">
                        <p className="text-sm">경력</p>
                        <p className="text-sm mt-2  font-bold">20년</p>
                    </div>
                </div>
                {/*신청수 리뷰 경력 div 박스 */}
            </div>
            {/* 구분 선 */}
            <hr className="mb-3"></hr>
            {/* 아래 */}
            <div>
                {/* 버튼으로 나열 */}
                {/* 디폴트는 농장 정보 */}
            </div>
        </>
    );
}


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
