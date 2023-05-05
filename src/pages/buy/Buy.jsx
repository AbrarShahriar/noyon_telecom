import React, { useEffect, useState } from "react";
import "./Buy.scss";
import { MdDateRange } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import AppBar from "../shared/AppBar";
import { MySwal, formatPhone } from "../../uitls";
import { useStateValue } from "../shared/StateProvider";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getOfferDetails } from "../../api/queries/offer-buy";
import { PageLoader } from "../shared/SuspenseWrapper";
import NotLoggedIn from "../shared/NotLoggedIn";
import { buyOffer } from "../../api/mutations/offer-buy";
import { ACTION_TYPES } from "../../reducer";
import Swal from "sweetalert2";
import { rechargeReq } from "../../api/mutations/recharge";
import { IMaskInput } from "react-imask";

const Buy = ({ page }) => {
  // @ts-ignore
  const [{ loggedIn, user }, dispatch] = useStateValue();

  let { offerId, amount } = useParams();

  const [offerRes, setofferRes] = useState({});
  const [sendTo, setsendTo] = useState("");

  const { isLoading: isOfferBuyLoading, refetch: fetchOfferDetails } = useQuery(
    ["offer", "single", offerId],
    () => getOfferDetails(offerId),
    { enabled: false, onSuccess: (res) => setofferRes(res) }
  );

  useEffect(() => {
    if (page == "offer") {
      fetchOfferDetails();
    } else if (page == "recharge") {
      setofferRes({ data: { amount } });
    }
  }, []);

  const { isLoading: offerBuyLoadingInProgress, mutate: sendOfferBuyReq } =
    useMutation(buyOffer);
  // @ts-ignore
  const { isLoading: isRechargeBuyLoading, mutate: sendRechargeBuyReq } =
    useMutation(rechargeReq, {
      onSuccess: () => {
        MySwal.fire({
          title: <p style={{ fontSize: 24 }}>We Received Your Request!</p>,
          text: "Your request will be processed in a few minutes.",
          icon: "success",
        });
      },
    });

  const handleBuyClick = () => {
    const formattedPhone = formatPhone(sendTo);

    if (!formattedPhone) {
      return Swal.fire({
        title: "Please Enter A Number",
        icon: "error",
      });
    }

    if (formattedPhone.length != 11) {
      return Swal.fire({
        title: "Invalid Number!",
        icon: "error",
      });
    }

    // @ts-ignore
    if (user.balance - offerRes?.data.discountPrice < 0) {
      return Swal.fire({
        title: "Insufficient Balance",
        icon: "error",
      });
    }

    if (page == "offer") {
      sendOfferBuyReq(
        {
          phone: user.phone,
          offerId: Number(offerId),
          sendTo: formattedPhone,
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
              // @ts-ignore
              payload: { balance: user.balance - offerRes?.data.discountPrice },
            });
          },
        }
      );
    } else if (page == "recharge") {
      sendRechargeBuyReq(
        {
          amount: Number(amount),
          phone: user.phone,
          sendTo: formattedPhone,
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
              payload: { balance: user.balance - Number(amount) },
            });
          },
        }
      );
    }
  };

  if (isOfferBuyLoading || offerBuyLoadingInProgress) {
    return <PageLoader />;
  }

  if (!loggedIn) {
    return <NotLoggedIn />;
  }

  return (
    <>
      <AppBar title="Buy" />
      <div className="buy">
        <IMaskInput
          mask="+{88\0} 0000 000000"
          signed={false}
          lazy={true}
          placeholder="Enter Receiver Number"
          onAccept={(value) => setsendTo(value)}
        />
        {
          // @ts-ignore
          offerRes?.data && (
            <div className="offer__data">
              <p className="offer__title">
                {
                  // @ts-ignore
                  offerRes?.data.title || "Recharge"
                }
              </p>

              <div className="expiry__amount">
                {page == "offer" && (
                  <p className="offer__expiry">
                    <MdDateRange size={16} />
                    {
                      // @ts-ignore
                      offerRes?.data.expiration
                    }
                  </p>
                )}
                <div className="prices">
                  {page == "offer" && (
                    <p className="offer__amount regular">
                      <TbCurrencyTaka size={18} strokeWidth={3} />
                      {
                        // @ts-ignore
                        offerRes?.data.regularPrice
                      }
                    </p>
                  )}
                  <p className="offer__amount discount">
                    <TbCurrencyTaka size={18} strokeWidth={3} />
                    {
                      // @ts-ignore
                      offerRes?.data.discountPrice || offerRes.data.amount
                    }
                  </p>
                </div>
              </div>
            </div>
          )
        }
        <button onClick={handleBuyClick} className="btn__buy">
          Buy
        </button>
      </div>
    </>
  );
};
export default Buy;
