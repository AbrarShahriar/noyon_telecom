import React from "react";
import "./Notifs.scss";
import { TbBellRinging } from "react-icons/tb";
import AppBar from "../shared/AppBar";

const Noti = () => {
  return (
    <div className="noti">
      <div className="header">
        <TbBellRinging size={24} />
        <span className="time">2 hours ago</span>
      </div>
      <div className="content">
        <p className="title">Lorem ipsum dolor sit amet.</p>
        <p className="desc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure,
          repellendus.
        </p>
      </div>
    </div>
  );
};

const Notifs = () => {
  return (
    <>
      <AppBar title="Notifications" />
      <div className="notifs">
        <div className="notifs__container">
          <Noti />
          <Noti />
          <Noti />
        </div>
      </div>
    </>
  );
};
export default Notifs;
