import React from "react";
import "./AppBar.scss";
import { FiChevronLeft } from "react-icons/fi";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const AppBar = ({ title = "", page = "", showBackButton = true }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  };
  return (
    <div className="appbar">
      {showBackButton && (
        <BiLeftArrowAlt size={24} onClick={() => navigate(-1)} />
      )}
      <span className="title">{title}</span>

      {page == "admin" && (
        <button onClick={handleLogoutClick} className="btn__admin__logout">
          Logout
        </button>
      )}
    </div>
  );
};
export default AppBar;
