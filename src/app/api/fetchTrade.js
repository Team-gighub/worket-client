/**
 * 로그인 안 된 상태에서도 접근할 수 있는 통합거래 api
 * clientName, freelancerName, title 등 받아옴
 *
 * TODO: api역할에 맞게 파일명, 함수명 변경 필요
 */

export const getTradeInfo = async (id) => {
  //TODO: 실제 API 호출로 교체 필요
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        clientName: "홍길동_로그인전",
        freelancerName: "김철수_로그인전",
        title: "웹사이트 개발 프로젝트",
      });
    }, 5000),
  );
};
