import React from "react";
import { MdDateRange, MdOutlineSimCard } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import "./Deal.scss";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useStateValue } from "../../../shared/StateProvider";
import { formatLabel } from "../../../../uitls.js";

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
  simcard,
  showBuy = true,
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
        text: "Only VIP Members Can Buy These Offers. Do You Want To Be A  VIP Member?",
        icon: "question",
        showCancelButton: true,
        cancelButtonColor: "red",
        cancelButtonText: "No",
        showConfirmButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "green",
      }).then((result) => {
        if (result.isConfirmed) {
          return navigate("/membership");
        }
      });
    } else if (!isVipOnly) {
      navigate(`/offer-buy/${id}`);
    } else if (user.subscription == "premium") {
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

      <div className="less-priority expiry">
        <MdDateRange />
        <span className="value">{expiry}</span>
      </div>

      <div className="less-priority sim">
        <MdOutlineSimCard />
        <span className="value">{formatLabel(simcard)}</span>
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
        {showBuy && (
          <button onClick={handleBuyNowClick} className="btn__buy">
            BUY NOW
          </button>
        )}
      </div>
    </div>
  );
};
export default Deal;
