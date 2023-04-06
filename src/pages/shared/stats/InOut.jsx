import React from "react";
import "./InOut.scss";

import { BiPlus, BiMinus } from "react-icons/bi";
import { TbCurrencyTaka } from "react-icons/tb";

const InOut = ({
  tabbed = false,
  selectedTabIndex = 0,
  selectedMonth = "",
}) => {
  return (
    <div className="in-out">
      <div className="in">
        <div className="header">
          <BiPlus />
          <p>In</p>
          <span>{tabbed && selectedTabIndex == 0 && selectedMonth}</span>
        </div>
        <div className="content">
          <TbCurrencyTaka strokeWidth={3} />
          <span>13460</span>
        </div>
      </div>
      <div className="out">
        <div className="header">
          <BiMinus />
          <p>Out</p>
          <span>{selectedTabIndex == 0 && selectedMonth}</span>
        </div>
        <div className="content">
          <TbCurrencyTaka strokeWidth={3} />
          <span>1390</span>
        </div>
      </div>
    </div>
  );
};
export default InOut;
