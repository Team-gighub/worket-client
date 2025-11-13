import getTransactionById from "@/app/api/fetchTransactions";
import TradeDataHydrator from "@/components/trade/TradeDataHydrator";
import TradeViewLoginRequired from "@/components/trade/views/TradeViewLoginRequired";
import { getServerAuthTokens } from "@/lib/authUtils";

const TradeLayout = async ({ params, children }) => {
  const { id } = params;
  const { accessToken } = await getServerAuthTokens();
  if (!accessToken) {
    return <TradeViewLoginRequired />;
  }

  const data = await getTransactionById(id);
  return <TradeDataHydrator initialData={data}>{children}</TradeDataHydrator>;
};

export default TradeLayout;
