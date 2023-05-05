import React, { useState } from "react";
import "./Filters.scss";
import { IoFilter } from "react-icons/io5";
import { CgPhone } from "react-icons/cg";
import { RiArrowUpDownFill } from "react-icons/ri";
import { AiOutlineDropbox } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { formatLabel, onWheel } from "../../../uitls";
import usePreventBodyScroll from "../../../hooks/usePreventBodyScroll";

const sims = ["robi", "airtel", "banglalink", "grameenphone"];
const expiries = [
  {
    value: "All",
    format: "all",
  },
  {
    value: 30,
    format: "day",
  },
  {
    value: 15,
    format: "day",
  },
  {
    value: 7,
    format: "day",
  },
  {
    value: 3,
    format: "day",
  },
];
const categories = [
  {
    label: "internet",
    icon: <RiArrowUpDownFill />,
  },
  {
    label: "minute",
    icon: <CgPhone />,
  },
  {
    label: "bundle",
    icon: <AiOutlineDropbox />,
  },
];

const Filters = () => {
  const { disableScroll, enableScroll } = usePreventBodyScroll();
  const [params] = useSearchParams();

  const navigate = useNavigate();

  const [filterUpdated, setfilterUpdated] = useState(false);

  const [selectedSim, setselectedSim] = useState(params.get("sim") || "robi");
  const [selectedCategory, setselectedCategory] = useState(
    params.get("category") || "internet"
  );
  const [selectedExpiry, setselectedExpiry] = useState(
    params.get("expiry") || "All all"
  );

  const handleSimClick = (sim) => {
    params.set("sim", sim);
    setselectedSim(sim);
    setfilterUpdated(true);
  };
  const handleCategoryClick = (category) => {
    params.set("category", category);
    setselectedCategory(category);
    setfilterUpdated(true);
  };
  const handleExpiryClick = (expiry) => {
    if (expiry.value == "All") {
      params.delete("expiry");
    } else {
      params.set("expiry", `${expiry.value} ${expiry.format}`);
    }
    setselectedExpiry(`${expiry.value} ${expiry.format}`);
    setfilterUpdated(true);
  };

  const handleUpdateClick = () => {
    console.log(params.toString());
    setfilterUpdated(false);
    navigate(`/vip-offers?${params.toString()}`);
  };

  return (
    <div className="offers__filters">
      <div className="title-btn__apply">
        <span className="title">
          <IoFilter /> Filter
        </span>

        <button
          disabled={!filterUpdated}
          className={`btn__apply ${filterUpdated && "show__btn"}`}
          onClick={() => handleUpdateClick()}
        >
          <BsCheckLg size={18} /> Apply
        </button>
      </div>

      <div
        onMouseEnter={disableScroll}
        onMouseLeave={enableScroll}
        className="offers__filters__sim"
      >
        <ScrollMenu onWheel={onWheel}>
          {sims.map((sim) => (
            <div
              key={sim}
              className={`offers__filters__sim__item ${sim} ${
                selectedSim == sim && "--selected"
              }`}
              onClick={() => handleSimClick(sim)}
            >
              {formatLabel(sim)}
            </div>
          ))}
        </ScrollMenu>
      </div>

      <hr />

      <div className="stick-to-top">
        <div
          onMouseEnter={disableScroll}
          onMouseLeave={enableScroll}
          className="offers__filters__category"
        >
          <ScrollMenu onWheel={onWheel}>
            {categories.map((category) => (
              <div
                key={category.label}
                className={`offers__filters__category__item ${
                  selectedCategory == category.label && "--selected"
                }`}
                onClick={() => handleCategoryClick(category.label)}
              >
                {category.icon}
                <span>{formatLabel(category.label)}</span>
              </div>
            ))}
          </ScrollMenu>
        </div>

        <hr />

        <div
          onMouseEnter={disableScroll}
          onMouseLeave={enableScroll}
          className="offers__filters__expiry"
        >
          <ScrollMenu onWheel={onWheel}>
            {expiries.map((expiryObj) => (
              <div
                className={`offers__filters__expiry__item ${
                  selectedExpiry == `${expiryObj.value} ${expiryObj.format}` &&
                  "--selected"
                }`}
                key={expiryObj.value}
                onClick={() => handleExpiryClick(expiryObj)}
              >
                <span>
                  {expiryObj.value}{" "}
                  {expiryObj.format != "all" &&
                    expiryObj.format != "unlimited" &&
                    expiryObj.format}
                </span>
              </div>
            ))}
          </ScrollMenu>
        </div>
      </div>
    </div>
  );
};

export default Filters;
