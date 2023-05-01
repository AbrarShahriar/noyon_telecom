// @ts-ignore
import React, { useEffect, useState } from "react";
import "./AdminHistory.scss";
import AppBar from "../../../shared/AppBar";
import { formatLabel, parseDate } from "../../../../uitls";
import dayjs from "dayjs";
import { TbCurrencyTaka } from "react-icons/tb";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { useQuery } from "react-query";
import { PageLoader } from "../../../shared/SuspenseWrapper";
import {
  getAllTransactionHistory,
  getTodayTransactionHistory,
} from "../../../../api/queries/admin";
import {
  getTodayModeratorHistory,
  getTotalModeratorHistory,
} from "../../../../api/queries/moderator";
import Nothing from "../../../shared/Nothing";

const AdminHistory = ({ isModerator = false }) => {
  const [selectedTabIndex, setselectedTabIndex] = React.useState(0);

  const handleTabClick = (index) => {
    setselectedTabIndex(index);
  };

  return (
    <div className="admin__history">
      <AppBar title={`${isModerator ? "Moderator" : "Admin"} History`} />

      <Tabs selectedIndex={selectedTabIndex} onSelect={handleTabClick}>
        <TabList>
          <Tab>Today</Tab>
          <Tab>All Time</Tab>
        </TabList>

        <TabPanel>
          <TodayHistory isModerator={isModerator} />
        </TabPanel>
        <TabPanel>
          <TotalHistory isModerator={isModerator} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

const TodayHistory = ({ isModerator = false }) => {
  const d = new Date();

  const [data, setdata] = useState([]);

  // @ts-ignore
  const { isLoading: isAdminHistoryLoading, refetch: getAdminHistory } =
    useQuery(
      ["admin", "history", "today"],
      () =>
        getTodayTransactionHistory(
          `?date=${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`
        ),
      {
        enabled: false,
        staleTime: 1000 * 60 * 5,
        onSuccess: (res) => setdata(res.data),
      }
    );

  const { isLoading: isModeratorHistoryLoading, refetch: getModeratorHistory } =
    useQuery(
      ["admin", "history", "today"],
      () =>
        getTodayModeratorHistory(
          `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`
        ),
      {
        enabled: false,
        staleTime: 1000 * 60 * 5,
        onSuccess: (res) => setdata(res.data),
      }
    );

  React.useEffect(() => {
    if (isModerator) {
      getModeratorHistory();
    } else {
      getAdminHistory();
    }
  }, []);

  if (isAdminHistoryLoading || isModeratorHistoryLoading) {
    return <PageLoader />;
  }

  return (
    <>
      {data && data.length >= 1 ? (
        data
          .sort(
            (a, b) =>
              // @ts-ignore
              new Date(b.actionAt).getTime() -
              // @ts-ignore
              new Date(a.actionAt).getTime()
          )
          .map((history, i) => (
            <AdminHistoryItem
              // @ts-ignore
              amount={history.amount}
              // @ts-ignore
              approvedAt={history.actionAt}
              // @ts-ignore
              approvedBy={history.actionBy}
              // @ts-ignore
              title={history.title}
              // @ts-ignore
              reqStatus={history.reqStatus}
              // @ts-ignore
              userPhone={history.userPhone}
              key={i}
              // @ts-ignore
              type={history.type}
            />
          ))
      ) : (
        <Nothing title="No Transactions Today!" />
      )}
    </>
  );
};

// @ts-ignore
const TotalHistory = ({ isModerator = false }) => {
  const [data, setdata] = useState([]);

  const { isLoading: isAdminHistoryLoading, refetch: fetchAdminHistory } =
    useQuery(["admin", "history", "all"], getAllTransactionHistory, {
      staleTime: 1000 * 60 * 5,
      enabled: false,
      onSuccess: (res) => setdata(res.data),
    });

  const {
    isLoading: isModeratorHistoryLoading,
    refetch: fetchModeratorHistory,
  } = useQuery(["admin", "history", "all"], getTotalModeratorHistory, {
    staleTime: 1000 * 60 * 5,
    enabled: false,
    onSuccess: (res) => setdata(res.data),
  });

  React.useEffect(() => {
    if (isModerator) {
      fetchModeratorHistory();
    } else {
      fetchAdminHistory();
    }
  }, []);

  if (isAdminHistoryLoading || isModeratorHistoryLoading) {
    return <PageLoader />;
  }

  return (
    <>
      {data && data.length >= 1 ? (
        data
          .sort(
            (a, b) =>
              // @ts-ignore
              new Date(b.actionAt).getTime() -
              // @ts-ignore
              new Date(a.actionAt).getTime()
          )
          .map((history, i) => (
            <AdminHistoryItem
              // @ts-ignore
              amount={history.amount}
              // @ts-ignore
              approvedAt={history.actionAt}
              // @ts-ignore
              approvedBy={history.actionBy}
              // @ts-ignore
              title={history.title}
              // @ts-ignore
              userPhone={history.userPhone}
              // @ts-ignore
              reqStatus={history.reqStatus}
              key={i}
              // @ts-ignore
              type={history.type}
            />
          ))
      ) : (
        <Nothing title="No Transactions" />
      )}
    </>
  );
};

const AdminHistoryItem = ({
  type,
  title,
  userPhone,
  amount,
  approvedBy,
  approvedAt,
  reqStatus,
}) => {
  return (
    <div className="admin__history__item">
      <p className="type">{formatLabel(type)}</p>
      {type == "offer" && title && <p className="title">{title}</p>}
      <hr />
      <h4>User</h4>
      <div className="data">
        <p className="label">User Phone</p>
        <p className="value">{userPhone}</p>
      </div>
      <div className="data">
        <p className="label">Amount:</p>
        <p className="value" style={{ display: "flex", alignItems: "center" }}>
          <TbCurrencyTaka strokeWidth={3} style={{ marginRight: -2 }} />
          {amount}
        </p>
      </div>
      <hr />
      <h4>Moderator</h4>
      <div className="data">
        <p className="label">
          {`${reqStatus == "approved" ? "Approved" : "Rejected"}`} By:{" "}
        </p>
        <p className="value">{approvedBy}</p>
      </div>
      <div className="data">
        <p className="label">
          {`${reqStatus == "approved" ? "Approved" : "Rejected"}`} At:
        </p>
        <p className="value">{parseDate(approvedAt)}</p>
      </div>
    </div>
  );
};

export default AdminHistory;
