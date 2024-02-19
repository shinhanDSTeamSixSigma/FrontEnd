import axios from 'axios';

export const API_SERVER_HOST = 'http://localhost:8090';

export const prefix = `${API_SERVER_HOST}/api/farm`;

export async function getMember() {
    const res = await axios.get(`${prefix}/member-detail`);
    return res.data;
}

// 상세조회
export async function getOne(farmNo) {
    const res = await axios.get(`${prefix}/${farmNo}`);
    // {params: {memberNo:memberNo}} 쿼리스트링으로 보내기
    return res.data;
}

// 전체조회
export async function getAllList() {
    const res = await axios.get(`${prefix}/farm-all`);
    return res.data;
}

// 페이징 조회
export async function getPaging(pageParam) {
    const { page, size } = pageParam;
    const res = await axios.get(`${prefix}/list`, {
        params: { page: page, size: size },
    });
    return res.data;
}

// 등록
export async function postAdd(farmObj) {
    const res = await axios.post(`${prefix}/register`, farmObj);

    return res.data;
}

// 사진 등록
export async function farmAddFile(fileObj) {
    const header = { headers: { 'Content-Type': 'multipart/form-data' } };

    const res = await axios.post(`${prefix}/registFile`, fileObj, header);

    return res.data;
}

// 수정
export async function putOne(farmObj) {
    const res = await axios.put(`${prefix}/${farmObj.farmNo}`, farmObj);
    return res.data;
}
// 삭제
export async function deleteOne(farmNo) {
    const res = await axios.delete(`${prefix}/${farmNo}`);
    return res.data;
}

// 사진 조회
export async function getListAllFile(farmNo) {
    const res = await axios.get(`${prefix}/view/FARM/${farmNo}`);
    return res.data;
}

// 사진 삭제
export async function deleteFile(farmNo, fileName) {
    const res = await axios.delete(
        `${prefix}/deleteImage/FARM/${farmNo}/${fileName}`,
    );
    return res.data;
}
