import React from "react";
import HistoryCard from "./HistoryCard";
import { getTotalHistory } from "../../../api/queries/history";
import { useQuery } from "react-query";
import { useStateValue } from "../../shared/StateProvider";
import { PageLoader } from "../../shared/SuspenseWrapper";

const TotalHistory = ({ setinVal, setoutVal }) => {
  // @ts-ignore
  const [{ user }] = useStateValue();

  const {
    isSuccess,
    isLoading,
    data: res,
  } = useQuery(["history", "list", "all"], () => getTotalHistory(user.phone));

  React.useEffect(() => {
    if (res?.data) {
      let filteredIn = res?.data.filter((el) => el.historyType == "topup");
      let filteredOut = res?.data.filter((el) => el.historyType != "topup");

      let inInit = 0;
      filteredIn.forEach((el) => (inInit += el.amount));

      setinVal(inInit);

      let outInit = 0;
      filteredOut.forEach((el) => (outInit += el.amount));
      setoutVal(outInit);
    }
  }, [res]);

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <>
      {res?.data.map((el, i) => (
        <HistoryCard
          key={i}
          type={el.historyType}
          amount={el.amount}
          date={el.historyDate}
          transactionId={el.transactionId}
          desc={el.desc}
        />
      ))}
    </>
  );
};
export default TotalHistory;
