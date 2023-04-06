import React from "react";
import { useSearchParams } from "react-router-dom";
import Filters from "./layout/Filters";
import "./Offers.scss";
import Deal from "../home/layout/components/Deal";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Offers = () => {
  const [params, setParams] = useSearchParams();
  console.log(params.get("sim"));
  console.log(params.get("type"));
  return (
    <div className="offers">
      <Filters />

      <div className="offers__deals">
        <Deal type="hot" bgColor="white" />
        <Deal type="cashback" bgColor="white" />
        <Deal bgColor="white" />
        <Deal bgColor="white" />
      </div>
    </div>
  );
};
export default Offers;
