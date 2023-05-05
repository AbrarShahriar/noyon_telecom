import React, { useEffect } from "react";
import "./VipOffers.scss";
import AppBar from "../shared/AppBar";
import Deal from "../home/layout/components/Deal";
import { PageLoader } from "../shared/SuspenseWrapper";
import { useQuery } from "react-query";
import { getAllVipOffers } from "../../api/queries/vip-offers";
import Nothing from "../shared/Nothing";
import Filters from "./layout/Filters";
import {
  getOffersBasedOnFilter,
  getVipOffersBasedOnFilter,
} from "../../api/queries/offers";
import { useSearchParams } from "react-router-dom";

const VipOffers = () => {
  //   const { isLoading, data: res } = useQuery(
  //     ["offers", "list", "vip"],
  //     getAllVipOffers,
  //     {
  //       staleTime: 1000 * 60 * 5,
  //     }
  //   );

  const [params] = useSearchParams();

  const { isLoading, data: res } = useQuery(
    ["vip-offers", "query", "list", params.toString()],
    () => getVipOffersBasedOnFilter(`${params.toString()}`),
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

      <Filters />

      <div className={`vip-offers__list`}>
        {res?.data && res.data.length >= 1 ? (
          res?.data.map((offer) => (
            <Deal
              simcard={offer.simcard}
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
          ))
        ) : (
          <Nothing title="No VIP Offers Available!" />
        )}
      </div>
    </div>
  );
};
export default VipOffers;
