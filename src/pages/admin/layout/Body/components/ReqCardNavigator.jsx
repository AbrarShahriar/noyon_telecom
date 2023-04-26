import React from "react";
import "./ReqCardNavigator.scss";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ReqCardNavigator = ({
  title = "Membership",
  type = "membership",
  path = "/admin",
  count = 0,
  isModerator,
}) => {
  const navigate = useNavigate();
  return (
    <div className="req__card__navigator">
      <div
        className="content"
        onClick={() =>
          navigate(`${isModerator ? "/moderator" : "/admin"}${path}`)
        }
      >
        <p>{title}</p>

        <div className="count__icon">
          {count != 0 && <p className="count">{count}</p>}
          <AiOutlineRight />
        </div>
      </div>
    </div>
  );
};
export default ReqCardNavigator;
