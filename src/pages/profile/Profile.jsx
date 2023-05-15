import React from "react";
import "./Profile.scss";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import {
  AiOutlineUser,
  AiOutlineRight,
  AiOutlineCloudDownload,
} from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiPhoneLine, RiServiceLine, RiVipCrown2Line } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { formatLabel } from "../../uitls";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../shared/StateProvider";
import Swal from "sweetalert2";
import { ACTION_TYPES } from "../../reducer";
import NotLoggedIn from "../shared/NotLoggedIn";
import { useQuery, useQueryClient } from "react-query";
import { logout } from "../../api/auth/logout";
import { userData } from "../../api/queries/profile";
import { PageLoader } from "../shared/SuspenseWrapper";
import ReactWhatsapp from "react-whatsapp";
// account type
// name,edit
// number

// membership
// history

// customer service
// logout

const ICON_SIZE = 24;
const type = "regular";
// @ts-ignore
const member = type == "premium";

const Profile = () => {
  // @ts-ignore
  const [{ loggedIn, user, appLink }, dispatch] = useStateValue();

  const queryClient = useQueryClient();
  const { isLoading, data: res } = useQuery(["profile", "info"], userData);

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    Swal.fire({
      title: "Do you want to logout?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Yes`,
    }).then(async (result) => {
      if (result.isDenied) {
        await queryClient.fetchQuery({
          queryKey: ["auth", "logout"],
          queryFn: logout,
        });
        dispatch({
          type: ACTION_TYPES.SET_LOGGED_IN_STATE,
          payload: { loggedIn: false },
        });
        dispatch({
          type: ACTION_TYPES.SET_USER,
          payload: { user: null },
        });
        Swal.fire({
          title: "Logged Out",
          icon: "success",
        });
      }
    });
  };

  if (!loggedIn) {
    return <NotLoggedIn />;
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="profile">
      <div className="profile__card__account">
        <p className="profile__card__account__title">Account</p>
        <div className="profile__card__account__options">
          <div className="profile__card__account__option account__type">
            <MdOutlineWorkspacePremium size={ICON_SIZE} className={"icon"} />
            <div className="type">
              Account Type:
              <span className={res?.data.subscription}>
                {formatLabel(res?.data.subscription)}
              </span>
            </div>
          </div>
          <hr />
          <div className="profile__card__account__option account__name-edit">
            <AiOutlineUser className={"icon"} size={ICON_SIZE} />
            <div className="name-edit">
              <span className="name">{res?.data.name}</span>
            </div>
          </div>
          <hr />
          <div className="profile__card__account__option account__number">
            <RiPhoneLine className={"icon"} size={ICON_SIZE} />
            <span className="number">{res?.data.phone}</span>
          </div>
        </div>
      </div>

      <div className="profile__card__membership-history">
        <div className="profile__card__membership-history__options">
          <div className="membership">
            <p className="title">Membership</p>
            <div className="extra">
              {res?.data.subscription == "premium"
                ? "Already Bought!"
                : "Buy to get special offers!!"}
            </div>
            <button
              onClick={() => navigate("/membership")}
              disabled={res?.data.subscription == "premium"}
              className={`btn__buy ${
                res?.data.subscription == "premium" && "--disabled"
              }`}
            >
              Buy Now
              <RiVipCrown2Line className="icon" size={ICON_SIZE - 4} />
            </button>
          </div>
        </div>
      </div>

      <div className="profile__card__customer-logout">
        <div className="profile__card__customer-logout__options">
          <div className="customer-service">
            <RiServiceLine size={ICON_SIZE} className="icon" />
            <ReactWhatsapp
              number="+880-1810-479196"
              message={`Your Opinion:  \nPhone Number: ${
                user?.phone || ""
              } \nName: ${
                user?.name || ""
              } \n\n(Send A Screenshot Of Your Problem)`
                .trimStart()
                .trimEnd()}
              element={"span"}
            >
              Customer Service
            </ReactWhatsapp>

            <AiOutlineRight size={16} />
          </div>
          <hr />
          <div className="customer-service">
            <HiOutlineMail size={ICON_SIZE + 5} className="icon" />
            <Mailto
              email="
support@enoy-topup.com"
              subject="Support"
              body=""
            >
              Email Us
            </Mailto>

            <AiOutlineRight size={16} />
          </div>
          <hr />
          <div className="download">
            <a href={appLink}>
              Download App
              <AiOutlineCloudDownload
                size={ICON_SIZE}
                className="icon__download"
              />
            </a>
          </div>
          <div className="logout">
            <button onClick={handleLogoutClick}>
              Logout
              <IoIosLogOut size={ICON_SIZE} className="icon__logout" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Mailto = ({ email, subject = "", body = "", children }) => {
  let params = subject || body ? "?" : "";
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

  return <a href={`mailto:${email}${params}`}>{children}</a>;
};

export default Profile;
