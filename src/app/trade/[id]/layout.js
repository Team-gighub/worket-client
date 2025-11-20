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
  if (permissionData.customCode === "ACCESS_1001") {
    return <TradeViewLoginRequired id={id} />;
  } else if (
    permissionData.userRole === "FREELANCER" ||
    permissionData.customCode === "ACCESS_3001"
  )
    return <TradeViewNoPermission />;

  const { data: tradeData } = await getTransactionsDetail(id);
  console.log(tradeData);
  return (
    <TradeDataHydrator initialData={tradeData}>{children}</TradeDataHydrator>
  );
};

export default TradeLayout;
