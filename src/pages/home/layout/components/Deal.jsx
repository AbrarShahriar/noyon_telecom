import React from "react";
import { MdDateRange } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import "./Deal.scss";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useStateValue } from "../../../shared/StateProvider";

const Deal = ({
  type = "regular",
  bgColor = "",
  id,
  title,
  desc,
  expiry,
  discountPrice,
  regularPrice,
  isVipOnly = false,
}) => {
  const navigate = useNavigate();

  // @ts-ignore
  const [{ user }] = useStateValue();

  const handleBuyNowClick = () => {
    if (!user) {
      return Swal.fire({
        title: "Login To Continue",
        icon: "info",
      });
    }
    console.log(isVipOnly, user.subscription);
    if (isVipOnly && user.subscription == "regular") {
      return Swal.fire({
        title: "VIP ONLY!",
        text: "Only VIP Members Can Buy These Offers.",
        icon: "question",
      });
    } else if (!isVipOnly) {
      navigate(`/offer-buy/${id}`);
    }
  };
  return (
    <div
      className={`deal --with-banner ${type}`}
      style={{ background: bgColor && bgColor }}
    >
      <span className="title">{title}</span>
      <span className="description">{desc}</span>

      <div className="expiry">
        <MdDateRange />
        <span className="expiry__value">{expiry}</span>
      </div>

      <hr />

      <div className="price-btn__buy">
        <span className="price regular">
          <TbCurrencyTaka className="icon" size={20} />
          {regularPrice}
        </span>
        <span className="price discount">
          <TbCurrencyTaka size={20} className="icon" />
          {discountPrice}
        </span>
        <button onClick={handleBuyNowClick} className="btn__buy">
          BUY NOW
        </button>
      </div>
    </div>
  );
};
export default Deal;
