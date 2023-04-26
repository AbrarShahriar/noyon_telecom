import React from "react";
import "./Recharge.scss";
import RechargeItem from "./component/RechargeItem";
import AppBar from "../shared/AppBar";
import { useQuery } from "react-query";
import { getAllRecharge } from "../../api/queries/recharge";
import { PageLoader } from "../shared/SuspenseWrapper";

const Recharge = () => {
  const { isLoading, data: res } = useQuery(
    ["recharge", "list"],
    getAllRecharge,
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <div className="recharge">
      <AppBar title="Recharge" />
      <div className="recharge__list">
        {res?.data &&
          res?.data.map((recharge) => (
            <RechargeItem
              key={recharge.id}
              id={recharge.id}
              amount={recharge.amount}
            />
          ))}
      </div>
    </div>
  );
};
export default Recharge;
