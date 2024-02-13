import Button from '../../../../components/Button';
import StyledBody from '../../../../components/StyledBody';
import StyledHeader from '../../../../components/StyledHeader';

export default function CropStreamingPage() {
    return (
        <>
            <StyledHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-2xl font-black">쑥쑥이</span>는
                        지금?
                    </div>
                    <div className="text-sm font-bold pt-2">
                        함께한지
                        <span className=""> 56</span>일째
                    </div>
                </div>
                <div className="border mt-2 border-[#90C8AC]"></div>
                <div className="flex justify-end">
                    <button className="flex-none rounded-md bg-[#C4DFAA] px-3.5 py-2.5 text-sm font-semibold text-black  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-2 mr-3">
                        실시간
                    </button>
                    <button className="flex-none rounded-md bg-[#C4C4C4] px-3.5 py-2.5 text-sm font-semibold text-black  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-2">
                        통계
                    </button>
                </div>
            </StyledHeader>
            <StyledBody>
                <div className="h-72 border">스트리밍 영상</div>
                <div className="flex justify-evenly mt-8 ">
                    <div className=" text-center flex items-center">
                        <img
                            src={process.env.PUBLIC_URL + `/img/Ellipse1.png`}
                            alt=""
                        />
                        <span className="ml-2">24.9</span> °⁣C
                    </div>
                    <div className=" text-center flex items-center">
                        <img
                            src={process.env.PUBLIC_URL + `/img/Ellipse2.png`}
                            alt=""
                        />
                        <span className="ml-2">50</span>%
                    </div>
                    <div className=" text-center flex items-center">
                        <img
                            src={process.env.PUBLIC_URL + `/img/Ellipse3.png`}
                            alt=""
                        />
                        <span className="ml-2">25</span>lx
                    </div>
                </div>
                <div className="flex justify-evenly mt-8">
                    <Button name={'캡처하기'} widthHeight={'w-20 h-11'} />
                    <Button name={'물주기'} widthHeight={'w-20 h-11'} />
                </div>
            </StyledBody>
        </>
    );
}
