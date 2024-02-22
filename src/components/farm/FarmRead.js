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
            <div className="border-2  mt-10 m2 p-4">{renderFields()}</div>
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
