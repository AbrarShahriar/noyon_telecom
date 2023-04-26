import React from "react";
import "./AppBar.scss";
import { FiChevronLeft } from "react-icons/fi";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { deleteAdminKey, deleteModeratorKey } from "../../uitls";

const AppBar = ({ title = "", page = "", showBackButton = true }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (page == "admin") {
      deleteAdminKey();
      navigate("/admin-login");
    } else if (page == "moderator") {
      deleteModeratorKey();
      navigate("/moderator-login");
    }
  };
  return (
    <div className="appbar">
      {showBackButton && (
        <BiLeftArrowAlt size={24} onClick={() => navigate(-1)} />
      )}
      <span className="title">{title}</span>

      {(page == "admin" || page == "moderator") && (
        <button onClick={handleLogoutClick} className="btn__admin__logout">
          Logout
        </button>
      )}
    </div>
  );
};
export default AppBar;
