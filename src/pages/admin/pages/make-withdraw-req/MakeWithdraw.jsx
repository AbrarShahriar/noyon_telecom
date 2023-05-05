import React, { useState } from "react";
import "./MakeWithdraw.scss";
import AppBar from "../../../shared/AppBar";
import { IMaskInput } from "react-imask";
import { MySwal, formatPhone, getModeratorId } from "../../../../uitls";
import { useMutation } from "react-query";
import { createWithdraw } from "../../../../api/mutations/moderator";
import { PageLoader } from "../../../shared/SuspenseWrapper";

const MakeWithdraw = () => {
  const [bkashChecked, setbkashChecked] = useState(false);
  const [nagadChecked, setnagadChecked] = useState(false);
  const [phone, setphone] = useState("");
  const [amount, setamount] = useState(0);

  const { isLoading: withdrawReqLoading, mutate: makeWithdrawReq } =
    useMutation(createWithdraw);

  const getPaymentMethod = () => {
    if (bkashChecked) {
      return "bkash";
    } else if (nagadChecked) {
      return "nagad";
    }
  };

  const handleSubmit = () => {
    if (!bkashChecked && !nagadChecked) {
      return MySwal.fire({
        title: "No Payment Method!",
        text: "Please Select A Payment Method.",
        icon: "error",
      });
    }

    if (!phone) {
      return MySwal.fire({
        title: "No Payment Phone!",
        text: "Please Enter A Payment Number.",
        icon: "error",
      });
    }
    if (!amount) {
      return MySwal.fire({
        title: "Invalid Amount",
        text: "Please Enter An Amount Over 10tk.",
        icon: "error",
      });
    }

    makeWithdrawReq(
      {
        moderatorId: getModeratorId(),
        amount,
        paymentPhone: formatPhone(phone),
        paymentMethod: getPaymentMethod(),
      },
      {
        onSuccess: () =>
          MySwal.fire({
            title: "We Got Your Request",
            icon: "success",
            text: "Your Request Will Be Proccessed Shortly.",
          }),
      }
    );
  };

  if (withdrawReqLoading) {
    return <PageLoader />;
  }

  return (
    <div className="moderator__withdraw">
      <AppBar title="Withdraw" />

      <div className="container">
        <div className="card payment__method">
          <h4>Select Payment Method</h4>
          <div className="method">
            <input
              checked={bkashChecked}
              onChange={() => setbkashChecked(!bkashChecked)}
              type="checkbox"
              id="bkash"
            />
            <label htmlFor="bkash"> Bkash</label>
          </div>
          <div className="method">
            <input
              checked={nagadChecked}
              onChange={() => setnagadChecked(!nagadChecked)}
              type="checkbox"
              id="nagad"
            />
            <label htmlFor="nagad"> Nagad</label>
          </div>
        </div>

        <div className="card phone">
          <h4>Enter Payment Phone</h4>
          <IMaskInput
            mask="+{88\0} 0000 000000"
            signed={false}
            placeholder="Enter Number"
            lazy={true}
            onAccept={(value) => setphone(value)}
          />
        </div>

        <div className="card amount">
          <h4>Enter Amount</h4>
          <IMaskInput
            mask={Number}
            signed={false}
            max={1000}
            min={10}
            placeholder="Enter Withdraw Amount"
            lazy={true}
            onAccept={(value) => setamount(Number(value))}
          />
        </div>

        <div className="submit">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};
export default MakeWithdraw;
