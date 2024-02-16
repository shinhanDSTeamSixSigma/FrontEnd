import { useEffect, useState } from 'react';
import { getOne } from '../../api/farmApi';
import useCustomMove from '../../hooks/useCustomMove';
import Button from '../Button';
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

export default function FarmRead({ farmNo }) {
    const [farm, setFarm] = useState(initState);
    const { moveToList, moveToModify } = useCustomMove();
    const moveToListFunc = () => moveToList();
    const moveToModifyFunc = () => moveToModify();

    useEffect(() => {
        getOne(farmNo).then((data) => {
            console.log(data);
            setFarm(data);
        });
    }, [farmNo]);

    const renderFields = () => {
        return Object.keys(farm).map((key) => {
            if (key === `tb_member_no`) {
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
            <div className="border-2 border-sky-200 mt-10 m2 p-4">
                {renderFields()}
            </div>
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
        </>
    );
}
