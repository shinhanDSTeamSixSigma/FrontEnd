import axios from 'axios';

export const baseUrl = process.env.REACT_APP_BASE_URL;

// 사진 조회
export async function getListAllFile(diaryNo) {
    const res = await axios.get(`${baseUrl}/view/FARM/${diaryNo}`);
    return res.data;
}
// 사진 등록
export async function farmAddFile(fileObj) {
    const header = { headers: { 'Content-Type': 'multipart/form-data' } };

    const res = await axios.post(`${baseUrl}/registFile`, fileObj, header);

    return res.data;
}
// 사진 삭제
export async function deleteFile(diaryNo, fileName) {
    const res = await axios.delete(
        `${baseUrl}/deleteImage/DIARY/${diaryNo}/${fileName}`,
    );
    return res.data;
}
