import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_S3_BUCKET_URL;
// 1) Presigned URL 요청 (s3-worket-bucket/signatures/ 디렉토리로 업로드)
export const getPresignedUrl = async (filename, contentType, md5) => {
  try {
    const res = await axios.get(baseURL + "/getPresignedUrl", {
      params: {
        filename: filename,
        contentType: contentType,
        md5: md5,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
// 2) S3 업로드
export const uploadToS3 = (url, file, md5) => {
  return axios.put(url, file, {
    headers: {
      "Content-Type": file.type,
      "Content-MD5": md5, // Object Lock 필수
    },
  });
};
