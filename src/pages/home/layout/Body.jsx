import React from "react";
import "./Body.scss";
import Card_Main_Balance from "./components/Card_Main_Balance";
import Deals from "./components/Deals";

import Options from "./components/Options";
import { useStateValue } from "../../shared/StateProvider";

const Body = () => {
  // @ts-ignore
  const [{ user }] = useStateValue();
  return (
    <div className="home__body">
      <Card_Main_Balance />

      <Options />
      {/* <JustForYou /> */}
      <Deals />
    </div>
  );
};
export default Body;
