import React from "react";
import FadeLoader from "react-spinners/FadeLoader";
import "./PageLoader.scss";

export const PageLoader = () => {
  return (
    <div className="page__loader">
      <div className="container">
        <FadeLoader
          height={10}
          margin={1}
          radius={1}
          width={5}
          color="#db2044"
        />
      </div>
    </div>
  );
};

const SuspenseWrapper = ({ element }) => {
  return <React.Suspense fallback={<PageLoader />}>{element}</React.Suspense>;
};
export default SuspenseWrapper;
