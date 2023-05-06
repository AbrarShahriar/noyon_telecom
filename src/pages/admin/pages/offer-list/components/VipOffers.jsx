import React from "react";
import { getAllVipOffers } from "../../../../../api/queries/offers";
import { useQuery } from "react-query";
import { PageLoader } from "../../../../shared/SuspenseWrapper";
import Offer from "./Offer";
import Nothing from "../../../../shared/Nothing";

const VipOffers = () => {
  const { isLoading, data: res } = useQuery(
    ["offers", "vip", "list"],
    getAllVipOffers,
    { staleTime: 1000 * 60 * 1 }
  );

  if (isLoading) {
    <PageLoader />;
  }

  return (
    <div className="vip__offers">
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
            offerType="vip"
          />
        ))
      ) : (
        <Nothing title="No Offers!" />
      )}
    </div>
  );
};
export default VipOffers;
