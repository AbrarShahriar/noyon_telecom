import React, { useEffect, useState } from "react";
import "./Stats.scss";
import InOut from "../../../../shared/stats/InOut";
import { TbCurrencyTaka } from "react-icons/tb";
import { useQuery } from "react-query";
import { getTotalInOut } from "../../../../../api/queries/admin";
import { getModeratorInAndOut } from "../../../../../api/queries/moderator";
import { useStateValue } from "../../../../shared/StateProvider";
import { ACTION_TYPES } from "../../../../../reducer";

const Stats = ({ isModerator }) => {
  const [data, setdata] = useState([]);

  // @ts-ignore
  const [{}, dispatch] = useStateValue();

  const { isLoading: isAdminLoading, refetch: fetchAdminData } = useQuery(
    ["admin", "stat", "in-out"],
    getTotalInOut,
    {
      enabled: false,
      onSuccess: (res) => setdata(res.data),
    }
  );

  // @ts-ignore
  const { isLoading: isModeratorLoading, refetch: fetchModeratorData } =
    useQuery(["moderator", "stat", "in-out"], getModeratorInAndOut, {
      enabled: false,
      onSuccess: (res) => {
        setdata(res.data);
        dispatch({
          type: ACTION_TYPES.UPDATE_MODERATOR_BALANCE,
          payload: { moderatorBalance: res.data.inVal - res.data.outVal || 0 },
        });
      },
    });

  useEffect(() => {
    if (isModerator) {
      fetchModeratorData();
    } else {
      fetchAdminData();
    }
  }, []);

  if (isAdminLoading || isModeratorLoading) {
    return <></>;
  }

  return (
    data && (
      <div className="admin__stats admin__card">
        <h3>Stats</h3>
        <InOut
          inValue={
            // @ts-ignore
            data.inVal
          }
          // @ts-ignore
          outValue={data.outVal}
        />
        <div className="profit stat-card">
          <p>{isModerator ? "Balance:" : "Profit:"}</p>
          <TbCurrencyTaka size={18} strokeWidth={3} />
          <p className="value">
            {
              // @ts-ignore
              `${data.inVal - data.outVal || 0}`
            }
          </p>
        </div>
        {!isModerator && (
          <>
            <div className="total-user-balance stat-card">
              <p>Total User Balance:</p>
              <TbCurrencyTaka size={18} strokeWidth={3} />
              <p className="value">
                {
                  // @ts-ignore
                  `${data.userBalance || 0}`
                }
              </p>
            </div>
            <div className="total-user-balance stat-card">
              <p>Total Recharge:</p>
              <TbCurrencyTaka size={18} strokeWidth={3} />
              <p className="value">
                {
                  // @ts-ignore
                  `${data.totalRecharge || 0}`
                }
              </p>
            </div>
          </>
        )}
      </div>
    )
  );
};
export default Stats;
