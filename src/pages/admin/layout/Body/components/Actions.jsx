import React from "react";
import "./Actions.scss";
import { FiUserPlus, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useMutation } from "react-query";
import { createModerator } from "../../../../../api/mutations/admin";
import { PageLoader } from "../../../../shared/SuspenseWrapper";

// @ts-ignore
const MySwal = withReactContent(Swal);

const Actions = () => {
  const navigate = useNavigate();
  const { isLoading, mutate: addModerator } = useMutation(createModerator);

  const handleModeratorAddClick = async () => {
    const { value: formValues } = await MySwal.fire({
      title: <p className="modal-title">Add Moderator</p>,
      html:
        '<input id="username" class="modal-input">' +
        '<input id="password" class="modal-input">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        return {
          // @ts-ignore
          username: document.getElementById("username").value,
          // @ts-ignore
          password: document.getElementById("password").value,
        };
      },
    });

    if (formValues) {
      addModerator(formValues, {
        onSuccess: (res) =>
          Swal.fire({ title: res.data.message, icon: "success" }),
      });
    }
  };

  return (
    <>
      {isLoading && <PageLoader />}
      <div className="admin__actions admin__card">
        <h3>Moderator Options</h3>

        <div className="actions">
          <div
            onClick={handleModeratorAddClick}
            className="action add__moderator"
          >
            <FiUserPlus strokeWidth={3} size={18} />
            <p>Add</p>
          </div>

          <div
            onClick={() => navigate("/admin/moderator-list")}
            className="action view__moderators"
          >
            <FiUsers strokeWidth={3} size={18} />
            <p>View</p>
          </div>
        </div>

        {/* <button>Moderator History</button> */}
      </div>
    </>
  );
};
export default Actions;
