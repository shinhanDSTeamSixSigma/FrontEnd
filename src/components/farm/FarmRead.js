import { useEffect, useState } from 'react';
import { getOne, getListAllFile, getFarmCropAll } from '../../api/farmApi';
import useCustomMove from '../../hooks/useCustomMove';
import Button from '../Button';
import { useNavigate, useParams } from 'react-router-dom';
import { prefix } from '../../api/farmApi';

const url = `${prefix}`;
const initState = {
    farmNo: 0,
    farmName: '',
    farmAddress: '',
    farmContent: '',
    farmDescription: '',
    farmPhone: '',
    farmSize: '',
    farmCareer: '',
    farmOrderNum: 0,
    farmConnect: '',
    farmCategory: '',
    farmRating: 0.0,
    reviewCnt: 0,
};

const cropInit = {
    cropCategoryEntity: { cropCateNo: 0, cropCateName: '' },
    cropContent: '',
    cropDictNo: 0,
    cropName: '',
    effect: '',
    spring: 0,
    summer: 0,
    fall: 0,
    winter: 0,
    level: 0,
    summary: '',
    term: 0,
    tip: '',
    nutrient: '',
    lowTemp: 0,
    highTemp: 0,
};

function whenShareClick() {
    alert('공유버튼 진행중');
}
function whenLikeClicked() {
    alert('좋아요버튼 진행중');
}
function FarmDetailPage2(farm) {
    console.log(farm);
    return (
        <>
            {/* 위에 */}
            <div>
                {/*이미지 제목 공유 하트 */}
                <div className="d-flex ml-7 mr-7">
                    <img
                        src={farm.farm.image}
                        className="rounded-5 shadow w-36"
                    />
                    <p
                        className="bg-dark text-danger border w-10 h-10 float-right justify-content-end ms-auto"
                        onClick={whenLikeClicked}
                    >
                        🤍❤
                    </p>
                </div>
                <div className="d-flex mr-7 ml-7 mt-3">
                    <p className="align-middle w-36 text-center text-xl font-bold pt-2">
                        {farm.farm.farmName}
                    </p>
                    {/*placeholder */}
                    <img
                        src=""
                        className="ms-auto bg-dark w-10 h-10"
                        alt="공유버튼"
                        onClick={whenShareClick}
                    ></img>
                </div>
                {/*ㅁㅁ 전문 농장 +위치 */}
                <div className="d-flex mt-3 ml-7 mr-7 mb-2">
                    <p>{farm.farm.farmCategory}전문 농장</p>
                    <p className="pl-5 text-gray-430 text-sm">
                        🌏 {farm.farm.farmAddress}
                    </p>
                </div>
                {/*미니 텍스트 소개 */}
                <p className="ml-10 mr-10 text-gray-430 mt-1">
                    {farm.farm.farmContent}
                </p>
                <div className="ml-10 mr-10 row align-items-start bg-gray-100 rounded mt-2 mb-5 pt-2 pb-2">
                    <div className="col text-center">
                        <p className="text-sm">신청수</p>
                        <p className="text-sm mt-2 font-bold">
                            {farm.farm.farmOrderNum}회
                        </p>
                    </div>
                    <div className="col text-center">
                        <p className="text-sm text-center">리뷰 {'>'}</p>
                        <div className="d-flex mt-1">
                            <p>⭐</p>
                            <p className="ml-1 mr-1 font-bold">
                                {farm.farm.farmRating}
                            </p>
                            <p className="text-sm align-text-bottom mt-1">
                                ({farm.farm.reviewCnt})
                            </p>
                        </div>
                    </div>
                    <div className="col text-center">
                        <p className="text-sm">경력</p>
                        <p className="text-sm mt-2  font-bold">
                            {farm.farm.farmCareer}년
                        </p>
                    </div>
                </div>
                {/*신청수 리뷰 경력 div 박스 */}
            </div>
            {/* 구분 선 */}
            <hr className="mb-3"></hr>
            {/* 아래 */}
            <article>
                {/* 버튼으로 나열 */}
                {/* 디폴트는 농장 정보 */}
                <p>{farm.farm.farmName}</p>
                <section>
                    <p>농부: 깁덕팔</p>
                    <p>연락 가능 시간: {farm.farm.farmConnect}</p>
                </section>
                <section>
                    <p>상세 설명</p>
                    <p>{farm.farm.farmDescription}</p>
                </section>
                <section>
                    <p>위치</p>
                    <p>{farm.farm.farmAddress}</p>
                </section>
            </article>
        </>
    );
}

export default function FarmRead({ farmNo }) {
    const navigate = useNavigate();
    const [farm, setFarm] = useState(initState);
    const { moveToList, moveToModify, moveToPay } = useCustomMove();
    const [imagePaths, setImagePaths] = useState([]);
    const [farmCrop, setFarmCrop] = useState({ ...cropInit });

    const moveToListFunc = () => moveToList();
    const moveToModifyFunc = () => moveToModify(farmNo);

    useEffect(() => {
        getOne(farmNo).then((data) => {
            setFarm(data);
        });
    }, [farmNo]);

    useEffect(() => {
        getListAllFile(farmNo).then((data) => {
            setImagePaths(data);
        });
    }, [farmNo]);

    useEffect(() => {
        getFarmCropAll(farmNo).then((data) => {
            setFarmCrop(data.getResult);
            console.log(data.getResult);
        });
    }, []);

    const renderFields = () => {
        return Object.keys(farm).map((key) => {
            if (key === `memberNo` || key === `photos`) {
                return null;
            }

            return (
                <div key={key} className="flex justify-center">
                    <div className="items-center relative mb-4 flex w-full rounded-r border border-solid shadow-md  ">
                        <div
                            key={key}
                            className="flex items-center justify-center h-full p-1 mr-1 h-10 w-13 font-bold text-sm border-r"
                        >
                            {key}
                        </div>
                        <div className=" p-1 ">{farm[key]}</div>
                    </div>
                </div>
            );
        });
    };

    return (
        <>
            {/*<div className="border-2  mt-10 m2 p-4">{renderFields()}</div>*/}
            <FarmDetailPage2 farm={farm} />
            <div>
                <div>
                    내 농장 작물 카테고리:{' '}
                    {farmCrop && (
                        <div>{farmCrop.cropCategoryEntity.cropCateName}</div>
                    )}
                </div>
                <div>
                    내 농장 작물:
                    {farmCrop && <div>{farmCrop.cropName}</div>}
                </div>
                {imagePaths ? (
                    imagePaths.map((imagePath, idx) => (
                        <img
                            key={idx}
                            src={`${url}/${imagePath}`}
                            alt={`image ${idx}`}
                        />
                    ))
                ) : (
                    <></>
                )}
            </div>

            <div className="flex justify-center">
                <Button
                    name={'목록'}
                    widthHeight={'w-20'}
                    moveToListFunc={moveToListFunc}
                />
                <Button
                    name={'수정'}
                    widthHeight={'w-20'}
                    moveToModifyFunc={moveToModifyFunc}
                />
                <button onClick={() => moveToPay(farmNo)}>농장 구매하기</button>
            </div>
        </>
    );
}
