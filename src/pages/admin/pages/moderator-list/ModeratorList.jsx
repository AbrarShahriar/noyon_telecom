import React, { useState } from "react";
import "./ModeratorList.scss";
import AppBar from "../../../shared/AppBar";
import Swal from "sweetalert2";
import { TbCurrencyTaka } from "react-icons/tb";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllModerators } from "../../../../api/queries/admin";
import { deleteModerator } from "../../../../api/mutations/admin";
import { PageLoader } from "../../../shared/SuspenseWrapper";
import Nothing from "../../../shared/Nothing";
import { getAllModeratorInAndOut } from "../../../../api/queries/moderator";

const ModeratorList = () => {
  const [total, settotal] = useState(0);

  const { isLoading, data: res } = useQuery(
    ["moderator", "list"],
    getAllModeratorInAndOut,
    {
      staleTime: 1000 * 60 * 2,
      onSuccess: (res) => {
        let sum = 0;
        res.data.forEach((mod) => {
          sum += mod.inVal - mod.outVal;
        });
        settotal(sum);
      },
    }
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="admin__moderator-list">
      <AppBar title="Moderator List" />

      <div className="total">
        <p className="label">Total</p>
        <p className="value">{total}</p>
      </div>

      {res?.data && res.data.length >= 1 ? (
        <div className="moderators">
          {res.data.map((moderator) => (
            <Moderator
              key={moderator.id}
              moderatorId={moderator.id}
              username={moderator.username}
              createdAt={moderator.createdAt}
              inVal={moderator.inVal}
              outVal={moderator.outVal}
            />
          ))}
        </div>
      ) : (
        <Nothing title="No Moderators." />
      )}
    </div>
  );
};

const Moderator = ({ username, createdAt, moderatorId, inVal, outVal }) => {
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
            <p className="label">Total IN:</p>
            <p className="value">{inVal}</p>
          </div>
          <div className="data">
            <p className="label">Total OUT:</p>
            <p className="value">{outVal}</p>
          </div>
          <div className="data">
            <p className="label">Balance:</p>
            <p className="value">{inVal - outVal}</p>
          </div>
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
