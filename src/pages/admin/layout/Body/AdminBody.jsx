import React from "react";
import Stats from "./components/Stats";
import Reqs from "./components/Reqs";
import Actions from "./components/Actions";
import Settings from "./components/Settings";
import { useNavigate } from "react-router-dom";

const AdminBody = () => {
  const navigate = useNavigate();
  return (
    <div className="admin__body">
      <Stats />
      <Reqs />
      <Actions />
      <Settings />

      <div className="history">
        <button onClick={() => navigate("/admin-history")}>
          Transaction History
        </button>
      </div>
    </div>
  );
};
export default AdminBody;
