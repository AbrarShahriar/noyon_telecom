import React, { useEffect, useState } from "react";
import "./Stats.scss";
import InOut from "../../../../shared/stats/InOut";
import { TbCurrencyTaka } from "react-icons/tb";
import { useQuery } from "react-query";
import { getTotalInOut } from "../../../../../api/queries/admin";
import { getModeratorInAndOut } from "../../../../../api/queries/moderator";

const Stats = ({ isModerator }) => {
  const [data, setdata] = useState([]);

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
      onSuccess: (res) => setdata(res.data),
    });

  useEffect(() => {
    if (isModerator) {
      fetchModeratorData();
    } else {
      fetchAdminData();
    }
  }, []);

  if (isAdminLoading) {
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

        <div className="profit">
          <p>Profit:</p>
          <TbCurrencyTaka size={18} strokeWidth={3} />
          <p className="value">
            {
              // @ts-ignore
              `${data.inVal - data.outVal || 0}`
            }
          </p>
        </div>
      </div>
    )
  );
};
export default Stats;
