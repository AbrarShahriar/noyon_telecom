import React from "react";
import Deal from "./Deal";
import { getHotDeals } from "../../../../api/queries/home";
import { useQuery } from "react-query";
import { PageLoader } from "../../../shared/SuspenseWrapper";

const HotDeals = () => {
  const { isLoading, data: res } = useQuery(["offers", "hot"], getHotDeals);

  if (isLoading) {
    <PageLoader />;
  }

  return (
    <div className="deals__list">
      {res?.data &&
        res?.data.map((offer) => (
          <Deal
            key={offer.id}
            type={offer.type}
            id={offer.id}
            title={offer.title}
            desc={offer.desc}
            expiry={offer.expiration}
            regularPrice={offer.regularPrice}
            discountPrice={offer.discountPrice}
          />
        ))}
    </div>
  );
};
export default HotDeals;
