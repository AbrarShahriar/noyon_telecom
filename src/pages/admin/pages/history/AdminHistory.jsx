// @ts-ignore
import React, { useState } from "react";
import "./AdminHistory.scss";
import AppBar from "../../../shared/AppBar";
import { formatLabel, parseDate } from "../../../../uitls";
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
import { AiOutlineSearch } from "react-icons/ai";

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

  // @ts-ignore
  const [data, setdata] = useState([]);
  const [initData, setinitData] = useState([]);
  const [phone, setphone] = useState("");

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
        staleTime: 1000 * 60 * 2,
        onSuccess: (res) => {
          setdata(res.data);
          setinitData(res.data);
        },
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
        staleTime: 1000 * 60 * 2,
        onSuccess: (res) => {
          setdata(res.data);
          setinitData(res.data);
        },
      }
    );

  React.useEffect(() => {
    if (isModerator) {
      getModeratorHistory();
    } else {
      getAdminHistory();
    }
  }, []);

  const handleSearchByPhone = () => {
    // @ts-ignore
    let filteredData = data.filter((d) => d.userPhone.includes(phone));

    console.log(filteredData);
    // @ts-ignore
    setdata(filteredData);
  };

  if (isAdminHistoryLoading || isModeratorHistoryLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="search">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
          placeholder="Search By User Phone"
          className="search__by__phone"
        />
        <button onClick={handleSearchByPhone}>
          <AiOutlineSearch strokeWidth={10} size={18} />
        </button>
      </div>
      <p className="reset" onClick={() => setdata(initData)}>
        Reset
      </p>
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
              moderator={history.moderator}
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
  // @ts-ignore
  const [data, setdata] = useState([]);
  const [initData, setinitData] = useState([]);
  const [phone, setphone] = useState("");

  const { isLoading: isAdminHistoryLoading, refetch: fetchAdminHistory } =
    useQuery(["admin", "history", "all"], getAllTransactionHistory, {
      staleTime: 1000 * 60 * 2,
      enabled: false,
      onSuccess: (res) => {
        setdata(res.data);
        setinitData(res.data);
      },
    });

  const {
    isLoading: isModeratorHistoryLoading,
    refetch: fetchModeratorHistory,
  } = useQuery(["admin", "history", "all"], getTotalModeratorHistory, {
    staleTime: 1000 * 60 * 2,
    enabled: false,
    onSuccess: (res) => {
      setdata(res.data);
      setinitData(res.data);
    },
  });

  React.useEffect(() => {
    if (isModerator) {
      fetchModeratorHistory();
    } else {
      fetchAdminHistory();
    }
  }, []);

  const handleSearchByPhone = () => {
    // @ts-ignore
    let filteredData = data.filter(
      // @ts-ignore
      (d) => d.userPhone && d.userPhone.includes(phone)
    );

    console.log(filteredData);
    // @ts-ignore
    setdata(filteredData);
  };

  if (isAdminHistoryLoading || isModeratorHistoryLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="search">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
          placeholder="Search By User Phone"
          className="search__by__phone"
        />
        <button onClick={handleSearchByPhone}>
          <AiOutlineSearch strokeWidth={10} size={18} />
        </button>
      </div>
      <p className="reset" onClick={() => setdata(initData)}>
        Reset
      </p>
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
              moderator={history.moderator}
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
  moderator,
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
      <h4>{moderator ? "Moderator" : "User"}</h4>
      {userPhone && (
        <div className="data">
          <p className="label">Phone</p>
          <p className="value">{userPhone}</p>
        </div>
      )}
      {moderator && (
        <div className="data">
          <p className="label">Name:</p>
          <p className="value">{moderator}</p>
        </div>
      )}
      <div className="data">
        <p className="label">Amount:</p>
        <p className="value" style={{ display: "flex", alignItems: "center" }}>
          <TbCurrencyTaka strokeWidth={3} style={{ marginRight: -2 }} />
          {amount}
        </p>
      </div>
      <hr />
      <h4>Action By</h4>
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
