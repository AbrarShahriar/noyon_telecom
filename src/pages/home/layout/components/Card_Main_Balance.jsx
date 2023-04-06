import React from "react";
import "./Card_Main_Balance.scss";
import { TbCashBanknote, TbPigMoney, TbCurrencyTaka } from "react-icons/tb";
import {
  MdKeyboardArrowDown,
  MdOutlineConfirmationNumber,
} from "react-icons/md";
import { IoCaretUpSharp, IoCaretDownSharp } from "react-icons/io5";
import ViewMore from "./ViewMore";
import { useNavigate } from "react-router-dom";

const Card_Main_Balance = () => {
  const navigate = useNavigate();
  return (
    <div className="card__main__balance shadow">
      <span className="title">Main Balance</span>
      <div className="balance__actions">
        <span className="balance">
          <TbCurrencyTaka size={32} strokeWidth={3} />
          2.87
        </span>
        <div className="actions">
          <button
            onClick={() => navigate("/topup")}
            className="btn__add-balance"
          >
            Add Balance
          </button>
        </div>
      </div>
      <hr />
      <div className="statistics">
        <div className="stat total-offer">
          <MdOutlineConfirmationNumber size={20} />
          <span className="value">17</span>
          <span className="label">Bought</span>
        </div>

        <div className="stat saved">
          <div className="icons">
            <TbPigMoney size={20} />
            <IoCaretUpSharp color="green" />
          </div>
          <span className="value">
            <TbCurrencyTaka strokeWidth={3} size={17} />
            {23}
          </span>
          <span className="label">Saved</span>
        </div>

        <div className="stat spent">
          <div className="icons">
            <TbCashBanknote size={20} />
            <IoCaretDownSharp color="red" />
          </div>

          <span className="value">
            <TbCurrencyTaka strokeWidth={3} size={17} />
            {145}
          </span>
          <span className="label">Spent</span>
        </div>
      </div>
      <ViewMore styles={{ right: "15px" }} />
    </div>
  );
};
export default Card_Main_Balance;
