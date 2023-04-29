import React, { useEffect, useState } from "react";
import "./Header.scss";
import { RxAvatar, RxSun, RxMagnifyingGlass } from "react-icons/rx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BiBell } from "react-icons/bi";
import { useStateValue } from "./StateProvider";
import { useQuery } from "react-query";
import { getWeatherData } from "../../api/queries/home";
import { getLocation } from "../../uitls";

const Header = () => {
  const p = useLocation();

  const [weatherData, setweatherData] = useState(null);

  useEffect(() => {
    getLocation(async (pos) => {
      let res = await getWeatherData({
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      });
      setweatherData({
        // @ts-ignore
        msg: res.data.current.condition.text,
        temp: res.data.current.temp_c,
      });
    });
  }, []);

  // @ts-ignore
  const [{ loggedIn, user }] = useStateValue();
  const [showHeader, setShowHeader] = React.useState(
    !(
      p.pathname.includes("/login") ||
      p.pathname.includes("/offer-buy") ||
      p.pathname.includes("/recharge") ||
      p.pathname.includes("/topup") ||
      p.pathname.includes("/membership") ||
      p.pathname.includes("/vip-offers") ||
      p.pathname.includes("/admin") ||
      p.pathname.includes("/moderator") ||
      p.pathname.includes("/notifications")
    )
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    setShowHeader(
      !(
        p.pathname.includes("/login") ||
        p.pathname.includes("/recharge") ||
        p.pathname.includes("/offer-buy") ||
        p.pathname.includes("/topup") ||
        p.pathname.includes("/admin") ||
        p.pathname.includes("/moderator") ||
        p.pathname.includes("/membership") ||
        p.pathname.includes("/vip-offers") ||
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
              {/* <span className="greeting">Good Morning</span> */}
              {loggedIn ? (
                <>
                  <span className="name">{user.name}</span>
                  <span className="phone">{user.phone}</span>
                </>
              ) : (
                <h3>Not Logged In</h3>
              )}
            </div>
          </div>
          <div className="weather">
            {weatherData && (
              <>
                <RxSun />
                <span>
                  {
                    // @ts-ignore
                    weatherData.temp
                  }
                  * C |{" "}
                  {
                    // @ts-ignore
                    weatherData.msg
                  }
                  !
                </span>
              </>
            )}
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};
export default Header;
