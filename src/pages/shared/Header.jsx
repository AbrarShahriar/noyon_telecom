import React from "react";
import "./Header.scss";
import { RxAvatar, RxSun, RxMagnifyingGlass } from "react-icons/rx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BiBell } from "react-icons/bi";
import { useStateValue } from "./StateProvider";

const Header = () => {
  const p = useLocation();
  // @ts-ignore
  const [{ loggedIn }] = useStateValue();
  const [showHeader, setShowHeader] = React.useState(
    !(
      p.pathname.includes("/login") ||
      p.pathname.includes("/buy") ||
      p.pathname.includes("/topup") ||
      p.pathname.includes("/membership") ||
      p.pathname.includes("/admin") ||
      p.pathname.includes("/notifications")
    )
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    setShowHeader(
      !(
        p.pathname.includes("/login") ||
        p.pathname.includes("/buy") ||
        p.pathname.includes("/topup") ||
        p.pathname.includes("/admin") ||
        p.pathname.includes("/membership") ||
        p.pathname.includes("/notifications")
      )
    );
  }, [p.pathname]);

  return (
    <>
      {showHeader && (
        <div className="home__header">
          <div className="nav">
            <div className="nav__options">
              {loggedIn && (
                <button
                  onClick={() => navigate("/notifications")}
                  className="nav__option nav__notification"
                >
                  <BiBell size={24} />
                </button>
              )}
              <button className="option">
                <RxMagnifyingGlass size={24} />
              </button>
            </div>
          </div>
          <div className="user">
            <RxAvatar size={64} />
            <div className="info">
              <span className="greeting">Good Morning</span>
              {loggedIn ? (
                <>
                  <span className="name">NoyoN</span>
                  <span className="phone">01841210657</span>
                </>
              ) : (
                <h3>Not Logged In</h3>
              )}
            </div>
          </div>
          <div className="weather">
            <RxSun />
            <span>20* C | Weather comment!</span>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};
export default Header;
