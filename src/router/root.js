import { Suspense, lazy } from 'react';
import InquiryDetailPage from '../pages/member/mypage/inquiry/InquiryDetailPage.js';
import LoadingModal from '../components/modal/LoadingModal.js';
import FarmerInquiryListPage from '../pages/farmer/mypage/inquiry/FarmerInquiryListPage.js';
import FarmerInquiryDetailPage from '../pages/farmer/mypage/inquiry/FarmerInquiryDetailPage.js';
import FarmerInquiryRegistPage from '../pages/farmer/mypage/inquiry/FarmerInquiryRegistPage.js';
import FarmerReviewListPage from '../pages/farmer/mypage/review/FarmerReviewListPage.js';
import FarmerReviewDetail from '../pages/farmer/mypage/review/FarmerReviewDetail.js';

const { createBrowserRouter } = require('react-router-dom');

const Loading = <LoadingModal />;
// 메인페이지
const Main = lazy(() => import('../pages/main/MainPage'));
// 농장 리스트
const Farm = lazy(() => import('../pages/member/farm/FarmListPage'));
// 농부 농장 상세
const FarmEdit = lazy(() => import('../pages/member/farm/FarmDetailPage'));
// 멤버 농장 상세
const MemberFarmEdit = lazy(() =>
    import('../pages/member/farm/MemberDetailFarmpage.js'),
);

// 레이아웃
const Layout = lazy(() => import('../layouts/Layout'));
// 멤버 마이페이지
const MemberMyPage = lazy(() =>
    import('../pages/member/mypage/MemberMyPagePage'),
);
// 농부 마이페이지
const FarmerMyPage = lazy(() =>
    import('../pages/farmer/mypage/FarmerMyPagePage.js'),
);

// 멤버 수정
const MemberInfoEdit = lazy(() =>
    import('../pages/member/mypage/MemberInfoPage'),
);
// 농부 수정
const FarmerInfoEdit = lazy(() =>
    import('../pages/farmer/mypage/FarmerInfoPage'),
);
// // 멤버 마이페이지 - 내 농장 목록
// const MyFarmList = lazy(() =>
//     import('../pages/member/mypage/farm/MyfarmListPage'),
// );
// 멤버 마이페이지 - 작물 스트리밍
const CropStreaming = lazy(() =>
    import('../pages/member/mypage/streaming/CropStreamingPage'),
);
// 멤버 마이페이지 - 작물 앨범
const CropAlbum = lazy(() =>
    import('../pages/member/mypage/diary/AlbumPage.js'),
);
// 멤버 마이페이지 - 내 작물
const MyCrop = lazy(() => import('../pages/member/mypage/MyCropPage'));

//식물 기록 - 다이어리
const Diary = lazy(() => import('../pages/member/mypage/diary/DiaryPage'));
const DiaryRegist = lazy(() =>
    import('../pages/member/mypage/diary/DiaryRegistPage'),
);
const DiaryEdit = lazy(() =>
    import('../pages/member/mypage/diary/DiaryEditPage'),
);
//식물 기록 - 캘린더
const DiaryCalendar = lazy(() =>
    import('../pages/member/mypage/diary/DiaryCalendarPage'),
);
//농장 결제
const Pay = lazy(() => import('../pages/member/mypage/point/PayApplyPage'));
//작물 영수증
const PaymentDetail = lazy(() =>
    import('../pages/member/mypage/point/PaymentDetailPage'),
);
//포인트 충전
const PointCharge = lazy(() =>
    import('../pages/member/mypage/point/PointChargePage'),
);
//포인트 결제 내역
const PointDetail = lazy(() =>
    import('../pages/member/mypage/point/PointDetailPage'),
);
//작물 정보 리스트
const CropList = lazy(() => import('../pages/member/dict/CropListPage'));
//작물 상세
const CropDetail = lazy(() => import('../pages/member/dict/CropDetailPage'));
//사용자 마이페이지 문의목록
const InquiryList = lazy(() =>
    import('../pages/member/mypage/inquiry/InquiryListPage'),
);
//사용자 마이페이지 문의 상세
const InquiryDetail = lazy(() =>
    import('../pages/member/mypage/inquiry/InquiryDetailPage'),
);
//사용자 마이페이지 문의 수정
const InquiryEdit = lazy(() =>
    import('../pages/member/mypage/inquiry/InquiryEdit'),
);

