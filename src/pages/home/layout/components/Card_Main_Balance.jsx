import React from "react";
import "./Card_Main_Balance.scss";
import { TbCashBanknote, TbPigMoney, TbCurrencyTaka } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineConfirmationNumber } from "react-icons/md";
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
  const [{ user, loggedIn }, dispatch] = useStateValue();

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

  return user && loggedIn ? (
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
            <AiOutlinePlus size={16} /> Add Balance
          </button>
        </div>
      </div>
      <hr />
      <div className="statistics">
        <div className="stat-in-out">
          <div className="in">
            <p className="label">Total Bought</p>
            <p className="value">
              <TbCurrencyTaka size={18} strokeWidth={2} />{" "}
              {res?.data.totalBought}
            </p>
          </div>
          <div className="out">
            <p className="label">Total Spent</p>
            <p className="value">
              <TbCurrencyTaka size={18} strokeWidth={2} />{" "}
              {res?.data.totalSpent}
            </p>
          </div>
        </div>
        <div className="earning">
          <p className="label">Earning</p>
          <p className="value">
            <TbCurrencyTaka size={18} strokeWidth={2} />
            {`${res?.data.totalBought - res?.data.totalSpent || 0}`}
          </p>
        </div>
      </div>
      <ViewMore styles={{ right: "15px" }} />
    </div>
  ) : (
    <></>
  );
};
export default Card_Main_Balance;
