import StyledHeader from '../../../../components/StyledHeader';
import StyledBody from '../../../../components/StyledBody';
import Button from '../../../../components/Button';

export default function MyFarmListPage() {
    return (
        <>
            <StyledHeader>내 농장 목록</StyledHeader>
            <StyledBody>
                <span className="text-sm  text-[#878787]">2024.02.04</span>
                <div className="shadow-2xl h-32  mt-2 mb-12 rounded-2xl flex flex-row ">
                    <div className="ml-3 mt-auto mb-auto">
                        <img
                            src={process.env.PUBLIC_URL + `/img/farm1.png`}
                        ></img>
                    </div>
                    <div className="mt-auto mb-auto ml-4 mr-4">
                        <div className="text-sm">토심이네 농장</div>
                        <span className="text-xs text-[#878787]">
                            당근 38개 재배
                        </span>
                    </div>
                </div>
                <span className="text-sm text-[#878787]">2024.01.03</span>
                <div className="shadow-2xl h-32 mt-2 mb-12 rounded-2xl flex flex-row ">
                    <div className="ml-3 mt-auto mb-auto">
                        <img
                            src={process.env.PUBLIC_URL + `/img/farm1.png`}
                        ></img>
                    </div>
                    <div className="mt-auto mb-auto ml-4 mr-4">
                        <div className="text-sm">토심이네 농장</div>
                        <span className="text-xs text-[#878787]">
                            당근 38개 재배
                        </span>
                    </div>
                </div>
                <span className="text-sm text-[#878787]">2023.11.21</span>
                <div className="shadow-2xl h-32 mt-2 mb-12 rounded-2xl flex flex-row ">
                    <div className="ml-3 mt-auto mb-auto">
                        <img
                            src={process.env.PUBLIC_URL + `/img/farm1.png`}
                        ></img>
                    </div>
                    <div className="mt-auto mb-auto ml-4 mr-4">
                        <div className="text-sm">토심이네 농장</div>
                        <span className="text-xs text-[#878787]">
                            당근 38개 재배
                        </span>
                    </div>
                </div>
            </StyledBody>
        </>
    );
}