//사용자 마이페이지 리뷰목록
const ReviewList = lazy(() =>
    import('../pages/member/mypage/review/ReviewListPage.js'),
);
//사용자 마이페이지 리뷰상세
const ReviewDetail = lazy(() =>
    import('../pages/member/mypage/review/ReviewDetail.js'),
);
//사용자 마이페이지 리뷰수정
const ReviewEdit = lazy(() =>
    import('../pages/member/mypage/review/ReviewEdit.js'),
);
//문의 목록
const FarmerInquiryList = lazy(() =>
    import('../pages/farmer/mypage/inquiry/FarmerInquiryListPage.js'),
);
//문의 작성
const FarmerInquiryRegist = lazy(() =>
    import('../pages/farmer/mypage/inquiry/FarmerInquiryRegistPage.js'),
);

//리뷰목록
const FarmerReviewList = lazy(() =>
    import('../pages/farmer/mypage/review/FarmerReviewListPage.js'),
);
//리뷰작성
const FarmerReviewRegist = lazy(() =>
    import('../pages/farmer/mypage/review/FarmerReviewRegist.js'),
);
// 회원가입
const Signup = lazy(() => import('../pages/Login/RegisterPage.js'));

//로그인
const Login = lazy(() => import('../pages/Login/LoginPage.js'));

// 온습도통계
const TemperaturHumidityPage = lazy(() =>
    import('../pages/main/TemperatureHumidityPage.js'),
);
// 농장 등록
const AddFarm = lazy(() =>
    import('../pages/farmer/mypage/farm/FarmerFarmAddPage'),
);
// 농장 수정
const ModifyFarm = lazy(() =>
    import('../pages/farmer/mypage/farm/FarmerFarmModifyPage'),
);
// 농장 구매
const PayFarm = lazy(() => import('../pages/member/farm/FarmPayPage.js'));

