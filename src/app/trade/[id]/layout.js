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
  const { accessToken } = await getServerAuthTokens();
  if (!accessToken) {
    return <TradeViewLoginRequired id={id} />;
  }

  const { data: permissionData } = await getTransactionsPermissions(id);
  //TODO: 거래에 권한 없을 때(403) 추가
  if (permissionData.userRole == "FREELANCER") return <TradeViewNoPermission />;
  console.log(permissionData);

  const { data: tradeData } = await getTransactionsDetail(id);
  return (
    <TradeDataHydrator initialData={tradeData}>{children}</TradeDataHydrator>
  );
};

export default TradeLayout;
