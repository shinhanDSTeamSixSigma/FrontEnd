import { Suspense, lazy } from 'react';
import LoadingModal from '../components/LoadingModal';
const { createBrowserRouter } = require('react-router-dom');

const Loading = <LoadingModal />;
// 메인페이지
const Main = lazy(() => import('../pages/main/MainPage'));
// 농장 리스트
const Farm = lazy(() => import('../pages/member/farm/FarmListPage'));
// 레이아웃
const Layout = lazy(() => import('../layouts/Layout'));
// 멤버 마이페이지
const MemberMyPage = lazy(() =>
    import('../pages/member/mypage/MemberMyPagePage'),
);
// 멤버 수정
const MemberInfoEdit = lazy(() =>
    import('../pages/member/mypage/MemberInfoPage'),
);
// 농부 마이페이지
const FarmerMyPage = lazy(() =>
    import('../pages/farmer/mypage/FarmerMyPagePage'),
);
// 농부 수정
const FarmerInfoEdit = lazy(() =>
    import('../pages/farmer/mypage/FarmerInfoPage'),
);
// 멤버 마이페이지 - 내 농장 목록
const MyFarmList = lazy(() =>
    import('../pages/member/mypage/farm/MyfarmListPage'),
);
// 멤버 마이페이지 - 작물 스트리밍
const CropStreaming = lazy(() =>
    import('../pages/member/mypage/streaming/CropStreamingPage'),
);
// 멤버 마이페이지 - 작물 앨범
const CropAlbum = lazy(() =>
    import('../pages/member/mypage/streaming/AlbumPage'),
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
//문의 목록
const InquiryList = lazy(() =>
    import('../pages/member/mypage/inquiry/InquiryListPage.js'),
);
//문의 작성
const InquiryRegist = lazy(() =>
    import('../pages/member/mypage/inquiry/InquiryRegistPage.js'),
);

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
                path: 'farm-list',
                element: (
                    <Suspense fallback={Loading}>
                        <Farm />
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
                path: 'crop-detail:id',
                element: (
                    <Suspense fallback={Loading}>
                        <CropDetail />
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
                path: '',
                element: (
                    <Suspense fallback={Loading}>
                        <MemberMyPage />
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
                path: 'myfarm',
                element: (
                    <Suspense fallback={Loading}>
                        <MyFarmList />
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
                path: 'edit',
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
    // 문의 라우터
    {
        path: 'customer-inquiry',
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
                        <InquiryList />
                    </Suspense>
                ),
            },
            {
                path: 'regist',
                element: (
                    <Suspense fallback={Loading}>
                        <InquiryRegist />
                    </Suspense>
                ),
            },
        ],
    },
]);

export default root;
