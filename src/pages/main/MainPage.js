import StyledHeader from '../../components/StyledHeader';
import StyledBody from '../../components/StyledBody';
import MySwiper from '../../components/MySwiper';
import Button from '../../components/Button';
import MyFarmList from '../../components/farm/MyFarmList';
import { useEffect } from 'react';
const MainPage = () => {
    const handleLogout = () => {
        console.log('로그아웃 함수가 호출되었습니다.');
        // 쿠키 만료
        document.cookie = 'auth=; max-age=0; path=/';
        //setMemberData(null);
    };
    useEffect(() => {
        // 현재 페이지의 쿼리 문자열 가져오기
        const queryString = window.location.search;

        // URLSearchParams 객체를 사용하여 쿼리 문자열 파싱
        const urlParams = new URLSearchParams(queryString);

        // 파라미터 값 가져오기
        const isLogout = urlParams.get('login');
        if (isLogout === '0') {
            handleLogout();
            window.location.href = '/';
        }
    }, []);
    return (
        <div className="main">
            <StyledHeader>
                <MySwiper />
            </StyledHeader>
            <StyledBody>
                {/* <div>리뷰 많은 Top3</div> */}

                <div className="shadow-2xl h-[30rem] mt-2 overflow-hidden rounded-2xl hide-scrollbar">
                    <div
                        className="text-xl"
                        style={{
                            justifyContent: 'center',
                            display: 'flex',
                            fontWeight: '1000',
                            marginTop: '1rem',
                        }}
                    >
                        대표 농장
                    </div>{' '}
                    <MyFarmList numberOfItems={3} />
                </div>

                <img
                    src={process.env.PUBLIC_URL + `/img/banner.png`}
                    alt="배너사진"
                    style={{
                        marginTop: '2rem',
                        marginBottom: '2rem',
                        borderRadius: '3rem',
                    }}
                />
            </StyledBody>
        </div>
    );
};
export default MainPage;
