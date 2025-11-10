import TradeViewLoginRequired from "@/components/trade/views/TradeViewLoginRequired";
import TradeViewCreated from "@/components/trade/views/TradeViewCreated";
import TradeViewSigned from "@/components/trade/views/TradeViewSigned";
import TradeViewDepositHold from "@/components/trade/views/TradeViewDepositHold";
import TradeViewPaymentConfirmed from "@/components/trade/views/TradeViewPaymentConfirmed";
import TradeViewSettled from "@/components/trade/views/TradeViewSettled";
import { cookies } from "next/headers";

// TODO: 실제 API 연동 , 구현 시 파일 분리
const getTradeData = async (id, hasAuthToken) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (hasAuthToken) {
        // 로그인 후 데이터
        resolve({
          isLoggedIn: true,
          status: "SIGNED", // 로그인 후에는 상태가 SIGNED라고 가정
          clientName: "홍길동",
          freelancerName: "김철수",
        });
      } else {
        // 비로그인 데이터 (갑, 을 이름 정보만)
        resolve({
          isLoggedIn: false,
          clientName: "홍길동",
          freelancerName: "김철수",
        });
      }
    }, 3000),
  );
};

const Trade = async ({ params }) => {
  const { id } = await params;

  /** 페이지 처음 진입 시 사용자의 상태 확인
   * 1. 로그인 상태인지 아닌지
   *    1-1.  로그인 없이 접근해도 갑,을 이름정보 받아올 수 있어야함
   *    1-2. 거래 상태 & 거래 정보 받아오기
   * 확인 중엔 로딩 화면 표시 */

  // 쿠키에서 세션 토큰 확인
  // TODO: 실제 저장한 토큰 키로 변경
  const cookieStore = await cookies();
  const authToken = cookieStore.get("session_token");
  const hasAuthToken = authToken !== undefined;

  // 로그인 여부로 trade data 받아오기
  // TODO: 실제 API 연동 필요
  const tradeData = await getTradeData(id, hasAuthToken);

  // API에서 반환된 최종 로그인 상태 및 거래 상태를 사용
  const { isLoggedIn, status, clientName, freelancerName } = tradeData;

  /** 로그인 여부에 따른 분기 */
  if (!isLoggedIn)
    return (
      <TradeViewLoginRequired
        clientName={clientName}
        freelancerName={freelancerName}
      />
    );

  /** 거래 상태별 분기 */
  switch (status) {
    case "CREATED":
      return <TradeViewCreated />;
    case "SIGNED":
      return <TradeViewSigned />;
    case "DEPOSIT_HOLD":
      return <TradeViewDepositHold />;
    case "PAYMENT_CONFIRMED":
      return <TradeViewPaymentConfirmed />;
    case "SETTLED":
      return <TradeViewSettled />;
    default:
      return <p>{id}번 거래를 불러올 수 없습니다</p>;
  }
};

export default Trade;
