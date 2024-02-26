import axios from 'axios';

export const baseUrl = process.env.REACT_APP_BASE_URL;

// 사진 조회
export async function getDiaryFile(diaryNo) {
    const res = await axios.get(`${baseUrl}/diary/img/DIARY`, {
        params: { diaryNo: diaryNo },
    });
    return res.data;
}
// 사진 등록
export async function diaryAddFile(fileObj) {
    const header = { headers: { 'Content-Type': 'multipart/form-data' } };

    const res = await axios.post(
        `${baseUrl}/diary/registFile`,
        fileObj,
        header,
    );
    return res.data;
}
// 사진 삭제
export async function diarydeleteFile(diaryNo, fileName) {
    const res = await axios.delete(
        `${baseUrl}/diary/deleteImage/DIARY/${diaryNo}/${fileName}`,
    );
    return res.data;
}
