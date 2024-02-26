import axios from 'axios';

// export const API_SERVER_HOST = 'http://localhost:8080';

// export const API_SERVER_HOST = process.env.REACT_APP_API_URL;

export const baseUrl = process.env.REACT_APP_BASE_URL;
export const prefix = `${baseUrl}/api/farm`;

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
        withCredentials: true,
    });
    return res.data;
}

// 등록
export async function postAdd(farmObj) {
    const res = await axios.post(`${prefix}/register`, farmObj);
    console.log(farmObj);

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
    const res = await axios.get(`${prefix}/view/FARM/${farmNo}`, {
        withCredentials: true,
    });
    return res.data;
}

// 사진 삭제
export async function deleteFile(farmNo, fileName) {
    const res = await axios.delete(
        `${prefix}/deleteImage/FARM/${farmNo}/${fileName}`,
    );
    return res.data;
}
// 작물리스트 가져오기
export async function getFarmCrop() {
    const res = await axios.get(`${baseUrl}/crop-dict/list`, {
        withCredentials: true,
    });
    return res.data;
}

// 농장 작물 등록하기
export async function postFarmCrop(farmCropObj) {
    const res = await axios.post(`${prefix}/farmCrop`, farmCropObj);
    return res.data;
}

// 농장 작물 가져오기
export async function getFarmCropAll(farmNo) {
    const res = await axios.get(`${prefix}/${farmNo}/farmCropGet`, {
        withCredentials: true,
    });
    return res.data;
}
// 농장 작물 수정하기
export async function putFarmCrop(farmCropObj) {
    const res = await axios.put(
        `${prefix}/${farmCropObj.farmNo}/farmCropModify`,
        farmCropObj,
        {
            withCredentials: true,
        },
    );
    return res.data;
}
// 농장 작물 삭제하기
export async function deleteFarmCrop(farmNo) {
    const res = await axios.delete(`${prefix}/${farmNo}/farmCropDelete`, {
        withCredentials: true,
    });
    return res.data;
}

// 로그인 멤버 가져오기
export async function getMemberNo() {
    // const res = await axios.get(`${baseUrl}/user`, {

    const res = await axios.get(`${baseUrl}/user`, {
        withCredentials: true,
    });
    return res.data;
}

// 농장 검색
export async function searchFarm(searchTerm) {
    const res = await axios.get(`${baseUrl}/api/farm/search`, {
        params: { searchTerm },
    });
    return res.data;
}
// 농장의 멤버 데이터 가져오기
export async function getFarmMember(farmNo) {
    const res = await axios.get(`${prefix}/memberData/${farmNo}`);

    return res.data;
}
