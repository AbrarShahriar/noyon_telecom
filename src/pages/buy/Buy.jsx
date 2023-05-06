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
import Deal from "../home/layout/components/Deal";

const Buy = ({ page }) => {
  // @ts-ignore
  const [{ loggedIn, user, offerBuyCount }, dispatch] = useStateValue();

  let { offerId, amount } = useParams();

  const [offerRes, setofferRes] = useState({});
  // @ts-ignore
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

  const buyOfferMutationRun = () => {
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
            dispatch({
              type: ACTION_TYPES.INCREMENT_OFFER_BUY_COUNT,
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
            dispatch({
              type: ACTION_TYPES.INCREMENT_OFFER_BUY_COUNT,
            });
          },
        }
      );
    }
  };

  const handleBuyClick = () => {
    if (offerBuyCount >= 1 && offerBuyCount <= 3) {
      MySwal.fire({
        title: "Warning!",
        icon: "warning",
        text: `You Already Bought ${offerBuyCount} offers. Do You Want To Buy Again?`,
        showCancelButton: true,
        cancelButtonText: "No",
        cancelButtonColor: "red",
        showConfirmButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "green",
      }).then((result) => {
        if (result.isConfirmed) {
          buyOfferMutationRun();
        }
      });
    } else if (offerBuyCount > 2) {
      MySwal.fire({
        title: "Oops!",
        icon: "error",
        text: `Try Again After Some Time`,
      });
    } else {
      buyOfferMutationRun();
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
          mask="+{88\0} #000 000000"
          definitions={{
            "#": /[1-9]/,
          }}
          signed={false}
          lazy={true}
          placeholder="Enter Receiver Number"
          onAccept={(value) => setsendTo(value)}
        />

        {page == "offer" &&
          offerRes &&
          // @ts-ignore
          offerRes?.data && (
            <Deal
              bgColor="white"
              showBuy={false}
              title={
                // @ts-ignore
                offerRes.data.title
              }
              // @ts-ignore
              id={offerRes.data.id}
              // @ts-ignore
              desc={offerRes.data.desc}
              // @ts-ignore
              expiry={offerRes.data.expiration}
              // @ts-ignore
              discountPrice={offerRes.data.discountPrice}
              // @ts-ignore
              regularPrice={offerRes.data.regularPrice}
              // @ts-ignore
              simcard={offerRes.data.simcard}
            />
          )}
        {
          // @ts-ignore
          page == "recharge" && offerRes.data && (
            <div className="offer__data">
              <p className="offer__title">Recharge</p>

              <div className="expiry__amount">
                <div className="prices">
                  <p className="offer__amount discount">
                    <TbCurrencyTaka size={18} strokeWidth={3} />
                    {
                      // @ts-ignore
                      offerRes?.data.amount
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
