import React from "react";
import "./Actions.scss";
import { FiUserPlus, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Actions = () => {
  const [username, setusername] = React.useState("");
  const [password, setpassword] = React.useState("");

  const navigate = useNavigate();

  const handleModeratorAddClick = () => {
    MySwal.fire({
      title: <p className="modal-title">Add Moderator</p>,
      html: (
        <div className="modal">
          <input
            type="text"
            className="modal-input"
            onChange={(e) => setusername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="text"
            className="modal-input"
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Password"
          />
        </div>
      ),
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
    });
  };

  return (
    <div className="admin__actions admin__card">
      <h3>Moderator Options</h3>

      <div className="actions">
        <div
          onClick={handleModeratorAddClick}
          className="action add__moderator"
        >
          <FiUserPlus strokeWidth={3} size={16} />
          <p>Add</p>
        </div>

        <div
          onClick={() => navigate("/admin/moderator-list")}
          className="action view__moderators"
        >
          <FiUsers strokeWidth={3} size={16} />
          <p>View</p>
        </div>
      </div>
    </div>
  );
};
export default Actions;
