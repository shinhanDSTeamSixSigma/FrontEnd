import StyledHeader from '../../../../components/StyledHeader';
import StyledBody from '../../../../components/StyledBody';

export default function AlbumPage() {
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
            </StyledHeader>
            <StyledBody>
                <span>앨범</span>
                <div className="flex flex-wrap mt-3 justify-start">
                    {Array(9)
                        .fill()
                        .map((_, index) => (
                            <div
                                key={index}
                                className="h-24 w-24 border ml-auto mb-3"
                            >
                                ㅇㅇ
                            </div>
                        ))}
                </div>
            </StyledBody>
        </>
    );
}
