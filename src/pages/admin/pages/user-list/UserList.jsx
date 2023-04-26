import React from "react";
import "./UserList.scss";
import AppBar from "../../../shared/AppBar";
import Swal from "sweetalert2";
import { TbCurrencyTaka } from "react-icons/tb";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { PageLoader } from "../../../shared/SuspenseWrapper";
import { getAllUsers } from "../../../../api/queries/admin";
import { deleteUser } from "../../../../api/mutations/admin";

const UserList = () => {
  const { isLoading, data: res } = useQuery(["user", "list"], getAllUsers);
  return (
    <>
      {isLoading && <PageLoader />}
      <div className="admin__user-list">
        <AppBar title="User List" />

        {res?.data && (
          <div className="users">
            {res.data.map((user) => (
              <User
                username={user.name}
                phone={user.phone}
                balance={user.balance}
                userId={user.id}
                createdAt={user.createdAt}
                key={user.id}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const User = ({ username, balance, userId, createdAt, phone }) => {
  const { isLoading, mutate } = useMutation(deleteUser);
  const queryClient = useQueryClient();

  const handleRemoveClick = () => {
    Swal.fire({
      title: `Do you want to delete '${username}'?`,
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Yes`,
    }).then((result) => {
      if (result.isDenied) {
        mutate(userId, {
          onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["user", "list"] });
            Swal.fire({ title: res.data.message, icon: "success" });
          },
        });
      }
    });
  };
  return (
    <div className="user">
      <div className="content">
        <div className="data">
          <p className="label">Username:</p>
          <p className="value">{username}</p>
        </div>
        <div className="data">
          <p className="label">Phone:</p>
          <p className="value">{phone}</p>
        </div>
        <div className="data">
          <p className="label">Created At:</p>
          <p className="value">{dayjs(createdAt).format("D MMM, YYYY")}</p>
        </div>
        <div className="data">
          <p className="label">Balance:</p>
          <p
            className="value"
            style={{ display: "flex", alignItems: "center" }}
          >
            <TbCurrencyTaka strokeWidth={3} style={{ marginRight: -2 }} />
            {balance}
          </p>
        </div>
      </div>
      <div className="actions">
        <button className="btn__delete" onClick={handleRemoveClick}>
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default UserList;
