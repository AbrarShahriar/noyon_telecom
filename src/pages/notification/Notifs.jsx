import React from "react";
import "./Notifs.scss";
import { TbBellRinging } from "react-icons/tb";
import AppBar from "../shared/AppBar";
import { useQuery } from "react-query";
import { getNoti } from "../../api/queries/notification";
import { PageLoader } from "../shared/SuspenseWrapper";
import { parseDate } from "../../uitls";
import Nothing from "../shared/Nothing";

const Notifs = () => {
  const { isLoading, data: res } = useQuery(["noti", "list"], getNoti, {
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <>
      <AppBar title="Notifications" />
      <div className="notifs">
        <div className="notifs__container">
          {res?.data && res.data.length >= 1 ? (
            res.data.map((noti) => (
              <Noti
                createdAt={noti.createdAt}
                desc={noti.desc}
                title={noti.title}
                key={noti.id}
              />
            ))
          ) : (
            <Nothing title="No Notifications!" />
          )}
        </div>
      </div>
    </>
  );
};

const Noti = ({ createdAt, title, desc }) => {
  return (
    <div className="noti">
      <div className="header">
        <TbBellRinging size={24} />
        <span className="time">{parseDate(createdAt, true)}</span>
      </div>
      <div className="content">
        <p className="title">{title}</p>
        <p className="desc">{desc}</p>
      </div>
    </div>
  );
};

export default Notifs;
