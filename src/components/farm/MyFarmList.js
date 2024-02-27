import StyledHeader from '../StyledHeader';
import StyledBody from '../StyledBody';
import {
    getAllList,
    getPaging,
    getListAllFile,
    prefix,
    getFarmCropAll,
    getMemberNo,
} from '../../api/farmApi';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button';
import useCustomMove from '../../hooks/useCustomMove';
import Paging from '../paging/Paging';

const url = `${prefix}`;
const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totoalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0,
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
export default function MyFarmList({ numberOfItems }) {
    const { page, size, moveToList, moveToRead, memberMoveToRead } =
        useCustomMove();
    const [imagePaths, setImagePaths] = useState({});
    const [farmCrop, setFarmCrop] = useState({ ...cropInit });
    // const navigate = useNavigate();

    const [serverData, setServerData] = useState(initState);
    const [sortByReview, setSortByReview] = useState(false); // 필터링
    const [memberData, setMemberData] = useState(null); // 농부의 memberNo
    useEffect(() => {
        // 서버에서 사용자 정보 가져오기
        getMemberNo()
            .then((res) => {
                setMemberData(res);
                console.log(res);

                console.log('멤버데이터 ', JSON.stringify(memberData));
            })
            .catch((error) => {
                console.log('데이터 안옴!!!!!!');
                console.error(error);
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, [page, sortByReview]); // page와 sortByReview가 변경될 때마다 데이터를 다시 가져옴

    const fetchData = async () => {
        const data = await getPaging({ page, size, sortByReview });
        sortFarmList(data.dtoList); // 정렬
        setServerData(data);
    };

    useEffect(() => {
        const fetchImages = async () => {
            const updatedImagePaths = {}; // 새로운 객체 생성
            const promises = serverData.dtoList.map((farm) => {
                return getListAllFile(farm.farmNo)
                    .then((data) => ({
                        farmNo: farm.farmNo,
                        imagePath: data, // 이미지 데이터 형태에 따라 수정 필요
                    }))
                    .catch((error) => ({
                        farmNo: farm.farmNo,
                        images: [],
                    }));
            });

            const imageDataList = await Promise.all(promises);
            // 새로운 객체에 이미지 경로 할당
            imageDataList.forEach((imageData) => {
                updatedImagePaths[imageData.farmNo] = imageData.imagePath;
            });

            setImagePaths(updatedImagePaths);
        };

        if (serverData.dtoList.length > 0) {
            fetchImages();
        }
    }, [serverData]);

    // member가 farmer면 농부의 농장 상세 member면 멤버의 농장 상세
    const handleFarmItemClick = (farmNo) => {
        if (memberData.role === 'FARMER') {
            moveToRead(farmNo);
        } else {
            memberMoveToRead(farmNo);
        }
    };

    useEffect(() => {
        const fetchCrop = async () => {
            const updatedfarmCrop = {}; // 새로운 객체 생성
            const promises = serverData.dtoList.map((farm) => {
                return getFarmCropAll(farm.farmNo)
                    .then((data) => ({
                        farmNo: farm.farmNo,
                        farmCropData: data.getResult,
                    }))
                    .catch((error) => ({
                        farmNo: farm.farmNo,
                        farmCropData: {},
                    }));
            });

            const cropDataList = await Promise.all(promises);

            cropDataList.forEach((cropData) => {
                updatedfarmCrop[cropData.farmNo] = cropData.farmCropData;
            });

            setFarmCrop(updatedfarmCrop);
        };

        if (serverData.dtoList.length > 0) {
            fetchCrop();
        }
    }, [serverData]);
    useEffect(() => {
        console.log(JSON.stringify(farmCrop));
        console.log(JSON.stringify(imagePaths));
    });

    // 정렬
    const sortFarmList = (list) => {
        if (sortByReview) {
            list.sort((a, b) => b.reviewCnt - a.reviewCnt); // 리뷰 많은 순
        } else {
            list.sort((a, b) => a.farmNo - b.farmNo); // 기본 순서
        }
    };

    const handleSortChange = (value) => {
        if (value === 'review') {
            setSortByReview(true);
        } else {
            setSortByReview(false);
        }
    };

    const limitData = serverData.dtoList.slice(0, numberOfItems);
    return (
        <>
            <StyledBody>
                <div className="flex justify-end text-[1rem] text-[#4F6F52]">
                    <div>
                        <select
                            onChange={(e) => handleSortChange(e.target.value)}
                        >
                            <option value="default">기본순</option>
                            <option value="review">리뷰 많은 순</option>
                        </select>
                    </div>
                </div>
                <div>
                    {limitData.map((key, idx) => (
                        <div key={key.farmNo} className="">
                            <div
                                className="shadow-xl h-28   mt-2 mb-1 rounded-2xl flex cursor-pointer justify-between"
                                onClick={() => handleFarmItemClick(key.farmNo)}
                            >
                                <div className="mt-auto mb-auto ml-6 ">
                                    <div className="text-[1.1rem] font-semibold mt-1">
                                        {key.farmName}
                                    </div>
                                    {farmCrop &&
                                        farmCrop[key.farmNo] &&
                                        farmCrop[key.farmNo][
                                            'cropCategoryEntity'
                                        ] && (
                                            <p className="text-xs mb-[2px]">
                                                {
                                                    farmCrop[key.farmNo][
                                                        'cropCategoryEntity'
                                                    ]['cropCateName']
                                                }{' '}
                                                전문 농장
                                            </p>
                                        )}
                                    <div className="flex text-[0.79rem] mb-1">
                                        <div className="text-[0.79rem] font-semibold flex justify-center items-center">
                                            <img
                                                src={
                                                    process.env.PUBLIC_URL +
                                                    `/img/star.png`
                                                }
                                                alt=""
                                                className="mr-1 w-4 h-4"
                                            />
                                            <span>
                                                {key.farmRating.toFixed(1)}
                                            </span>
                                            <span className="text-[0.7rem] ml-1">
                                                ({key.reviewCnt})
                                            </span>
                                        </div>
                                        <div>
                                            <span className="ml-1">
                                                | 경력 {key.farmCareer}년
                                            </span>
                                        </div>
                                        <div>
                                            <span className="ml-1">
                                                |{' '}
                                                {key.farmAddress.replace(
                                                    / .*/,
                                                    '',
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-500">
                                        {key.farmContent}
                                    </p>
                                </div>
                                <div className=" rounded-2xl w-20 h-20 flex justify-center items-center mr-3">
                                    {imagePaths && imagePaths[key.farmNo] && (
                                        <img
                                            key={0}
                                            src={`${url}/${
                                                imagePaths[key.farmNo][0]
                                            }`}
                                            alt={`image ${0}`}
                                            className="h-full rounded-2xl shadow-xl mt-[2rem] "
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </StyledBody>
            <Paging serverData={serverData} movePage={moveToList} />
        </>
    );
}
