import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "./Deals.scss";
import HotDeals from "./HotDeals";
import { PageLoader } from "../../../shared/SuspenseWrapper";

const SpecialDeals = React.lazy(() => import("./SpecialDeals"));

const Deals = () => {
  return (
    <div className="deals">
      <Tabs>
        <TabList>
          <Tab>Hot Deals</Tab>
          <Tab>Special Deals</Tab>
        </TabList>

        <TabPanel>
          <HotDeals />
        </TabPanel>
        <TabPanel>
          <React.Suspense fallback={<PageLoader />}>
            <SpecialDeals />
          </React.Suspense>
        </TabPanel>
      </Tabs>
    </div>
  );
};
export default Deals;
