import { Suspense, lazy } from 'react';
import LoadingModal from '../components/LoadingModal';
const { createBrowserRouter } = require('react-router-dom');

const Loading = <LoadingModal />;
const Main = lazy(() => import('../pages/main/MainPage'));
const Farm = lazy(() => import('../pages/member/farm/FarmListPage'));
const Layout = lazy(() => import('../layouts/Layout'));
const MemberMyPage = lazy(() =>
    import('../pages/member/mypage/MemberMyPagePage'),
);
const MemberInfoEdit = lazy(() =>
    import('../pages/member/mypage/MemberInfoPage'),
);
const FarmerMyPage = lazy(() =>
    import('../pages/farmer/mypage/FarmerMyPagePage'),
);
const FarmerInfoEdit = lazy(() =>
    import('../pages/farmer/mypage/FarmerInfoPage'),
);
const MyFarmList = lazy(() =>
    import('../pages/member/mypage/farm/MyfarmListPage'),
);
const CropStreaming = lazy(() =>
    import('../pages/member/mypage/streaming/CropStreamingPage'),
);

const CropAlbum = lazy(() =>
    import('../pages/member/mypage/streaming/AlbumPage'),
);

const MyCrop = lazy(() => import('../pages/member/mypage/MyCropPage'));

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
]);

export default root;
