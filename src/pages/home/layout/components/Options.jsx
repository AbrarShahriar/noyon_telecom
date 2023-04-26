import React from "react";
import "./Options.scss";

// @ts-ignore
import airtel from "../../../../assets/images/air.png";
// @ts-ignore
import robi from "../../../../assets/images/rb.png";
// @ts-ignore
import grameenphone from "../../../../assets/images/gr.png";
// @ts-ignore
import banglalink from "../../../../assets/images/bl.png";
// @ts-ignore
import recharge from "../../../../assets/images/recharge.png";
// @ts-ignore
import crown from "../../../../assets/images/crown.png";

import ViewMore from "./ViewMore";
import { useNavigate } from "react-router-dom";

const options = [
  {
    logo: robi,
    path: "/offers?sim=robi&category=internet",
    label: "Robi",
  },
  {
    logo: airtel,
    path: "/offers?sim=airtel&category=internet",
    label: "Airtel",
  },
  {
    logo: grameenphone,
    path: "/offers?sim=grameenphone&category=internet",
    label: "Grameenphone",
  },
  {
    logo: banglalink,
    path: "/offers?sim=banglalink&category=internet",
    label: "Banglalink",
  },
  {
    logo: recharge,
    path: "/recharge",
    label: "Recharge",
  },
  {
    logo: crown,
    path: "/vip-offers",
    label: "VIP Offers",
  },
];

const Options = () => {
  const navigate = useNavigate();
  return (
    <div className="options">
      {options.map((option) => (
        <div
          key={option.label}
          onClick={() => navigate(option.path)}
          className="option"
        >
          <img className="logo" src={option.logo} alt="" />
          <span>{option.label}</span>
        </div>
      ))}

      <ViewMore styles={{ bottom: "-15px", right: "15px" }} />
    </div>
  );
};
export default Options;
