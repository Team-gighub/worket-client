import TradeDataHydrator from "@/components/trade/TradeDataHydrator";
import TradeViewLoginRequired from "@/components/trade/views/TradeViewLoginRequired";
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
  if (permissionData.permission == false) return <div>권한 없음!</div>;

  const { data: tradeData } = await getTransactionsDetail(id);
  return (
    <TradeDataHydrator initialData={tradeData}>{children}</TradeDataHydrator>
  );
};

export default TradeLayout;
