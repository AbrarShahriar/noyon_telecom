import React from "react";
import Deal from "./Deal";
import { PageLoader } from "../../../shared/SuspenseWrapper";
import { getSpecialDeals } from "../../../../api/queries/home";
import { useQuery } from "react-query";
import Nothing from "../../../shared/Nothing";

const SpecialDeals = () => {
  const { isLoading, data: res } = useQuery(
    ["offers", "special"],
    getSpecialDeals
  );

  if (isLoading) {
    <PageLoader />;
  }
  return (
    <div>
      {res?.data && res.data.length >= 1 ? (
        res?.data.map((offer) => (
          <Deal
            simcard={offer.simcard}
            key={offer.id}
            type={offer.type}
            id={offer.id}
            title={offer.title}
            desc={offer.desc}
            expiry={offer.expiration}
            regularPrice={offer.regularPrice}
            discountPrice={offer.discountPrice}
          />
        ))
      ) : (
        <Nothing title="No Offers Available!" />
      )}
    </div>
  );
};
export default SpecialDeals;
