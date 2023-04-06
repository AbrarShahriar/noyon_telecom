import React from "react";
import "./AppBar.scss";
import { FiChevronLeft } from "react-icons/fi";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const AppBar = ({ title = "" }) => {
  const navigate = useNavigate();
  return (
    <div className="appbar">
      <BiLeftArrowAlt size={24} onClick={() => navigate(-1)} />
      <span className="title">{title}</span>
    </div>
  );
};
export default AppBar;
