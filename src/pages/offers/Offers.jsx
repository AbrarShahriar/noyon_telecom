import React from "react";
import { useSearchParams } from "react-router-dom";
import Filters from "./layout/Filters";
import "./Offers.scss";
import Deal from "../home/layout/components/Deal";
import { useQuery } from "react-query";
import { PageLoader } from "../shared/SuspenseWrapper";
import { getOffersBasedOnFilter } from "../../api/queries/offers";

const Offers = () => {
  const [params] = useSearchParams();

  const { isLoading, data: res } = useQuery(
    ["offers", "query", "list", params.toString()],
    () => getOffersBasedOnFilter(params.toString()),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="offers">
      <Filters />

      <div className="offers__deals">
        {res?.data &&
          res?.data.map((offer) => (
            <Deal
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
export default Offers;
