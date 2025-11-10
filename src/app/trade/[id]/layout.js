import TradeDataHydrator from "@/components/trade/TradeDataHydrator";
import TradeViewLoginRequired from "@/components/trade/views/TradeViewLoginRequired";
import { cookies } from "next/headers";

const getTradeData = async (id, hasAuthToken) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (true) {
        // 로그인 후 데이터
        resolve({
          isLoggedIn: true,
          status: "CREATED", // 로그인 후에는 상태가 SIGNED라고 가정
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
    }, 5000),
  );
};

const TradeLayout = async ({ params, children }) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const hasAuthToken = cookieStore.get("session_token") !== undefined;

  const tradeData = await getTradeData(id, hasAuthToken);
  const { isLoggedIn, clientName, freelancerName } = tradeData;

  if (!isLoggedIn) {
    return (
      <TradeViewLoginRequired
        clientName={clientName}
        freelancerName={freelancerName}
      />
    );
  }

  return (
    <TradeDataHydrator initialData={tradeData}>{children}</TradeDataHydrator>
  );
};

export default TradeLayout;
