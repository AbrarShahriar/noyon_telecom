import React from "react";
import "./VipOffers.scss";
import AppBar from "../shared/AppBar";
import Deal from "../home/layout/components/Deal";
import { PageLoader } from "../shared/SuspenseWrapper";
import { useQuery } from "react-query";
import { getAllVipOffers } from "../../api/queries/vip-offers";

const VipOffers = () => {
  const { isLoading, data: res } = useQuery(
    ["offers", "list", "vip"],
    getAllVipOffers,
    {
      staleTime: 1000 * 60 * 5,
    }
  );
  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="vip-offers">
      <AppBar title="VIP Offers" />

      <div className={`vip-offers__list`}>
        {res?.data &&
          res?.data.map((offer) => (
            <Deal
              isVipOnly
              desc={offer.desc}
              discountPrice={offer.discountPrice}
              expiry={offer.expiration}
              regularPrice={offer.regularPrice}
              title={offer.title}
              bgColor="white"
              id={offer.id}
              key={offer.id}
              type={offer.type}
            />
          ))}
      </div>
    </div>
  );
};
export default VipOffers;
