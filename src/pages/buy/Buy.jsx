import React from "react";
import "./Buy.scss";
import { MdDateRange } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import AppBar from "../shared/AppBar";
import { MySwal } from "../../uitls";
import { useStateValue } from "../shared/StateProvider";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getOfferDetails } from "../../api/queries/offer-buy";
import { PageLoader } from "../shared/SuspenseWrapper";
import NotLoggedIn from "../shared/NotLoggedIn";
import { buyOffer } from "../../api/mutations/offer-buy";
import { updateBalance } from "../../api/global";
import { ACTION_TYPES } from "../../reducer";
import Swal from "sweetalert2";

const Buy = () => {
  // @ts-ignore
  const [{ loggedIn, user }, dispatch] = useStateValue();

  let { offerId } = useParams();

  const { isLoading, data: offerRes } = useQuery(
    ["offer", "single", offerId],
    () => getOfferDetails(offerId)
  );

  const { isLoading: offerBuyLoadingInProgress, mutate: sendBuyReq } =
    useMutation(buyOffer);

  const handleBuyClick = () => {
    console.log(user.balance);
    if (user.balance - offerRes?.data.discountPrice < 0) {
      return Swal.fire({
        title: "Insufficient Balance",
        icon: "error",
      });
    }

    sendBuyReq(
      {
        phone: user.phone,
        offerId: Number(offerId),
      },
      {
        onSuccess: () => {
          MySwal.fire({
            title: <p style={{ fontSize: 24 }}>We Received Your Request!</p>,
            text: "Your request will be processed in a few minutes.",
            icon: "success",
          });
          dispatch({
            type: ACTION_TYPES.UPDATE_USER,
            payload: { balance: user.balance - offerRes?.data.discountPrice },
          });
        },
      }
    );
  };

  if (isLoading || offerBuyLoadingInProgress) {
    return <PageLoader />;
  }

  if (!loggedIn) {
    return <NotLoggedIn />;
  }

  return (
    <>
      <AppBar title="Buy" />
      <div className="buy">
        {offerRes?.data && (
          <div className="offer__data">
            <p className="offer__title">{offerRes?.data.title}</p>

            <div className="expiry__amount">
              <p className="offer__expiry">
                <MdDateRange size={16} />
                {offerRes?.data.expiration}
              </p>
              <div className="prices">
                <p className="offer__amount regular">
                  <TbCurrencyTaka size={18} strokeWidth={3} />
                  {offerRes?.data.regularPrice}
                </p>
                <p className="offer__amount discount">
                  <TbCurrencyTaka size={18} strokeWidth={3} />
                  {offerRes?.data.discountPrice}
                </p>
              </div>
            </div>
          </div>
        )}
        <button onClick={handleBuyClick} className="btn__buy">
          Buy
        </button>
      </div>
    </>
  );
};
export default Buy;
