import React from "react";
import "./History.scss";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-datepicker/dist/react-datepicker.min.css";
import dayjs from "dayjs";
import { useStateValue } from "../shared/StateProvider";
import InOut from "../shared/stats/InOut";
import NotLoggedIn from "../shared/NotLoggedIn";
import TotalHistory from "./components/TotalHistory";
import MonthlyHistory from "./components/MonthlyHistory";

// topup history (in)
// offer buy history - internet, bundle, minute (out)
// sim flexiload history (out)

const History = () => {
  // @ts-ignore
  const [{ loggedIn }] = useStateValue();

  const [inVal, setinVal] = React.useState(0);
  const [outVal, setoutVal] = React.useState(0);

  const [selectedTabIndex, setselectedTabIndex] = React.useState(0);
  const [selectedMonth, setselectedMonth] = React.useState(
    dayjs(Date.now()).format("MMMM")
  );

  const handleTabClick = (index) => setselectedTabIndex(index);

  return (
    <div className="history">
      {loggedIn ? (
        <>
          <h3 className="title">History</h3>
          <InOut
            tabbed
            selectedMonth={selectedMonth}
            selectedTabIndex={selectedTabIndex}
            inValue={inVal}
            outValue={outVal}
          />

          <Tabs selectedIndex={selectedTabIndex} onSelect={handleTabClick}>
            <TabList>
              <Tab>Monthly</Tab>
              <Tab>Total</Tab>
            </TabList>

            <TabPanel>
              <MonthlyHistory
                setinVal={setinVal}
                setoutVal={setoutVal}
                setselectedMonth={setselectedMonth}
              />
            </TabPanel>
            <TabPanel>
              <TotalHistory setinVal={setinVal} setoutVal={setoutVal} />
            </TabPanel>
          </Tabs>
        </>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default History;
