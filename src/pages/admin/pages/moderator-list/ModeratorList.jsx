import React from "react";
import "./ModeratorList.scss";
import AppBar from "../../../shared/AppBar";
import Swal from "sweetalert2";
import { TbCurrencyTaka } from "react-icons/tb";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllModerators } from "../../../../api/queries/admin";
import { deleteModerator } from "../../../../api/mutations/admin";
import { PageLoader } from "../../../shared/SuspenseWrapper";

const ModeratorList = () => {
  const { isLoading, data: res } = useQuery(
    ["moderator", "list"],
    getAllModerators
  );

  return (
    <div className="admin__moderator-list">
      <AppBar title="Moderator List" />

      {isLoading && <PageLoader />}

      {res?.data && (
        <div className="moderators">
          {res.data.map((moderator) => (
            <Moderator
              key={moderator.id}
              moderatorId={moderator.id}
              approvedOfferReqsCount={moderator.approvedOfferReqs.length}
              approvedRechargeReqsCount={moderator.approvedRechargeReqs.length}
              username={moderator.username}
              createdAt={moderator.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Moderator = ({
  username,
  createdAt,
  moderatorId,
  approvedOfferReqsCount,
  approvedRechargeReqsCount,
}) => {
  const { isLoading, mutate } = useMutation(deleteModerator);
  const queryClient = useQueryClient();

  const handleRemoveClick = (name) => {
    Swal.fire({
      title: `Do you want to delete '${name}'?`,
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Yes`,
    }).then((result) => {
      if (result.isDenied) {
        mutate(moderatorId, {
          onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["moderator", "list"] });
            Swal.fire({ title: res.data.message, icon: "success" });
          },
        });
      }
    });
  };
  return (
    <>
      {isLoading && <PageLoader />}
      <div className="moderator">
        <div className="content">
          <div className="data">
            <p className="label">Username:</p>
            <p className="value">{username}</p>
          </div>
          <div className="data">
            <p className="label">Created At:</p>
            <p className="value">{dayjs(createdAt).format("D MMM, YYYY")}</p>
          </div>
          <div className="data">
            <p className="label">Approved:</p>
            <p className="value">
              {approvedOfferReqsCount + approvedRechargeReqsCount}
            </p>
          </div>
          {/* <div className="data">
            <p className="label">Rejected:</p>
            <p className="value">{3}</p>
          </div> */}
          {/* <div className="data">
            <p className="label">Total:</p>
            <p
              className="value"
              style={{ display: "flex", alignItems: "center" }}
            >
              <TbCurrencyTaka strokeWidth={3} style={{ marginRight: -2 }} />
              {3}
            </p>
          </div> */}
        </div>
        <div className="actions">
          <button
            className="btn__delete"
            onClick={() => {
              handleRemoveClick(username);
            }}
          >
            REMOVE
          </button>
        </div>
      </div>
    </>
  );
};

export default ModeratorList;
