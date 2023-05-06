import React, { useEffect, useState } from "react";
import "./WithdrawHistory.scss";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getAllModeratorWithdrawHistory,
  getModeratorWithdrawHistory,
} from "../../../../api/queries/moderator";
import { PageLoader } from "../../../shared/SuspenseWrapper";
import AppBar from "../../../shared/AppBar";
import Nothing from "../../../shared/Nothing";
import { MySwal, formatLabel, parseDate } from "../../../../uitls";
import { updateWithdraw } from "../../../../api/mutations/moderator";

const WithdrawHistory = ({ isModerator = false }) => {
  const [data, setdata] = useState([]);
  const [doFetch, setdoFetch] = useState(false);

  const { refetch: fetchModHistory, isLoading: isModHistoryLoading } = useQuery(
    ["moderator", "history"],
    getModeratorWithdrawHistory,
    { enabled: false, onSuccess: (res) => setdata(res.data) }
  );
  const { refetch: fetchAllModHistory, isLoading: isAllModHistoryLoading } =
    useQuery(["moderator", "history"], getAllModeratorWithdrawHistory, {
      enabled: false,
      onSuccess: (res) => setdata(res.data),
    });

  useEffect(() => {
    if (isModerator) {
      fetchModHistory();
    } else {
      fetchAllModHistory();
    }
  }, [doFetch]);

  if (isAllModHistoryLoading || isModHistoryLoading) {
    return <PageLoader />;
  }

  return (
    <div className="admin__withdraw__history">
      <AppBar title="Withdraw History" />

      <div className="history__list">
        {data && data.length >= 1 ? (
          data.map((req) => (
            <History
              setdoFetch={setdoFetch}
              isModerator={isModerator}
              // @ts-ignore
              key={req.id}
              // @ts-ignore
              id={req.id}
              // @ts-ignore
              username={req.moderator.username}
              // @ts-ignore
              createdAt={req.createdAt}
              // @ts-ignore
              amount={req.amount}
              // @ts-ignore
              reqStatus={req.reqStatus}
              // @ts-ignore
              paymentMethod={req.paymentMethod}
              // @ts-ignore
              paymentPhone={req.paymentPhone}
            />
          ))
        ) : (
          <Nothing title="No History!" />
        )}
      </div>
    </div>
  );
};

const History = ({
  id,
  username,
  setdoFetch,
  createdAt,
  amount,
  reqStatus,
  isModerator,
  paymentPhone,
  paymentMethod,
}) => {
  const { isLoading, mutate } = useMutation(updateWithdraw);
  const queryClient = useQueryClient();

  const handleApproveClick = () => {
    mutate(
      {
        reqId: id,
        reqStatus: "approved",
      },
      {
        onSuccess: (res) => {
          MySwal.fire({
            title: "Request Approved!",
            icon: "success",
          });
          setdoFetch(res);
          queryClient.invalidateQueries(["moderator", "history"]);
        },
        onError: () => {
          MySwal.fire({
            title: "Something Went Wrong!",
            icon: "error",
          });
        },
      }
    );
  };

  const handleRejectClick = () => {
    mutate(
      {
        reqId: id,
        reqStatus: "rejected",
      },
      {
        onSuccess: (res) => {
          setdoFetch(res);
          MySwal.fire({
            title: "Request Rejected!",
            icon: "error",
          });
          queryClient.invalidateQueries(["moderator", "history"]);
        },
        onError: () => {
          MySwal.fire({
            title: "Something Went Wrong!",
            icon: "error",
          });
        },
      }
    );
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="history">
      <div className="data">
        <p className="label">Moderator</p>
        <p className="value">
          {
            // @ts-ignore
            username
          }
        </p>
      </div>
      <div className="data">
        <p className="label">Time</p>
        <p className="value">
          {
            // @ts-ignore
            parseDate(createdAt)
          }
        </p>
      </div>
      <div className="data">
        <p className="label">Amount</p>
        <p className="value">{amount || 0}</p>
      </div>
      <div className="data">
        <p className="label">Phone</p>
        <p className="value">{paymentPhone}</p>
      </div>
      <div className="data">
        <p className="label">Payment Method</p>
        <p className="value">{formatLabel(paymentMethod)}</p>
      </div>
      <div className="data">
        <p className="label">Status</p>
        <p className="value">{formatLabel(reqStatus)}</p>
      </div>

      {!isModerator && reqStatus == "pending" && (
        <div className="actions">
          <button className="btn__approve" onClick={handleApproveClick}>
            Approve
          </button>
          <button className="btn__reject" onClick={handleRejectClick}>
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default WithdrawHistory;
