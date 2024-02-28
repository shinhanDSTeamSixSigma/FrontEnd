export default function FarmFarmerInfo({ farm, farmMember }) {
    return (
        <>
            <div className="my-6 font-semibold">{farm.farmName}</div>
            <div className="flex items-center mt-3 text-[#878787] ml-4 font-semibold text-base">
                <img
                    src={process.env.PUBLIC_URL + `/img/User.png`}
                    alt=""
                    className="w-6 h-6  mr-2"
                />
                {farmMember && <div>농부 : {farmMember.nickname}</div>}
            </div>
            <div className="flex items-center mt-2 text-[#878787] ml-4 font-semibold text-base">
                <img
                    src={process.env.PUBLIC_URL + `/img/watch.png`}
                    alt=""
                    className="w-6 h-6  mr-2"
                />
                <div>상담 시간 : {farm.farmConnect}</div>
            </div>
            <div className="font-semibold mt-4 ">상세 설명</div>
            <div className="mt-2 text-[#878787] font-semibold ml-4 text-base">
                {farm.farmDescription}
            </div>
            <div className="font-semibold mt-4 ">농장 번호</div>
            <div className="ml-4 mt-2 text-[#878787] font-semibold text-base">
                {farm.farmPhone}
            </div>
            <div className="font-semibold mt-4 ">농장 평 수</div>
            <div className="ml-4 mt-2 text-[#878787] font-semibold text-base">
                {farm.farmSize}평
            </div>
        </>
    );
}
