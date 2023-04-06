import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./ViewMore.scss";

const ViewMore = ({ styles }) => {
  return (
    <button className="btn__view-more" style={{ ...styles }}>
      View More <MdKeyboardArrowDown />
    </button>
  );
};
export default ViewMore;
