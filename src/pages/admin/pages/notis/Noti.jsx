import React from "react";
import "./Noti.scss";
import AppBar from "../../../shared/AppBar";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getNoti } from "../../../../api/queries/notification";
import { PageLoader } from "../../../shared/SuspenseWrapper";
import { MySwal, parseDate } from "../../../../uitls";
import Nothing from "../../../shared/Nothing";
import { deleteNoti } from "../../../../api/mutations/admin";

const Noti = () => {
  const queryClient = useQueryClient();

  const { isLoading: isListLoading, data: res } = useQuery(
    ["noti", "list"],
    getNoti,
    { staleTime: 1000 * 60 * 2 }
  );

  const { isLoading: isDeleteLoading, mutate } = useMutation(deleteNoti);

  if (isListLoading || isDeleteLoading) {
    return <PageLoader />;
  }

  const handleDeleteClick = (id) => {
    MySwal.fire({
      title: "Are You Sure You Want Delete This Notification?",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "red",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id, {
          onSuccess: (res) => {
            queryClient.invalidateQueries(["noti", "list"]);
            MySwal.fire({
              title: "Deleted",
              icon: "success",
            });
          },
        });
      }
    });
  };

  return (
    <div className="admin__noti">
      <AppBar title="Notification List" />
      <div className="container">
        {res?.data && res.data.length >= 1 ? (
          res.data.map((noti) => (
            <div className="noti" key={noti.id}>
              <div className="content">
                <p className="title">{noti.title}</p>
                <p className="desc">{noti.desc}</p>
                <p className="created_at">{parseDate(noti.createdAt)}</p>
              </div>
              <div className="action">
                <button onClick={() => handleDeleteClick(noti.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <Nothing title="No Notifications" />
        )}
      </div>
    </div>
  );
};
export default Noti;
