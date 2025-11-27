import TradeDataHydrator from "@/components/trade/TradeDataHydrator";
import TradeViewLoginRequired from "@/components/trade/views/TradeViewLoginRequired";
import TradeViewNoPermission from "@/components/trade/views/TradeViewNoPermission";
import {
  getTransactionsDetail,
  getTransactionsPermissions,
} from "@/lib/api/server/transactionServices";
import { getServerAuthTokens } from "@/lib/authUtils";

const TradeLayout = async ({ params, children }) => {
  const { id } = await params;
  //(case1) Cookie에 accessToken이 없을 경우
  const { accessToken } = await getServerAuthTokens();
  if (!accessToken) {
    return <TradeViewLoginRequired id={id} />;
  }

  //(case2) 권한 여부 확인
  const { data: permissionData } = await getTransactionsPermissions(id);
  if (permissionData.customCode === "ACCESS_1001") {
    return <TradeViewLoginRequired id={id} />;
  } else if (
    permissionData.userRole === "FREELANCER" ||
    permissionData.customCode === "ACCESS_3001"
  )
    return <TradeViewNoPermission />;

  //(case3) 거래 정보 가져오기
  const { data: tradeData } = await getTransactionsDetail(id, "CLIENT");
  if (tradeData?.httpStatus === 401) {
    return <TradeViewLoginRequired id={id} />;
  }

  return (
    <TradeDataHydrator initialData={tradeData}>{children}</TradeDataHydrator>
  );
};

export default TradeLayout;
