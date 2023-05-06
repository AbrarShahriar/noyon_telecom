import React from "react";
import Offer from "./Offer";
import { useQuery } from "react-query";
import { getAllNonVipOffers } from "../../../../../api/queries/offers";
import { PageLoader } from "../../../../shared/SuspenseWrapper";
import Nothing from "../../../../shared/Nothing";

const RegularOffers = () => {
  const { isLoading, data: res } = useQuery(
    ["offers", "regular", "list"],
    getAllNonVipOffers,
    { staleTime: 1000 * 60 * 1 }
  );

  if (isLoading) {
    <PageLoader />;
  }
  return (
    <div className="regular__offers">
      {res && res.data.length > 1 ? (
        res.data.map((offer) => (
          <Offer
            key={offer.id}
            title={offer.title}
            adminPrice={offer.adminPrice}
            discountPrice={offer.discountPrice}
            regularPrice={offer.regularPrice}
            id={offer.id}
            expiration={offer.expiration}
            category={offer.category}
            simcard={offer.simcard}
            offerType="regular"
          />
        ))
      ) : (
        <Nothing title="No Offers!" />
      )}
    </div>
  );
};
export default RegularOffers;
