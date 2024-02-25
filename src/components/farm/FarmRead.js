import { useEffect, useState } from 'react';
import {
    getOne,
    getListAllFile,
    getFarmCropAll,
    getFarmMember,
    putOne,
} from '../../api/farmApi';
import useCustomMove from '../../hooks/useCustomMove';
import Button from '../Button';
import { useNavigate, useParams } from 'react-router-dom';
import { prefix } from '../../api/farmApi';
import StyledHeader from '../StyledHeader';
import FarmFarmerInfo from './FarmFarmerInfo';
import FarmReview from './FarmReview';
import FarmCropInfo from './FarmCropInfo';
import FarmImage from './FarmImage';
import FarmInquiry from './FarmInquiry';
import { debounce } from 'lodash';

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

export default function FarmRead({ farmNo }) {
    const [farm, setFarm] = useState(initState);
    const { moveToList, moveToModify, moveToPay } = useCustomMove();
    const [imagePaths, setImagePaths] = useState([]);
    const [farmCrop, setFarmCrop] = useState({ ...cropInit });
    const [content, setContent] = useState('리뷰'); // 버튼에 따른 컴포넌트 렌더링
    const [farmMember, setFarmMember] = useState(); // 농장 멤버에 대한 데이터
    const [totalReviews, setTotalReviews] = useState(0); // 농장 리뷰 수
    const [averageRating, setAverageRating] = useState(0); //평균 별점을 저장할 상태

    const handleTotalReviews = (data) => {
        setTotalReviews(data);
    };
    const handleAverageRating = (data) => {
        setAverageRating(data);
    };

    useEffect(() => {
        getFarmMember(farmNo).then((data) => {
            setFarmMember(data);
        });
    }, [farmNo]);
    const MAIN_DATA = [
        { id: 1, name: '농부정보', text: '농부정보' },
        { id: 2, name: '리뷰', text: '리뷰' },
        { id: 3, name: '작물소개', text: '작물소개' },
        { id: 4, name: '사진', text: '사진' },
        { id: 5, name: '문의', text: '문의' },
    ];

    const handleClickButton = (name) => {
        console.log(name);
        setContent(name);
    };
    const selectComponent = {
        농부정보: <FarmFarmerInfo farm={farm} farmMember={farmMember} />,
        리뷰: (
            <FarmReview
                farm={farm}
                handleTotalReviews={handleTotalReviews}
                handleAverageRating={handleAverageRating}
            />
        ),
        작물소개: <FarmCropInfo farmCrop={farmCrop} />,
        사진: <FarmImage imagePaths={imagePaths} />,
        문의: <FarmInquiry farm={farm} />,
    };

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

    useEffect(() => {
        // totalReviews와 averageRating이 변경될 때 farm 상태 업데이트
        setFarm((prevFarm) => ({
            ...prevFarm,
            farmRating: averageRating.toFixed(1),
            reviewCnt: totalReviews,
        }));
    }, [totalReviews, averageRating]);

    useEffect(() => {
        // 디바운스 함수 설정
        const debouncedUpdate = debounce(() => {
            if (farm) {
                putOne(farm)
                    .then((data) => {
                        console.log('modify result: ' + data);
                    })
                    .catch((error) => {
                        console.error('Error updating farm: ', error);
                    });
            }
        }, 2000); // 2초 디바운스

        debouncedUpdate();

        // 디바운스 취소
        return () => {
            debouncedUpdate.cancel();
        };
    }, [farm]); // farm 상태가 변경될 때마다 실행

    const renderFields = () => {
        return (
            <div className="w-full">
                <div className="flex justify-between">
                    <div className=" rounded-2xl w-24 h-24 flex">
                        {imagePaths && (
                            <img
                                key={0}
                                src={`${url}/${imagePaths[0]}`}
                                alt={`image ${0}`}
                                className="h-full rounded-2xl shadow-xl"
                            />
                        )}
                    </div>
                    <div>
                        <Button
                            name={'<'}
                            widthHeight={'w-10'}
                            moveToListFunc={moveToListFunc}
                        />
                    </div>
                </div>
                <div className="font-semibold text-[1.5rem] mt-2 flex justify-between">
                    {farm.farmName}

                    <img
                        src={process.env.PUBLIC_URL + `/img/upload.png`}
                        alt=""
                        className="w-6 h-6 mt-[0.3rem] "
                    />
                </div>
                <div className="flex mb-2 mt-2">
                    {farmCrop && (
                        <div className="text-[1rem] ">
                            {farmCrop.cropCategoryEntity.cropCateName} 전문 농장
                        </div>
                    )}
                    <div className="text-[1rem] flex ml-4 text-[#737373]">
                        <img
                            src={process.env.PUBLIC_URL + `/img/locate.png`}
                            alt=""
                            className="mr-1"
                        />
                        {farm.farmAddress}
                    </div>
                </div>
                <div className="text-[0.9rem] text-[#737373] ml-3 mt-3">
                    {farm.farmContent}
                </div>
                <div className="flex h-16 mt-3 rounded bg-[#FAFAFA] ml-3 items-center">
                    <div className="basis-1/4">
                        <div className="text-[0.8rem] text-center">신청수</div>
                        <div className="text-[0.79rem] font-semibold text-center">
                            {/* {farm.farmOrderNum} */}
                            8회
                        </div>
                    </div>
                    <div className="basis-1/2">
                        <div className="text-[0.8rem] text-center">
                            리뷰 {'>'}{' '}
                        </div>
                        <div className="text-[0.79rem] font-semibold flex justify-center items-center">
                            <img
                                src={process.env.PUBLIC_URL + `/img/star.png`}
                                alt=""
                                className="mr-1 w-4 h-4"
                            />
                            <span>{averageRating.toFixed(1)}</span>
                            <span className="text-[0.7rem] ml-1">
                                ({totalReviews})
                            </span>
                        </div>
                    </div>
                    <div className="basis-1/4 ">
                        <div className="text-[0.8rem] text-center">경력</div>
                        <div className="text-[0.79rem] font-semibold text-center">
                            {farm.farmCareer}년
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <StyledHeader>{renderFields()}</StyledHeader>

            <div className=" w-full border-t-[0.2rem] border-[#F2F2F2]">
                <div className="flex justify-between mt-2">
                    {MAIN_DATA.map((data) => {
                        return (
                            <button
                                onClick={() => handleClickButton(data.name)}
                                name={data.name}
                                key={data.id}
                                className="block rounded-md px-2.5 py-1.5 text-base font-semibold text-[#878787] focus:text-gray-700 focus:text-black focus:underline"
                            >
                                {data.text}
                            </button>
                        );
                    })}
                </div>
                {content && (
                    <div className="border-t-[0.2rem]">
                        {selectComponent[content]}
                    </div>
                )}
            </div>

            <Button
                name={'수정'}
                widthHeight={'w-20'}
                moveToModifyFunc={moveToModifyFunc}
            />
            <div className="fixed bottom-0 left-0 w-full bg-[#80BCBD] px-2.5 py-1.5 text-base font-semibold text-white p-3 flex justify-center text-[20px]">
                <button onClick={() => moveToPay(farmNo)}>농장 신청하기</button>
            </div>
        </>
    );
}
