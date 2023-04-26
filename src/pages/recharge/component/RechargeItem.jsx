import React from "react";
import { MySwal } from "../../../uitls";
import { TbCurrencyTaka } from "react-icons/tb";
import { useStateValue } from "../../shared/StateProvider";
import { useMutation } from "react-query";
import { rechargeReq } from "../../../api/mutations/recharge";
import { PageLoader } from "../../shared/SuspenseWrapper";
import Swal from "sweetalert2";
import { updateBalance } from "../../../api/global";
import { ACTION_TYPES } from "../../../reducer";

const RechargeItem = ({ amount, id }) => {
  // @ts-ignore
  const [{ loggedIn, user }, dispatch] = useStateValue();

  const { mutate: updateUserBalance } = useMutation(updateBalance);
  const { isLoading, mutate: sendReq } = useMutation(rechargeReq, {
    onSuccess: () => {
      MySwal.fire({
        title: <p style={{ fontSize: 24 }}>We Received Your Request!</p>,
        text: "Your request will be processed in a few minutes.",
        icon: "success",
      });
    },
  });

  const handleBuyClick = () => {
    if (loggedIn) {
      MySwal.fire({
        title: <p style={{ fontSize: 20 }}>Buy?</p>,
        confirmButtonText: "Buy",
        confirmButtonColor: "#52c41a",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          if (user.balance < amount) {
            return Swal.fire({
              title: "Insufficient Balance",
              icon: "error",
            });
          }
          sendReq({
            amount,
            phone: user.phone,
          });
        }
      });
    } else {
      MySwal.fire({
        title: <p style={{ fontSize: 20 }}>Login To Buy Offer</p>,
      });
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="recharge__item">
      <p className="amount">
        <TbCurrencyTaka /> {amount}
      </p>

      <button onClick={handleBuyClick} className="btn__buy">
        Buy
      </button>
    </div>
  );
};
export default RechargeItem;
