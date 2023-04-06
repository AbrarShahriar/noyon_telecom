import React from "react";
import "./Stats.scss";
import InOut from "../../../../shared/stats/InOut";
import { TbCurrencyTaka } from "react-icons/tb";

const Stats = () => {
  return (
    <div className="admin__stats admin__card">
      <h3>Stats</h3>
      <InOut />

      <div className="profit">
        <p>Profit:</p>
        <TbCurrencyTaka size={18} strokeWidth={3} />
        <p className="value">{13240 - 12345}</p>
      </div>
    </div>
  );
};
export default Stats;
