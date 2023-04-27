import React from "react";
// @ts-ignore
import noData from "../../assets/images/no-data.png";
import "./Nothing.scss";

const Nothing = ({ title = "" }) => {
  return (
    <div className="no-data">
      <div className="container">
        <img src={noData} alt="no data" />
        <p>{title}</p>
      </div>
    </div>
  );
};
export default Nothing;
