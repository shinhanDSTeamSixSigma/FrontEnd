import { useState, useEffect } from 'react';
import {
    postAdd,
    farmAddFile,
    getFarmCrop,
    postFarmCrop,
    getMemberNo,
} from '../../api/farmApi';
import useCustomMove from '../../hooks/useCustomMove';
import ResultModal from '../modal/ResultModal';

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { FaPooStorm } from 'react-icons/fa';

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
    memberNo: 0,
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

export default function AddFarm() {
    const [farm, setFarm] = useState({ ...initState });
    const [file, setFile] = useState({ ...fileInitState });
    const [crop, setCrop] = useState({ ...farmCropInitState }); // 보낼 농작물들
    const [farmCrop, setFarmCrop] = useState([]); // 가져올 농작물들
    const [memberData, setMemberData] = useState();

    const [result, setResult] = useState(null); //농장 결과 상태
    const [fileReuslt, setFileResult] = useState(null); // 파일 결과

    const { moveToList } = useCustomMove(); //useCustomMove 활용

    useEffect(() => {
        // 서버에서 사용자 정보 가져오기
        getMemberNo()
            .then((res) => {
                setMemberData(res);
                console.log(res);

                console.log('멤버데이터 ', JSON.stringify(res.memberNo));
                if (res.role !== 'FARMER') {
                    console.log(res.role);
                    alert('농부만 들어갈 수 있는 페이지 입니다!');
                    window.location.href = '/';
                }
            })
            .catch((error) => {
                console.log('데이터 안옴!!!!!!');
                console.error(error);
            });
    }, []);

    useEffect(() => {});
    const handleChangeFarmCrop = (e) => {
        const { name, value } = e.target;
        setCrop({ ...crop, [name]: value });
    };
    useEffect(() => {
        getFarmCrop().then((data) => {
            console.log('test:' + JSON.stringify(data));

            setFarmCrop(data);
        });
    }, []);

    const handleChangeFarm = (e) => {
        farm[e.target.name] = e.target.value;
        setFarm({ ...farm });
    };

    const handleChangeFile = (e) => {
        setFile({ ...file, files: e.target.files });
        const updatedFileData = { ...file, files: e.target.files };
        setFile(updatedFileData);
    };

    const fileData = { ...file };
    const farmData = { ...farm, memberNo: memberData.memberNo };

    const handleClickAdd = () => {
        postAdd(farmData)
            .then((result) => {
                console.log(result);
                const farmNo = result['FarmNO']; // 농장번호
                setResult(farmNo); //결과 데이터 변경

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
                postFarmCrop({ farmNo: farmNo, cropName: crop.cropDictNo })
                    .then((farmCropResuslt) => {
                        console.log(farmCropResuslt);
                        setCrop({ ...farmCropInitState });
                    })
                    .catch((e) => {
                        console.error(e);
                    });

                setFarm({ ...initState });
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const closeModal = () => {
        setResult(null);
        moveToList(); //moveToList( )호출
    };

    const renderFields = () => {
        return (
            <>
                <form>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h1 className="text-xl font-semibold leading-7 text-gray-900">
                                농장 정보
                            </h1>
                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                작성하신 내용은 농장 소개에 공개적으로 보이는
                                내용입니다.
                            </p>

                            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                                        class="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                    >
                                        <div class="flex flex-col items-center justify-center pt-3 pb-4">
                                            <svg
                                                class="w-6 h-6 mb-3 text-gray-500 dark:text-gray-400"
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
                                            type="file"
                                            class="hidden"
                                            onChange={handleChangeFile}
                                            multiple={true}
                                        />
                                    </label>
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

                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 space-y-10">
                                <legend className="text-sm font-semibold leading-6 text-gray-900">
                                    푸시 알림
                                </legend>

                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-everything"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label
                                            htmlFor="push-everything"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            어디든
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-email"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label
                                            htmlFor="push-email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            이메일
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-nothing"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label
                                            htmlFor="push-nothing"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            동의하지 않습니다
                                        </label>
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
        <div className="border-2  mt-10 m-2 p-4">
            {/* 모달 처리 */}

            {result ? (
                <ResultModal
                    title={'추가 완료'}
                    content={`새로운 FarmNo - ${result} 추가`}
                    callbackFnc={closeModal}
                />
            ) : (
                <></>
            )}

            <div className="flex justify-left">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    {renderFields()}
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    type="button"
                    className="rounded w-20 h-10 text-center bg-[#4F6F52] text-xm  text-white "
                    onClick={handleClickAdd}
                >
                    농장 등록
                </button>
            </div>
        </div>
    );
}
