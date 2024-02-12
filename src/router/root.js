// 필요한 순간까지 컴포넌트를 메모리상으로 올리지 않도록 지연로딩
import { Suspense, lazy } from 'react';
const { createBrowserRouter } = require('react-router-dom');

// 컴포넌트 처리 끝나기 전 로딩
const Loading = <div>Loading....</div>;
const Main = lazy(() => import('../pages/main/MainPage'));
const Farm = lazy(() => import('../pages/member/farm/FarmListPage'));
const Layout = lazy(() => import('../layouts/Layout'));

// farmer 16개
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// main 4개
//
//
//
//
// member 24개
//작물 정보 리스트
const CropList = lazy(()=> import('../pages/member/dict/CropListPage'));
//작물 상세
const CropDetail = lazy(()=> import('../pages/member/dict/CropDetailPage'));
//문의 목록
const InquiryList=lazy(()=>import('../pages/member/mypage/inquiry/InquiryListPage'));
//문의 작성
const InquiryRegist=lazy(()=>import('../pages/member/mypage/inquiry/InquiryRegistPage'));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// 기본 라우팅 설정(어떤 경로에 어떤 컴포넌트 줄건지)
const root = createBrowserRouter([
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
        path: 'crop-detail',
        element: (
          <Suspense fallback={Loading}>
            <CropDetail />
          </Suspense>
        ),
      },
      {
        path: 'customer-inquiry',
        element: (
          <Suspense fallback={Loading}>
            <InquiryList />
          </Suspense>
        ),
      },
      {
        path: 'customer-inquiry/regist',
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
