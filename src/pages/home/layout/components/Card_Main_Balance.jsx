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
import { useStateValue } from "../../../shared/StateProvider";
import { useQuery } from "react-query";
import { userData } from "../../../../api/queries/profile";
import { PageLoader } from "../../../shared/SuspenseWrapper";
import { ACTION_TYPES } from "../../../../reducer";

const Card_Main_Balance = () => {
  const navigate = useNavigate();
  // @ts-ignore
  const [{ user }, dispatch] = useStateValue();

  const { isLoading, data: res } = useQuery(
    ["user", "info", "stat"],
    userData,
    {
      retry: false,
      onSuccess: (res) => {
        dispatch({
          type: ACTION_TYPES.UPDATE_USER,
          payload: { balance: res.data.balance },
        });
        dispatch({
          type: ACTION_TYPES.UPDATE_USER,
          payload: { subscription: res.data.subscription },
        });
      },
    }
  );

  return user ? (
    <div className="card__main__balance shadow">
      <span className="title">Main Balance</span>
      <div className="balance__actions">
        <span className="balance">
          <TbCurrencyTaka size={32} strokeWidth={3} />
          {res?.data.balance}
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
          <span className="value">{res?.data.totalBought}</span>
          <span className="label">Bought</span>
        </div>

        <div className="stat saved">
          <div className="icons">
            <TbPigMoney size={20} />
            <IoCaretUpSharp color="green" />
          </div>
          <span className="value">
            <TbCurrencyTaka strokeWidth={3} size={17} />
            {res?.data.totalSaved}
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
            {res?.data.totalSpent}
          </span>
          <span className="label">Spent</span>
        </div>
      </div>
      <ViewMore styles={{ right: "15px" }} />
    </div>
  ) : (
    <></>
  );
};
export default Card_Main_Balance;
