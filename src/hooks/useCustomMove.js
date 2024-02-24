import { useState } from 'react';
import {
    createSearchParams,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';

const getNum = (param, defaultValue) => {
    if (!param) {
        return defaultValue;
    }

    return parseInt(param);
};

export default function useCustomMove() {
    const navigate = useNavigate();

    const [refresh, setRefresh] = useState(false);

    const [queryParams] = useSearchParams();

    const page = getNum(queryParams.get('page'), 1);
    const size = getNum(queryParams.get('size'), 10);

    const queryDefault = createSearchParams({ page, size }).toString();

    const moveToList = (pageParam) => {
        let queryStr = '';

        if (pageParam) {
            const pageNum = getNum(pageParam.page, page);
            const sizeNum = getNum(pageParam.size, size);

            queryStr = createSearchParams({
                page: pageNum,
                size: sizeNum,
            }).toString();
        } else {
            queryStr = queryDefault;
        }

        navigate({
            pathname: `/farm/list`,
            search: queryStr,
        });

        setRefresh(!refresh);
    };

    const moveToModify = (num) => {
        navigate({
            pathname: `/farm/modify/${num}`,
            search: queryParams.toString(), // 기존 쿼리 스트링 유지
        });
    };

    const moveToRead = (num) => {
        navigate({
            pathname: `/farm/read/${num}`,
            search: queryParams.toString(), // 기존 쿼리 스트링 유지
        });
    };

    const moveToPay = (num) => {
        navigate({
            pathname: `/farm/pay/${num}`,
            search: queryParams.toString(), // 기존 쿼리 스트링 유지
        });
    };

    return {
        moveToList,
        moveToModify,
        moveToRead,
        moveToPay,
        page,
        size,
        refresh,
    };
}
