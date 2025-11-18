import TradeDataHydrator from "@/components/trade/TradeDataHydrator";
import TradeViewLoginRequired from "@/components/trade/views/TradeViewLoginRequired";
import { getTransactionsDetail } from "@/lib/api/server/transactionServices";
import { getServerAuthTokens } from "@/lib/authUtils";

const TradeLayout = async ({ params, children }) => {
  const { id } = await params;
  const { accessToken } = await getServerAuthTokens();
  if (!accessToken) {
    return <TradeViewLoginRequired id={id} />;
  }

  const { data } = await getTransactionsDetail(id);
  return <TradeDataHydrator initialData={data}>{children}</TradeDataHydrator>;
};

export default TradeLayout;
