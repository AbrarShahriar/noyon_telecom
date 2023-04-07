import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./BottomNav.scss";
import { AiOutlineUser, AiOutlineHistory } from "react-icons/ai";
import { IoTicketOutline } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";
import { BiBell, BiHomeAlt } from "react-icons/bi";

const ICON_SZIE = 30;

const options = [
  {
    path: "/",
    icon: <BiHomeAlt size={ICON_SZIE} />,
  },
  {
    path: "/offers",
    icon: <IoTicketOutline size={ICON_SZIE} />,
  },
  {
    path: "/login",
    icon: <IoIosLogIn size={ICON_SZIE} />,
  },
  {
    path: "/history",
    icon: <AiOutlineHistory size={ICON_SZIE} />,
  },
  {
    path: "/profile",
    icon: <AiOutlineUser size={ICON_SZIE} />,
  },
];

const BottomNav = () => {
  const p = useLocation();
  const [selectedOption, setSelectedOption] = React.useState(p.pathname);

  const [showBottomNav, setShowBottomNav] = React.useState(
    !(
      p.pathname.includes("/topup") ||
      p.pathname.includes("/notifications") ||
      p.pathname.includes("/admin") ||
      p.pathname.includes("/membership") ||
      p.pathname.includes("/buy")
    )
  );

  React.useEffect(() => {
    setShowBottomNav(
      !(
        p.pathname.includes("/topup") ||
        p.pathname.includes("/notifications") ||
        p.pathname.includes("/admin") ||
        p.pathname.includes("/membership") ||
        p.pathname.includes("/buy")
      )
    );
    setSelectedOption(p.pathname);
  }, [p.pathname]);

  const nagivate = useNavigate();

  const handleOptionClick = (path) => {
    setSelectedOption(path);
    nagivate(path);
  };

  const formatLabel = (path) => {
    switch (path) {
      case "/":
        return "Home";

      case "/offers":
        return "Offers";

      case "/login":
        return "Signup";

      case "/history":
        return "History";

      case "/profile":
        return "Profile";

      default:
        return "Other";
    }
  };
  return (
    <>
      {/* <Outlet /> */}
      {showBottomNav && (
        <div className="bottom-nav">
          <div className="bottom-nav__options">
            {options.map((opt) => (
              <div
                className={`bottom-nav__option ${
                  selectedOption == opt.path && "--selected"
                }`}
                onClick={() => handleOptionClick(opt.path)}
                key={opt.path}
              >
                <div className="icon">{opt.icon}</div>
                <span className="show">{`${formatLabel(opt.path)}`}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default BottomNav;
