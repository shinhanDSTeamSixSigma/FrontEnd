import axios from 'axios';

export const API_SERVER_HOST = 'http://localhost:8090';

const prefix = `${API_SERVER_HOST}/api/farm`;

export async function getOne(farmNo) {
    const res = await axios.get(`${prefix}/${farmNo}`);
    // {params: {memberNo:memberNo}} 쿼리스트링으로 보내기
    return res.data;
}

export async function getAllList() {
    const res = await axios.get(`${prefix}/farm-all`);
    return res.data;
}

export async function getPaging(pageParam) {
    const { page, size } = pageParam;
    const res = await axios.get(`${prefix}/list`, {
        params: { page: page, size: size },
    });
    return res.data;
}
