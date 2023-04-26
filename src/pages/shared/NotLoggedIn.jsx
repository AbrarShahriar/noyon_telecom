import React from "react";
import "./NotLoggedIn.scss";
import { useNavigate } from "react-router-dom";

const NotLoggedIn = () => {
  const navigate = useNavigate();
  return (
    <div className="not-logged-in">
      <p onClick={() => navigate("/login")}>Login To View This Page</p>
    </div>
  );
};
export default NotLoggedIn;
