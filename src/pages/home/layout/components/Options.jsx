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
import ViewMore from "./ViewMore";
import { useNavigate } from "react-router-dom";

const Options = () => {
  const navigate = useNavigate();
  return (
    <div className="options">
      <div onClick={() => navigate("/offers?sim=robi")} className="option">
        <img className="logo" src={robi} alt="" />
        <span>Robi</span>
      </div>
      <div onClick={() => navigate("/offers?sim=airtel")} className="option">
        <img className="logo" src={airtel} alt="" />
        <span>Airtel</span>
      </div>
      <div
        onClick={() => navigate("/offers?sim=grameenphone")}
        className="option"
      >
        <img className="logo" src={grameenphone} alt="" />
        <span>Grameenphone</span>
      </div>
      <div
        onClick={() => navigate("/offers?sim=banglalink")}
        className="option"
      >
        <img className="logo" src={banglalink} alt="" />
        <span>Banglalink</span>
      </div>

      <ViewMore styles={{ bottom: "-15px", right: "15px" }} />
    </div>
  );
};
export default Options;
