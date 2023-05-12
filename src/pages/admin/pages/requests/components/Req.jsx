import React from "react";
import "./Req.scss";
import {
  TbClipboardCheck,
  TbClipboardText,
  TbClipboardTypography,
  TbCurrencyTaka,
} from "react-icons/tb";
import {
  HiOutlineClipboardCheck,
  HiOutlineClipboardCopy,
} from "react-icons/hi";
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
  updateWithdrawReq,
} from "../../../../../api/mutations/admin";
import Swal from "sweetalert2";
import { PageLoader } from "../../../../shared/SuspenseWrapper";
import {
  formatLabel,
  getAdminKey,
  getModeratorId,
  getModeratorKey,
  parseDate,
} from "../../../../../uitls";
import useClipboard from "react-use-clipboard";

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
  isModerator = false,

  regularPrice = 0,
  discountPrice = 0,
  adminPrice = 0,

  sendTo,
  moderator,
  simcard = "",

  isPremium,
  actionAt,
}) => {
  const queryClient = useQueryClient();
  const [isCopied, setCopied] = useClipboard(sendTo, { successDuration: 1000 });

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
  const {
    isLoading: isWithdrawApproveLoading,
    mutate: updateWithdrawReqStatus,
  } = useMutation(updateWithdrawReq);

  const handleApproveClick = () => {
    let adminLoggedIn = getAdminKey();
    let moderatorLoggedIn = getModeratorKey();

    if (adminLoggedIn) {
      switch (type) {
        case "topup":
          approveTopupReq(
            {
              id,
              userPhone: phone,
            },
            {
              onSuccess: () => {
                fireSuccessAlert();
                queryClient.invalidateQueries(["requests", type]);
              },
            }
          );
          break;

        case "membership":
          approveMembershipReq(
            {
              membershipBuyReqId: id,
            },
            {
              onSuccess: () => {
                fireSuccessAlert();
                queryClient.invalidateQueries(["requests", type]);
              },
            }
          );
          break;

        case "recharge":
          approveRechargeReq(
            {
              rechargeBuyReqId: id,
              actionByAdmin: true,
            },
            {
              onSuccess: () => {
                fireSuccessAlert();
                queryClient.invalidateQueries(["requests", type]);
              },
            }
          );
          break;

        case "offer":
          approveOfferReq(
            {
              offerBuyReqId: id,
              actionByAdmin: true,
            },
            {
              onSuccess: () => {
                fireSuccessAlert();
                queryClient.invalidateQueries(["requests", type]);
              },
            }
          );
          break;

        case "withdraw":
          updateWithdrawReqStatus(
            {
              reqId: id,
              reqStatus: "approved",
            },
            {
              onSuccess: () => {
                fireSuccessAlert();
                queryClient.invalidateQueries(["requests", type]);
              },
            }
          );
          break;

        default:
          break;
      }
    } else if (moderatorLoggedIn) {
      switch (type) {
        case "recharge":
          approveRechargeReq(
            {
              rechargeBuyReqId: id,
              moderatorId: getModeratorId(),
            },
            {
              onSuccess: () => {
                fireSuccessAlert();
                queryClient.invalidateQueries(["requests", type]);
              },
            }
          );
          break;

        case "offer":
          approveOfferReq(
            {
              offerBuyReqId: id,
              moderatorId: getModeratorId(),
            },
            {
              onSuccess: () => {
                fireSuccessAlert();
                queryClient.invalidateQueries(["requests", type]);
              },
            }
          );
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
          rejectTopupReq(
            {
              topupReqId: id,
            },
            {
              onSuccess: () => {
                fireRejectedAlert();
                queryClient.invalidateQueries(["requests", type]);
              },
            }
          );
          break;

        case "membership":
          rejectMembershipReq(
            {
              membershipBuyReqId: id,
            },
            {
              onSuccess: () => {
                fireRejectedAlert();
                queryClient.invalidateQueries(["requests", type]);
              },
            }
          );
          break;

        case "recharge":
          rejectRechargeReq(
            {
              rechargeBuyReqId: id,
              actionByAdmin: true,
            },
            {
              onSuccess: () => {
                fireRejectedAlert();
                queryClient.invalidateQueries(["requests", type]);
              },
            }
          );
          break;

        case "offer":
          rejectOfferReq(
            {
              offerBuyReqId: id,
              actionByAdmin: true,
            },
            {
              onSuccess: () => {
                fireRejectedAlert();
                queryClient.invalidateQueries(["requests", type]);
              },
            }
          );
          break;

        case "withdraw":
          updateWithdrawReqStatus(
            {
              reqId: id,
              reqStatus: "rejected",
            },
            {
              onSuccess: () => {
                fireRejectedAlert();
                queryClient.invalidateQueries(["requests", type]);
              },
            }
          );
          break;

        default:
          break;
      }
    } else if (moderatorLoggedIn) {
      switch (type) {
        case "recharge":
          rejectRechargeReq({
            rechargeBuyReqId: id,
            moderatorId: getModeratorId(),
          });
          break;

        case "offer":
          rejectOfferReq({
            offerBuyReqId: id,
            moderatorId: getModeratorId(),
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
    isTopupReqRejectedLoading ||
    isWithdrawApproveLoading
  ) {
    return <PageLoader />;
  }

  return (
    <div className="admin__requests__container__req">
      <div className="content">
        {type == "offer" && title && <p className="title">{title}</p>}

        {type == "offer" && (
          <div className="data ">
            <p className="label">Sim Card</p>
            <p className="value">{formatLabel(simcard)}</p>
          </div>
        )}

        {(isModerator || amount) && (
          <div className="data ">
            <p className="label">Price: </p>
            <p className="value">{amount}</p>
          </div>
        )}

        {!isModerator && !amount && (
          <>
            <div className="data ">
              <p className="label">Regular Price: </p>
              <p className="value">{regularPrice}</p>
            </div>
            <div className="data ">
              <p className="label">Discount Price: </p>
              <p className="value">{discountPrice}</p>
            </div>
            <div className="data ">
              <p className="label">Admin Price: </p>
              <p className="value">{adminPrice}</p>
            </div>
          </>
        )}

        {phone && (
          <div className="data account-phone">
            <p className="label">Account Phone: </p>
            <p className="value">{phone}</p>
          </div>
        )}
        {moderator && (
          <div className="data account-phone">
            <p className="label">Moderator Name: </p>
            <p className="value">{moderator}</p>
          </div>
        )}
        {!(type == "topup" || type == "withdraw" || type == "membership") && (
          <div className="data receiver-phone">
            <p className="label">Receiver:</p>
            <button onClick={setCopied} className="value">
              {sendTo}
              {isCopied ? (
                <TbClipboardCheck size={20} />
              ) : (
                <TbClipboardText size={20} />
              )}
            </button>
          </div>
        )}

        <hr />

        {type == "offer" && (
          <div className="data date">
            <p className="label">Offer Type: </p>
            <p className="value">{formatLabel(String(isPremium))}</p>
          </div>
        )}

        <div className="data date">
          <p className="label">Requested At: </p>
          <p className="value">{parseDate(actionAt)}</p>
        </div>
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
            {transactionId && (
              <div className="data payment-method">
                <p className="label">TranscationId: </p>
                <p className="value">{transactionId}</p>
              </div>
            )}
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
