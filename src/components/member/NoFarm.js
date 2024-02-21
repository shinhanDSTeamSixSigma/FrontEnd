import FullButton from '../FullButton';

const NoFarm = () => {
    return (
        <>
            <div>
                <span className="text-base font-black">
                    현재 재배 중인 작물
                </span>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '5rem',
                    marginBottom: '5rem',
                }}
            >
                <div
                    style={{
                        width: '4rem',
                        height: '4rem',
                    }}
                >
                    <img
                        className="pointWallet"
                        alt="profile"
                        src={
                            process.env.PUBLIC_URL +
                            '/img/memberMypage/NoFarm.png'
                        }
                    />
                </div>

                <span className="text-sm">내 손 안의 작물을 지금 키워봐요</span>
            </div>
            <FullButton name="농장 찾아보기"></FullButton>
        </>
    );
};

export default NoFarm;
