import React from "react";
import "./NotiAction.scss";
import { MySwal } from "../../../../../uitls";
import { useMutation } from "react-query";
import { createNoti } from "../../../../../api/mutations/admin";
import { BiBell, BiBellPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { PageLoader } from "../../../../shared/SuspenseWrapper";

const NotiAction = () => {
  const { isLoading, mutate: addNoti } = useMutation(createNoti);
  const navigate = useNavigate();
  const handleNotiAddClick = async () => {
    const { value: formValues } = await MySwal.fire({
      title: <p className="modal-title">Add Notification</p>,
      html:
        '<input placeholder="Title" id="title" class="modal-input">' +
        '<input placeholder="Description" id="desc" class="modal-input">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        return {
          // @ts-ignore
          title: document.getElementById("title").value,
          // @ts-ignore
          desc: document.getElementById("desc").value,
        };
      },
    });

    if (formValues) {
      addNoti(formValues, {
        onSuccess: (res) =>
          MySwal.fire({ title: res.data.message, icon: "success" }),
      });
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="admin__noti__action admin__card">
      <h3>Notification</h3>

      <div className="actions">
        <div onClick={handleNotiAddClick} className="action add__moderator">
          <BiBellPlus size={20} />
          <p>Add</p>
        </div>

        <div
          onClick={() => navigate("/admin/notification-list")}
          className="action view__moderators"
        >
          <BiBell size={20} />
          <p>View</p>
        </div>
      </div>
    </div>
  );
};
export default NotiAction;