const root = createBrowserRouter([
    // 기본 라우터
    {
        path: '',
        element: (
            <Suspense fallback={Loading}>
                <Layout />
            </Suspense>
        ),
        children: [
            {
                path: '',
                element: (
                    <Suspense fallback={Loading}>
                        <Main />
                    </Suspense>
                ),
            },

            {
                path: 'crop-list',
                element: (
                    <Suspense fallback={Loading}>
                        <CropList />
                    </Suspense>
                ),
            },
            {
                path: 'crop-detail/:id',
                element: (
                    <Suspense fallback={Loading}>
                        <CropDetail />
                    </Suspense>
                ),
            },
        ],
    },
    // 농장 라우터
    {
        path: 'farm',
        element: (
            <Suspense fallback={Loading}>
                <Layout />
            </Suspense>
        ),
        children: [
            {
                path: 'list',
                element: (
                    <Suspense fallback={Loading}>
                        <Farm />
                    </Suspense>
                ),
            },
            {
                path: 'read/:farmNo',
                element: (
                    <Suspense fallback={Loading}>
                        <FarmEdit />
                    </Suspense>
                ),
            },
            {
                path: 'member/read/:farmNo',
                element: (
                    <Suspense fallback={Loading}>
                        <MemberFarmEdit />
                    </Suspense>
                ),
            },
            {
                path: 'regist',
                element: (
                    <Suspense fallback={Loading}>
                        <AddFarm />
                    </Suspense>
                ),
            },
            {
                path: 'modify/:farmNo',
                element: (
                    <Suspense fallback={Loading}>
                        <ModifyFarm />
                    </Suspense>
                ),
            },
            {
                path: 'pay/:farmNo',
                element: (
                    <Suspense fallback={Loading}>
                        <PayFarm />
                    </Suspense>
                ),
            },
            {
                path: 'review/:farmNo',
                element: (
                    <Suspense fallback={Loading}>
                        <FarmerReviewList />
                    </Suspense>
                ),
            },
            {
                path: 'review/:reviewNo/detail',
                element: (
                    <Suspense fallback={Loading}>
                        <FarmerReviewDetail />
                    </Suspense>
                ),
            },
            {
                path: 'review/:farmNo/regist',
                element: (
                    <Suspense fallback={Loading}>
                        <FarmerReviewRegist />
                    </Suspense>
                ),
            },
            {
                path: 'inquiry/:farmNo',
                element: (
                    <Suspense fallback={Loading}>
                        <FarmerInquiryListPage />
                    </Suspense>
                ),
            },
            {
                path: 'inquiry/:boardNo/detail',
                element: (
                    <Suspense fallback={Loading}>
                        <FarmerInquiryDetailPage />
                    </Suspense>
                ),
            },
            {
                path: 'inquiry/:farmNo/regist',
                element: (
                    <Suspense fallback={Loading}>
                        <FarmerInquiryRegistPage />
                    </Suspense>
                ),
            },
        ],
    },

    // 마이페이지 라우터
    {
        path: 'mypage',
        element: (
            <Suspense fallback={Loading}>
                <Layout />
            </Suspense>
        ),

        children: [
            {
                path: 'memberMypage',
                element: (
                    <Suspense fallback={Loading}>
                        <MemberMyPage />
                    </Suspense>
                ),
            },
            {
                path: 'farmerMypage',
                element: (
                    <Suspense fallback={Loading}>
                        <FarmerMyPage />
                    </Suspense>
                ),
            },
            {
                path: 'info-edit',
                element: (
                    <Suspense fallback={Loading}>
                        <MemberInfoEdit />
                    </Suspense>
                ),
            },

            {
                path: 'streaming',
                element: (
                    <Suspense fallback={Loading}>
                        <CropStreaming />
                    </Suspense>
                ),
            },
            {
                path: 'album',
                element: (
                    <Suspense fallback={Loading}>
                        <CropAlbum />
                    </Suspense>
                ),
            },
            {
                path: 'mycrop',
                element: (
                    <Suspense fallback={Loading}>
                        <MyCrop />
                    </Suspense>
                ),
            },

            {
                path: 'temperature',
                element: (
                    <Suspense fallback={Loading}>
                        <TemperaturHumidityPage />
                    </Suspense>
                ),
            },
        ],
    },
    // 작물 일기 라우터
    {
        path: 'diary',
        element: (
            <Suspense fallback={Loading}>
                <Layout />
            </Suspense>
        ),
        children: [
            {
                path: '',
                element: (
                    <Suspense fallback={Loading}>
                        <Diary />
                    </Suspense>
                ),
            },
            {
                path: 'regist',
                element: (
                    <Suspense fallback={Loading}>
                        <DiaryRegist />
                    </Suspense>
                ),
            },
            {
                path: 'list/:diaryNo',
                element: (
                    <Suspense fallback={Loading}>
                        <DiaryEdit />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: 'calendar',
        element: (
            <Suspense fallback={Loading}>
                <Layout />
            </Suspense>
        ),
        children: [
            {
                path: '',
                element: (
                    <Suspense fallback={Loading}>
                        <DiaryCalendar />
                    </Suspense>
                ),
            },
        ],
    },
    // 페이 라우터
    {
        path: 'pay',
        element: (
            <Suspense fallback={Loading}>
                <Layout />
            </Suspense>
        ),
        children: [
            {
                path: '',
                element: (
                    <Suspense fallback={Loading}>
                        <Pay />
                    </Suspense>
                ),
            },
            {
                path: 'receipt',
                element: (
                    <Suspense fallback={Loading}>
                        <PaymentDetail />
                    </Suspense>
                ),
            },
            {
                path: 'charge',
                element: (
                    <Suspense fallback={Loading}>
                        <PointCharge />
                    </Suspense>
                ),
            },
            {
                path: 'detail',
                element: (
                    <Suspense fallback={Loading}>
                        <PointDetail />
                    </Suspense>
                ),
            },
        ],
    },
    //마이페이지 문의 라우터
    {
        path: 'inquiry',
        element: (
            <Suspense fallback={Loading}>
                <Layout />
            </Suspense>
        ),
        children: [
            {
                path: ':memberNo',
                element: (
                    <Suspense fallback={Loading}>
                        <InquiryList />
                    </Suspense>
                ),
            },
            {
                path: ':boardNo/detail',
                element: (
                    <Suspense fallback={Loading}>
                        <InquiryDetail />
                    </Suspense>
                ),
            },
            {
                path: ':boardNo/edit',
                element: (
                    <Suspense fallback={Loading}>
                        <InquiryEdit />
                    </Suspense>
                ),
            },
        ],
    },
    //마이페이지 리뷰 라우터
    {
        path: 'review',
        element: (
            <Suspense fallback={Loading}>
                <Layout />
            </Suspense>
        ),
        children: [
            {
                path: ':memberNo',
                element: (
                    <Suspense fallback={Loading}>
                        <ReviewList />
                    </Suspense>
                ),
            },
            {
                path: ':reviewNo/detail',
                element: (
                    <Suspense fallback={Loading}>
                        <ReviewDetail />
                    </Suspense>
                ),
            },
            {
                path: ':reviewNo/edit',
                element: (
                    <Suspense fallback={Loading}>
                        <ReviewEdit />
                    </Suspense>
                ),
            },
        ],
    },
    // 로그인 라우터
    {
        path: 'signup',
        element: (
            <Suspense fallback={Loading}>
                <Signup />
            </Suspense>
        ),
    },
    // 로그인 라우터
    {
        path: 'login',
        element: (
            <Suspense fallback={Loading}>
                <Login />
            </Suspense>
        ),
    },
]);

export default root;
