import React from "react";
import "./History.scss";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { BiPlus, BiMinus } from "react-icons/bi";
import { TbCurrencyTaka } from "react-icons/tb";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import HistoryCard from "./components/HistoryCard";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../shared/StateProvider";

// topup history (in)
// offer buy history - internet, bundle, minute (out)
// sim flexiload history (out)

let d = [
  {
    type: "internet",
    amount: 23,
    date: "2021-09-27 15:22:53.679985+02",
  },
  {
    type: "topup",
    amount: 100,
    date: "2021-09-27 15:22:53.679985+02",
  },
  {
    type: "recharge",
    amount: 37,
    date: "2021-09-27 15:22:53.679985+02",
  },
  {
    type: "internet",
    amount: 23,
    date: "2021-09-27 15:22:53.679985+02",
  },
  {
    type: "minute",
    amount: 15,
    date: "2021-09-27 15:22:53.679985+02",
  },
];

const History = () => {
  const navigate = useNavigate();
  // @ts-ignore
  const [{ loggedIn }] = useStateValue();

  const [selectedTabIndex, setselectedTabIndex] = React.useState(0);
  const [startDate, setStartDate] = React.useState(new Date());
  const [selectedMonth, setselectedMonth] = React.useState(
    dayjs(Date.now()).format("MMMM")
  );

  // @ts-ignore
  const DatePickerWrapper = React.forwardRef(({ value, onClick }, ref) => (
    <button className="date-picker-wrapper" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const handleTabClick = (index) => {
    setselectedTabIndex(index);
  };

  const handleDateClick = (date) => {
    setStartDate(
      // @ts-ignore
      date
    );
    setselectedMonth(dayjs(date).format("MMMM"));
  };

  return (
    <div className="history">
      {loggedIn ? (
        <>
          <h3 className="title">History</h3>
          <div className="in-out">
            <div className="in">
              <div className="header">
                <BiPlus />
                <p>In</p>
                <span>{selectedTabIndex == 0 && selectedMonth}</span>
              </div>
              <div className="content">
                <TbCurrencyTaka strokeWidth={3} />
                <span>24</span>
              </div>
            </div>
            <div className="out">
              <div className="header">
                <BiMinus />
                <p>Out</p>
                <span>{selectedTabIndex == 0 && selectedMonth}</span>
              </div>
              <div className="content">
                <TbCurrencyTaka strokeWidth={3} />
                <span>13</span>
              </div>
            </div>
          </div>

          <Tabs selectedIndex={selectedTabIndex} onSelect={handleTabClick}>
            <TabList>
              <Tab>Monthly</Tab>
              <Tab>Total</Tab>
            </TabList>

            <TabPanel>
              <DatePicker
                selected={startDate}
                dateFormat={"MMMM yyyy"}
                showTwoColumnMonthYearPicker
                showMonthYearPicker
                showFullMonthYearPicker
                customInput={<DatePickerWrapper />}
                onChange={handleDateClick}
              />

              {d.map((el, i) => (
                <HistoryCard
                  className={i == 0 ? "first-el" : ""}
                  type={el.type}
                  amount={el.amount}
                  date={el.date}
                />
              ))}
            </TabPanel>
            <TabPanel>
              {d.map((el, i) => (
                <HistoryCard date={el.date} type={el.type} amount={el.amount} />
              ))}
              {d.map((el, i) => (
                <HistoryCard date={el.date} type={el.type} amount={el.amount} />
              ))}
            </TabPanel>
          </Tabs>
        </>
      ) : (
        <p onClick={() => navigate("/login")}>Login To View This Page</p>
      )}
    </div>
  );
};

export default History;
