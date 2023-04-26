import React from "react";
import "./Users.scss";
import { FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  return (
    <div className="admin__users admin__card">
      <h3>Users</h3>

      <button onClick={() => navigate("/admin/user-list")}>
        <FiUsers size={18} strokeWidth={3} />
        View All Users
      </button>
    </div>
  );
};
export default Users;
