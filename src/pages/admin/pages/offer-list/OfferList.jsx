import React from "react";
import AppBar from "../../../shared/AppBar";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import VipOffers from "./components/VipOffers";
import RegularOffers from "./components/RegularOffers";
import "./OfferList.scss";

const OfferList = () => {
  const [selectedTabIndex, setselectedTabIndex] = React.useState(0);

  const handleTabClick = (index) => {
    setselectedTabIndex(index);
  };
  return (
    <div className="admin__offer__list">
      <AppBar title="Offer List" />

      <Tabs selectedIndex={selectedTabIndex} onSelect={handleTabClick}>
        <TabList>
          <Tab>VIP</Tab>
          <Tab>Regular</Tab>
        </TabList>

        <TabPanel>
          <VipOffers />
        </TabPanel>
        <TabPanel>
          <RegularOffers />
        </TabPanel>
      </Tabs>
    </div>
  );
};
export default OfferList;
