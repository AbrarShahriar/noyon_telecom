import React from "react";
import { MdDateRange } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import "./Deal.scss";
import { useNavigate } from "react-router-dom";

const Deal = ({ type = "regular", bgColor = "", id = "wetwretet34" }) => {
  const navigate = useNavigate();

  const handleBuyNowClick = () => {
    navigate(`/buy/${id}`);
  };
  return (
    <div
      className={`deal --with-banner ${type}`}
      style={{ background: bgColor && bgColor }}
    >
      <span className="title">1GB (Limited Deal)</span>
      <span className="description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
        maxime.
      </span>

      <div className="expiry">
        <MdDateRange />
        <span className="expiry__value">3 Days</span>
      </div>

      <hr />

      <div className="price-btn__buy">
        <span className="price">
          <TbCurrencyTaka size={20} />
          {76}
        </span>
        <button onClick={handleBuyNowClick} className="btn__buy">
          BUY NOW
        </button>
      </div>
    </div>
  );
};
export default Deal;
