import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_S3_BUCKET_URL;
const bucketName = "s3-worket-bucket";
/**
 * S3 Presigned URL 가져오기
 * @param {string} bucketName
 * @param {string} fileUrl 원본 파일 URL
 * @returns {Promise<string>} presigned URL
 */
export const getDownloadPresignedUrl = async (fileUrl) => {
  // URL에서 파일 경로 추출
  let urlObj;
  try {
    urlObj = new URL(fileUrl); // 절대 URL이면 그대로
  } catch (err) {}
  let fileName = urlObj?.pathname;
  if (fileName.startsWith("/")) fileName = fileName.substring(1);

  // Spring Boot 서버에 GET 요청
  const response = await axios.get(`${baseURL}/getDownloadPresignedUrl`, {
    params: {
      bucket: bucketName,
      filename: fileName,
    },
  });
  const presignedUrl = response.data.url;
  return presignedUrl;
};
