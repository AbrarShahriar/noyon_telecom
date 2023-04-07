import React from "react";
import "./Settings.scss";
import { FiEdit3 } from "react-icons/fi";
import { TbCurrencyTaka } from "react-icons/tb";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const settings = {
  topupFeeRate: 2.5,
  membershipFee: 150,
  cashbackRate: 2.5,
};

const ICON_SIZE = 22;

const Settings = () => {
  const handleSettingOptionClick = async (label) => {
    let modalTitle = "";

    switch (label) {
      case "topup":
        modalTitle = "Set Topup Fee Rate";
        break;
      case "membership":
        modalTitle = "Set Membership Fee";
        break;
      case "cashback":
        modalTitle = "Set Cashback Rate";
        break;

      default:
        break;
    }

    MySwal.fire({
      title: <p className="modal-title">{modalTitle}</p>,
      input: "number",
      showCancelButton: true,
      // @ts-ignore
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        } else if (typeof parseFloat(value) != "number") {
          return "You need to enter a number!";
        }

        switch (label) {
          case "topup":
            settings.topupFeeRate = parseFloat(value);
            break;
          case "membership":
            settings.membershipFee = parseFloat(value);
            break;
          case "cashback":
            settings.cashbackRate = parseFloat(value);
            break;

          default:
            break;
        }
      },
    });
  };

  return (
    <div className="admin__settings admin__card">
      <h3>Settings</h3>

      <div className="settings__options">
        <div className="settings__option">
          <p className="label">Topup Fee Rate</p>
          <p className="value">{settings.topupFeeRate}%</p>
          <FiEdit3
            className="icon"
            size={ICON_SIZE}
            onClick={() => handleSettingOptionClick("topup")}
          />
        </div>
        <div className="settings__option">
          <p className="label">Membership Fee</p>
          <p className="value with-icon">
            <TbCurrencyTaka strokeWidth={3} size={16} />
            {settings.membershipFee}
          </p>
          <FiEdit3
            className="icon"
            size={ICON_SIZE}
            onClick={() => handleSettingOptionClick("membership")}
          />
        </div>
        <div className="settings__option">
          <p className="label">Cashback Rate</p>
          <p className="value">{settings.cashbackRate}%</p>
          <FiEdit3
            className="icon"
            size={ICON_SIZE}
            onClick={() => handleSettingOptionClick("cashback")}
          />
        </div>
      </div>
    </div>
  );
};
export default Settings;
