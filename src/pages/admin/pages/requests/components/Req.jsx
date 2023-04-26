import React from "react";
import "./Req.scss";
import { TbCurrencyTaka } from "react-icons/tb";
import { useMutation, useQueryClient } from "react-query";
import {
  rejectMembershipBuyReq,
  rejectOfferBuyReq,
  rejectRechargeBuyReq,
  rejectTopupAddReq,
  updateMembershipReq,
  updateOfferReq,
  updateRechargeReq,
  updateTopupReq,
} from "../../../../../api/mutations/admin";
import Swal from "sweetalert2";
import { PageLoader } from "../../../../shared/SuspenseWrapper";
import {
  getAdminKey,
  getModeratorId,
  getModeratorKey,
} from "../../../../../uitls";

const fireSuccessAlert = () =>
  Swal.fire({
    title: "Request Has Been Approved!",
    icon: "success",
  });

const fireRejectedAlert = () =>
  Swal.fire({
    title: "Request Has Been Rejected!",
    icon: "error",
  });

const Req = ({
  type,
  title = "",
  amount,
  phone,
  paymentPhone = "",
  id,
  transactionId = "",
  paymentMethod = "",
}) => {
  const queryClient = useQueryClient();

  // --------------------- APPROVE -------------------------- //
  const { isLoading: isTopupReqApproveLoading, mutate: approveTopupReq } =
    useMutation(updateTopupReq, {
      onSuccess: () => {
        fireSuccessAlert();
        queryClient.invalidateQueries(["requests", "topup"]);
      },
    });
  const { isLoading: isMembershipReqLoading, mutate: approveMembershipReq } =
    useMutation(updateMembershipReq, {
      onSuccess: () => {
        fireSuccessAlert();
        queryClient.invalidateQueries(["requests", "membership"]);
      },
    });
  const { isLoading: isRechargeReqLoading, mutate: approveRechargeReq } =
    useMutation(updateRechargeReq, {
      onSuccess: () => {
        fireSuccessAlert();
        queryClient.invalidateQueries(["requests", "recharge"]);
      },
    });
  const { isLoading: isOfferReqLoading, mutate: approveOfferReq } = useMutation(
    updateOfferReq,
    {
      onSuccess: () => {
        fireSuccessAlert();
        queryClient.invalidateQueries(["requests", "offer"]);
      },
    }
  );

  const handleApproveClick = () => {
    let adminLoggedIn = getAdminKey();
    let moderatorLoggedIn = getModeratorKey();

    if (adminLoggedIn) {
      switch (type) {
        case "topup":
          approveTopupReq({
            id,
            approved: true,
            approvedBy: "admin",
            userPhone: phone,
          });
          break;

        case "membership":
          approveMembershipReq({
            membershipBuyReqId: id,
            approved: true,
            approvedBy: "admin",
          });
          break;

        case "recharge":
          approveRechargeReq({
            rechargeBuyReqId: id,
            approved: true,
            approvedBy: "admin",
          });
          break;

        case "offer":
          approveOfferReq({
            offerBuyReqId: id,
            approved: true,
            approvedBy: "admin",
          });
          break;

        default:
          break;
      }
    } else if (moderatorLoggedIn) {
      switch (type) {
        case "recharge":
          approveRechargeReq({
            rechargeBuyReqId: id,
            approved: true,
            moderatorId: getModeratorId(),
          });
          break;

        case "offer":
          approveOfferReq({
            offerBuyReqId: id,
            approved: true,
            moderatorId: getModeratorId(),
          });
          break;

        default:
          break;
      }
    }
  };

  // --------------------- REJECT -------------------------- //

  const { isLoading: isOfferReqRejectedLoading, mutate: rejectOfferReq } =
    useMutation(rejectOfferBuyReq, {
      onSuccess: () => {
        fireRejectedAlert();
        queryClient.invalidateQueries(["requests", "offer"]);
      },
    });
  const { isLoading: isRechargeReqRejectedLoading, mutate: rejectRechargeReq } =
    useMutation(rejectRechargeBuyReq, {
      onSuccess: () => {
        fireRejectedAlert();
        queryClient.invalidateQueries(["requests", "recharge"]);
      },
    });
  const {
    isLoading: isMembershipReqRejectedLoading,
    mutate: rejectMembershipReq,
  } = useMutation(rejectMembershipBuyReq, {
    onSuccess: () => {
      fireRejectedAlert();
      queryClient.invalidateQueries(["requests", "membership"]);
    },
  });
  const { isLoading: isTopupReqRejectedLoading, mutate: rejectTopupReq } =
    useMutation(rejectTopupAddReq, {
      onSuccess: () => {
        fireRejectedAlert();
        queryClient.invalidateQueries(["requests", "topup"]);
      },
    });

  const handleRejectClick = () => {
    let adminLoggedIn = getAdminKey();
    let moderatorLoggedIn = getModeratorKey();

    if (adminLoggedIn) {
      switch (type) {
        case "topup":
          rejectTopupReq({
            topupReqId: id,
          });
          break;

        case "membership":
          rejectMembershipReq({
            membershipBuyReqId: id,
          });
          break;

        case "recharge":
          rejectRechargeReq({
            rechargeBuyReqId: id,
          });
          break;

        case "offer":
          rejectOfferReq({
            offerBuyReqId: id,
          });
          break;

        default:
          break;
      }
    } else if (moderatorLoggedIn) {
      switch (type) {
        case "recharge":
          rejectRechargeReq({
            rechargeBuyReqId: id,
          });
          break;

        case "offer":
          rejectOfferReq({
            offerBuyReqId: id,
          });
          break;

        default:
          break;
      }
    }
  };

  if (
    isTopupReqApproveLoading ||
    isMembershipReqLoading ||
    isOfferReqLoading ||
    isRechargeReqLoading ||
    isOfferReqRejectedLoading ||
    isRechargeReqRejectedLoading ||
    isMembershipReqRejectedLoading ||
    isTopupReqRejectedLoading
  ) {
    return <PageLoader />;
  }

  return (
    <div className="admin__requests__container__req">
      <div className="content">
        {type == "offer" && title && <p className="title">{title}</p>}

        <p className="amount">
          <TbCurrencyTaka size={18} strokeWidth={3} />
          {amount}
        </p>

        <div className="data account-phone">
          <p className="label">Account Phone: </p>
          <p className="value">{phone}</p>
        </div>

        <hr />

        {!(type == "offer" || type == "recharge") && (
          <>
            <div className="data payment-phone">
              <p className="label">Payment From: </p>
              <p className="value">{paymentPhone}</p>
            </div>
            <div className="data payment-method">
              <p className="label">Payment Method: </p>
              <p className="value">{paymentMethod}</p>
            </div>
            <div className="data payment-method">
              <p className="label">TranscationId: </p>
              <p className="value">{transactionId}</p>
            </div>
          </>
        )}
      </div>

      <div className="actions">
        <button className="btn__approve" onClick={handleApproveClick}>
          Approve
        </button>
        <button className="btn__reject" onClick={handleRejectClick}>
          Reject
        </button>
      </div>
    </div>
  );
};
export default Req;
