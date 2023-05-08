import React from "react";
import { MySwal } from "../../../uitls";
import { TbCurrencyTaka } from "react-icons/tb";
import { useStateValue } from "../../shared/StateProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RechargeItem = ({ amount, id }) => {
  // @ts-ignore
  const [{ loggedIn, user }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const handleBuyClick = () => {
    if (loggedIn) {
      navigate(`/recharge-buy/${amount}`);
    } else {
      MySwal.fire({
        title: <p style={{ fontSize: 20 }}>Login To Buy Offer</p>,
      });
    }
  };

  return (
    <div className="recharge__item">
      <p className="amount">
        <TbCurrencyTaka /> {amount}
      </p>

      <button onClick={handleBuyClick} className="btn__buy">
        Recharge
      </button>
    </div>
  );
};
export default RechargeItem;
