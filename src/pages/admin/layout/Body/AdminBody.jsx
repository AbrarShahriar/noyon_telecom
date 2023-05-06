import React from "react";
import Stats from "./components/Stats";
import Reqs from "./components/Reqs";
import Actions from "./components/Actions";
import Settings from "./components/Settings";
import Users from "./components/Users";
import { useNavigate } from "react-router-dom";
import NotiAction from "./components/NotiAction";

const AdminBody = ({ isModerator = false }) => {
  const navigate = useNavigate();
  return (
    <div className="admin__body">
      <Stats isModerator={isModerator} />
      <Reqs isModerator={isModerator} />
      {!isModerator && <Actions />}
      {!isModerator && <Users />}
      {!isModerator && <NotiAction />}
      {!isModerator && <Settings />}

      {!isModerator && (
        <div className="create">
          <button onClick={() => navigate(`/admin/create-offer`)}>
            Create Offer
          </button>
        </div>
      )}
      {!isModerator && (
        <div className="create">
          <button onClick={() => navigate(`/admin/offer-list`)}>
            View All Offers
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
      {isModerator && (
        <div className="withdraw">
          <button onClick={() => navigate(`/moderator/withdraw`)}>
            Withdraw
          </button>
        </div>
      )}

      <div className="withdraw">
        <button
          onClick={() =>
            navigate(
              `${isModerator ? "/moderator" : "/admin"}/withdraw-history`
            )
          }
        >
          Withdraw History
        </button>
      </div>
    </div>
  );
};
export default AdminBody;
