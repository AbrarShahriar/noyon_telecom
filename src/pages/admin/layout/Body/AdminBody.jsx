import React from "react";
import Stats from "./components/Stats";
import Reqs from "./components/Reqs";
import Actions from "./components/Actions";
import Settings from "./components/Settings";
import Users from "./components/Users";
import { useNavigate } from "react-router-dom";

const AdminBody = ({ isModerator = false }) => {
  const navigate = useNavigate();
  return (
    <div className="admin__body">
      <Stats isModerator={isModerator} />
      <Reqs isModerator={isModerator} />
      {!isModerator && <Actions />}
      {!isModerator && <Users />}
      {!isModerator && <Settings />}

      {!isModerator && (
        <div className="create">
          <button onClick={() => navigate(`/admin/create-offer`)}>
            Create Offer
          </button>
        </div>
      )}
      <div className="history">
        <button
          onClick={() =>
            navigate(
              `${isModerator ? "/moderator" : "/admin"}/${
                isModerator ? "moderator" : "admin"
              }-history`
            )
          }
        >
          Transaction History
        </button>
      </div>
    </div>
  );
};
export default AdminBody;
