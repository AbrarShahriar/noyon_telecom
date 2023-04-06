import React from "react";
import "./Profile.scss";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { AiOutlineUser, AiOutlineRight } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { RiPhoneLine, RiServiceLine, RiVipCrown2Line } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { formatLabel } from "../../uitls";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../shared/StateProvider";
import Swal from "sweetalert2";
import { ACTION_TYPES } from "../../reducer";
// account type
// name,edit
// number

// membership
// history

// customer service
// logout

const ICON_SIZE = 20;
const type = "regular";
const member = false;

const Profile = () => {
  // @ts-ignore
  const [{ loggedIn }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    Swal.fire({
      title: "Do you want to logout?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Yes`,
    }).then((result) => {
      if (result.isDenied) {
        dispatch({
          type: ACTION_TYPES.SET_LOGGED_IN_STATE,
          payload: { loggedIn: false },
        });
      }
    });
  };
  return (
    <div className="profile">
      {loggedIn ? (
        <>
          <div className="profile__card__account">
            <p className="profile__card__account__title">Account</p>
            <div className="profile__card__account__options">
              <div className="profile__card__account__option account__type">
                <MdOutlineWorkspacePremium
                  size={ICON_SIZE}
                  className={"icon"}
                />
                <div className="type">
                  Account Type:<span className={type}>{formatLabel(type)}</span>
                </div>
              </div>
              <hr />
              <div className="profile__card__account__option account__name-edit">
                <AiOutlineUser className={"icon"} size={ICON_SIZE} />
                <div className="name-edit">
                  <span className="name">{"NoyoN"}</span>
                  <button className="btn__edit">
                    <FiEdit3 size={ICON_SIZE} />
                  </button>
                </div>
              </div>
              <hr />
              <div className="profile__card__account__option account__number">
                <RiPhoneLine className={"icon"} size={ICON_SIZE} />
                <span className="number">{"01841210657"}</span>
              </div>
            </div>
          </div>

          <div className="profile__card__membership-history">
            <div className="profile__card__membership-history__options">
              <div className="membership">
                <p className="title">Membership</p>
                <div className="extra">
                  {member ? "Already Bought!" : "Buy to get special offers!!"}
                </div>
                <button
                  onClick={() => navigate("/membership")}
                  disabled={member}
                  className={`btn__buy ${member && "--disabled"}`}
                >
                  Buy Now <RiVipCrown2Line className="icon" />
                </button>
              </div>
              {/* <div className="history">
            <p className="title">History</p>
            <div className="extra">See Your Past Transactions</div>
            <button className="btn__history">
              Tap to see <AiOutlineRight className="icon" />
            </button>
          </div> */}
            </div>
          </div>

          <div className="profile__card__customer-logout">
            <div className="profile__card__customer-logout__options">
              <div className="customer-service">
                <RiServiceLine size={ICON_SIZE} className="icon" />
                <span>Customer Service</span>
                <AiOutlineRight size={16} />
              </div>
              <hr />
              <div className="logout">
                <button onClick={handleLogoutClick}>
                  Logout
                  <IoIosLogOut size={ICON_SIZE} className="icon__logout" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p onClick={() => navigate("/login")}>Login To View This Page</p>
      )}
    </div>
  );
};
export default Profile;
