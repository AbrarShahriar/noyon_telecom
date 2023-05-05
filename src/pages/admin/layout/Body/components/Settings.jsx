import React from "react";
import "./Settings.scss";
import { FiEdit3 } from "react-icons/fi";
import { TbCurrencyTaka } from "react-icons/tb";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MySwal, truncateText } from "../../../../../uitls";
import { useStateValue } from "../../../../shared/StateProvider";
import { ACTION_TYPES } from "../../../../../reducer";
import { useMutation, useQuery } from "react-query";
import { updateAdminSettings } from "../../../../../api/mutations/admin";

const ICON_SIZE = 22;

const Settings = () => {
  // @ts-ignore
  const [{ membershipFee, topupFee, noticeText, adminPaymentPhone }, dispatch] =
    useStateValue();

  const { mutate: updateSetting } = useMutation(updateAdminSettings, {
    onSuccess: () =>
      MySwal.fire({ title: "Successfully Updated!", icon: "success" }),
  });

  const handleSettingOptionClick = async (label) => {
    let modalTitle = "";
    let modalInputType = "number";
    let modalInputValue = "";

    switch (label) {
      case "topup":
        modalTitle = "Set Topup Fee Rate";
        modalInputValue = topupFee;
        break;
      case "membership":
        modalTitle = "Set Membership Fee";
        modalInputValue = membershipFee;
        break;
      case "notice":
        modalInputType = "text";
        modalTitle = "Set Notice Text";
        modalInputValue = noticeText;
        break;
      case "payment":
        modalInputType = "text";
        modalTitle = "Set Payment Number";
        modalInputValue = adminPaymentPhone;
        break;

      default:
        break;
    }

    MySwal.fire({
      title: <p className="modal-title">{modalTitle}</p>,
      // @ts-ignore
      input: modalInputType,
      inputValue: modalInputValue,
      showCancelButton: true,
      // @ts-ignore
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        } else if (label != "notice" && typeof parseFloat(value) != "number") {
          return "You need to enter a number!";
        }

        switch (label) {
          case "topup":
            updateSetting({
              label: "topupFee",
              value: value,
            });
            dispatch({
              type: ACTION_TYPES.UPDATE_TOPUPFEE,
              payload: { topupFee: parseFloat(value) },
            });
            break;

          case "membership":
            updateSetting({
              label: "membershipFee",
              value: value,
            });
            dispatch({
              type: ACTION_TYPES.UPDATE_MEMBERSHIPFEE,
              payload: { membershipFee: parseFloat(value) },
            });
            break;

          case "notice":
            updateSetting({
              label: "noticeText",
              value: value,
            });
            dispatch({
              type: ACTION_TYPES.UPDATE_NOITCETEXT,
              payload: { noticeText: value },
            });
            break;

          case "payment":
            updateSetting({
              label: "adminPaymentPhone",
              value: value,
            });
            dispatch({
              type: ACTION_TYPES.UPDATE_PAYMENT_PHONE,
              payload: { adminPaymentPhone: value },
            });
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
          <p className="value">{topupFee}%</p>
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
            {membershipFee}
          </p>
          <FiEdit3
            className="icon"
            size={ICON_SIZE}
            onClick={() => handleSettingOptionClick("membership")}
          />
        </div>
        <div className="settings__option">
          <p className="label">Payment Phone</p>
          <p className="value">{adminPaymentPhone}</p>
          <FiEdit3
            className="icon"
            size={ICON_SIZE}
            onClick={() => handleSettingOptionClick("payment")}
          />
        </div>
        <div className="settings__option">
          <p className="label">Notice Text</p>
          <p className="value">{truncateText(noticeText, 2)}</p>
          <FiEdit3
            className="icon"
            size={ICON_SIZE}
            onClick={() => handleSettingOptionClick("notice")}
          />
        </div>
      </div>
    </div>
  );
};
export default Settings;
