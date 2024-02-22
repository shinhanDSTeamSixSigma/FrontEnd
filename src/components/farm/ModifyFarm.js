import { useState, useEffect } from 'react';
import {
    getOne,
    putOne,
    deleteOne,
    getListAllFile,
    farmAddFile,
    deleteFile,
    getFarmCrop,
    putFarmCrop,
    deleteFarmCrop,
    postFarmCrop,
} from '../../api/farmApi';
import ResultModal from '../modal/ResultModal';
import useCustomMove from '../../hooks/useCustomMove';

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { FaPooStorm } from 'react-icons/fa';
import { prefix } from '../../api/farmApi';

const url = `${prefix}`;
const initState = {
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
    memberNo: 28,
};

const fileInitState = {
    files: [],
    manageDiv: 'FARM',
    fileManageNo: 0,
};

const farmCropInitState = {
    farmNo: 0,
    cropName: 0,
};

export default function ModifyFarm({ farmNo, moveList, moveRead }) {
    const [farm, setFarm] = useState({ ...initState });
    const [file, setFile] = useState({ ...fileInitState });
    const [imagePaths, setImagePaths] = useState([]);
    //모달 창을 위한 상태
    const [result, setResult] = useState(null);
    const [fileReuslt, setFileResult] = useState(null); // 파일 결과
    const fileData = { ...file };
    const [crop, setCrop] = useState({ ...farmCropInitState }); // 보낼 농작물들
    const [farmCrop, setFarmCrop] = useState([]); // 가져올 농작물들
    useEffect(() => {});

    const handleChangeFarmCrop = (e) => {
        const { name, value } = e.target;
        setCrop({ ...crop, [name]: value });
    };
    useEffect(() => {
        getFarmCrop().then((data) => {
            console.log('test:' + data);

            setFarmCrop(data);
        });
    }, []);

    const handleSaveFarmCrop = () => {
        if (crop) {
            if (crop.cropDictNo) {
                // 이미 선택한 작물이 있는 경우, put 요청 보냄
                putFarmCrop({ farmNo: farmNo, cropName: crop.cropDictNo })
                    .then((farmCropResult) => {
                        console.log(farmCropResult);
                        setCrop(null); // 선택한 작물 초기화
                    })
                    .catch((e) => console.error(e));
            } else {
                // 작물을 선택하지 않은 경우, post 요청 보냄
                postFarmCrop({ farmNo: farmNo, cropName: crop.cropDictNo })
                    .then((farmCropResult) => {
                        console.log(farmCropResult);
                        setCrop(null); // 선택한 작물 초기화
                    })
                    .catch((e) => console.error(e));
            }
        } else {
            console.log('작물을 선택하세요.'); // 선택한 작물이 없는 경우에 대한 처리
        }
    };
    //이동을 위한 기능들
    const { moveToList, moveToRead } = useCustomMove();
    const handleClickModify = () => {
        //버튼 클릭시
        putOne(farm).then((data) => {
            console.log('modify result: ' + data);
            setResult('수정완료');

            const formData = new FormData();

            for (let i = 0; i < fileData.files.length; i++) {
                formData.append('files', fileData.files[i]);
            }
            formData.append('manageDiv', 'FARM');
            formData.append('fileManageNo', farmNo);

            farmAddFile(formData)
                .then((fileReuslt) => {
                    console.log(fileReuslt);
                    setFileResult(fileReuslt['FileNO']);
                    setFile({ ...fileInitState });
                })
                .catch((e) => {
                    console.error(e);
                });
            putFarmCrop({ farmNo: farmNo, cropName: crop.cropDictNo })
                .then((farmCropResult) => {
                    console.log(farmCropResult);
                    setCrop({ ...farmCropInitState });
                })
                .catch((e) => console.error(e));
        });
    };

    const handleClickDelete = () => {
        //버튼 클릭시
        deleteFarmCrop(farmNo).then((data) => {
            console.log('삭제: ' + data);
        });
        deleteOne(farmNo).then((data) => {
            console.log('delete result: ' + data);

            setResult('삭제완료');
        });
    };
    //모달 창이 close될때
    const closeModal = () => {
        if (result === '삭제완료') {
            moveToList();
        } else {
            moveToRead(farmNo);
        }
    };

    useEffect(() => {
        getOne(farmNo).then((data) => {
            console.log(data);
            setFarm(data);
        });
    }, [farmNo]);

    useEffect(() => {
        getListAllFile(farmNo).then((data) => {
            console.log(data);
            setImagePaths(data);
            console.log('patharr:' + imagePaths);
        });
    }, [farmNo]);

    const handleChangeFarm = (e) => {
        farm[e.target.name] = e.target.value;
        setFarm({ ...farm });
    };
    const handleChangeFile = (e) => {
        setFile({ ...file, files: e.target.files });
        const updatedFileData = { ...file, files: e.target.files };
        setFile(updatedFileData);
    };

    const onDeleteImage = (idx) => {
        const filePath = imagePaths[idx];
        console.log('aaa: ' + filePath);
        const fName = filePath.split('/').pop().split('.')[0];
        console.log('aaa: ' + fName);
        console.log('aaa: ' + farmNo);
        deleteFile(farmNo, fName).then((result) => {
            console.log(result);
            // setImagePaths([...imagePaths]);
            setImagePaths((prevImagePaths) => {
                const newImagePaths = [...prevImagePaths];
                newImagePaths.splice(idx, 1);
                return newImagePaths;
            });
        });
    };
    // 이미지 삭제 후 상태 업데이트를 통해 컴포넌트 다시 렌더링
    useEffect(() => {
        // 상태 업데이트 후 컴포넌트 다시 렌더링
    }, [imagePaths]);

    const renderFields = () => {
        return (
            <>
                <form>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                농장 수정
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                작성하신 내용은 농장 소개에 공개적으로 보이는
                                내용입니다.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="농장이름"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        농장 이름
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                name="farmName"
                                                id="농장이름"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="토심농장"
                                                onChange={handleChangeFarm}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="농장 한 줄 소개"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        농장 한 줄 소개
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                name="farmContent"
                                                id="농장 한 줄 소개"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="유기농 당근 농장"
                                                onChange={handleChangeFarm}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="농장 상세 설명"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        농장 상세 설명
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="농장 상세 설명"
                                            name="farmDescription"
                                            rows={3}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={''}
                                            onChange={handleChangeFarm}
                                        />
                                    </div>
                                </div>

                                <div class="flex items-center justify-center w-full">
                                    <label
                                        for="dropzone-file"
                                        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                    >
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span class="font-semibold">
                                                    Click to upload
                                                </span>{' '}
                                                or drag and drop
                                            </p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                                SVG, PNG, JPG or GIF (MAX.
                                                800x400px)
                                            </p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type={'file'}
                                            className="hidden"
                                            onChange={handleChangeFile}
                                            multiple={true}
                                        />
                                    </label>
                                </div>
                                <div>
                                    {imagePaths ? (
                                        imagePaths.map((imagePath, idx) => (
                                            <>
                                                <img
                                                    key={idx}
                                                    src={`${url}/${imagePath}`}
                                                    alt={`image ${idx}`}
                                                />
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        onDeleteImage(idx);
                                                    }}
                                                >
                                                    삭제
                                                </button>
                                            </>
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="농장번호"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        농장 전화 번호
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="농장번호"
                                            name="farmPhone"
                                            type="text"
                                            onChange={handleChangeFarm}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="농부 경력"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        농부 경력
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="농부 경력"
                                            name="farmCareer"
                                            type="text"
                                            onChange={handleChangeFarm}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="농장 평 수"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        농장 평 수
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="농장 평 수"
                                            name="farmSize"
                                            type="text"
                                            onChange={handleChangeFarm}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="농장 카테고리"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        농장 카테고리
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="농장 카테고리"
                                            name="farmCategory"
                                            autoComplete="country-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            onChange={handleChangeFarm}
                                        >
                                            <option>가지과</option>
                                            <option>국화과</option>
                                            <option>꿀풀과</option>
                                            <option>미나리과</option>
                                            <option>민트과</option>
                                            <option>박과</option>
                                            <option>배추과</option>
                                            <option>백합과</option>
                                            <option>오이과</option>
                                            <option>콩과</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="대표 작물"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        대표 작물
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="대표 작물"
                                            name="cropDictNo"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            onChange={handleChangeFarmCrop}
                                        >
                                            {farmCrop.map((crop, idx) => (
                                                <>
                                                    <option>
                                                        {crop['cropName']}
                                                    </option>
                                                </>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="농장 주소"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        농장 주소
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="farmAddress"
                                            id="농장 주소"
                                            onChange={handleChangeFarm}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label
                                        htmlFor="연락 가능 시간"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        연락 가능 시간
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="farmConnect"
                                            id="연락 가능 시간"
                                            onChange={handleChangeFarm}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        );
    };

    return (
        <>
            <div className="border-2 border-sky-200 mt-10 m-2 p-4">
                {result ? (
                    <ResultModal
                        title={'처리결과'}
                        content={result}
                        callbackFnc={closeModal}
                    ></ResultModal>
                ) : (
                    <></>
                )}

                <div className="flex justify-left">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        {renderFields()}
                    </div>
                </div>

                <div className="flex justify-end p-4">
                    <button
                        type="button"
                        className="inline-block rounded p-4 m-2 text-xl w-32  text-white bg-red-500"
                        onClick={handleClickDelete}
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                        onClick={handleClickModify}
                    >
                        Modify
                    </button>
                </div>
            </div>
        </>
    );
}
