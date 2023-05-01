import React, { useState } from "react";
import "./CreateOffer.scss";
import AppBar from "../../../shared/AppBar";
import Select from "react-select";
import { IMaskInput } from "react-imask";
import { useMutation } from "react-query";
import { createOffer, createRecharge } from "../../../../api/mutations/admin";
import { PageLoader } from "../../../shared/SuspenseWrapper";
import Swal from "sweetalert2";

const categoryOptions = [
  { value: "internet", label: "Internet" },
  { value: "minute", label: "Minute" },
  { value: "bundle", label: "Bundle" },
  { value: "recharge", label: "Recharge" },
];

const vipOfferOptions = [
  { value: false, label: "No" },
  { value: true, label: "Yes" },
];

const expiryUnitOptions = [
  { value: "hour", label: "Hour" },
  { value: "day", label: "Day" },
];

const offerBannerOptions = [
  { value: "regular", label: "Regular" },
  { value: "hot", label: "Hot" },
  { value: "special", label: "Special" },
];

const simOptions = [
  { value: "robi", label: "Robi" },
  { value: "airtel", label: "Airtel" },
  { value: "grameenphone", label: "Grameenphone" },
  { value: "banglalink", label: "Banglalink" },
];

const CreateOffer = () => {
  // api hooks
  const { isLoading: isOfferAddedLoading, mutate: addOffer } =
    useMutation(createOffer);
  const { isLoading: isRechargeAddedLoading, mutate: addRecharge } =
    useMutation(createRecharge);

  // component hooks

  const [category, setcategory] = useState("internet");
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [regularPrice, setregularPrice] = useState(0);
  const [discountPrice, setdiscountPrice] = useState(0);
  const [adminPrice, setadminPrice] = useState(0);
  const [rechargePrice, setrechargePrice] = useState(0);
  const [simcard, setsimcard] = useState("");
  const [expiration, setexpiration] = useState(1);
  const [expirationUnit, setexpirationUnit] = useState("day");
  const [isVip, setisVip] = useState(false);
  const [banner, setbanner] = useState("regular");

  const handleSubmitClick = () => {
    if (category == "recharge") {
      addRecharge(
        {
          amount: rechargePrice,
        },
        {
          onSuccess: (res) =>
            Swal.fire({ title: res.data.message, icon: "success" }),
          onError: (error) =>
            Swal.fire({ title: "Something Went Wrong", icon: "error" }),
        }
      );
    } else {
      addOffer(
        {
          category: category,
          title: title,
          regularPrice: regularPrice,
          discountPrice: discountPrice,
          adminPrice: adminPrice,
          simcard: simcard,
          type: banner,
          isPremium: isVip,
          expiration: `${expiration} ${expirationUnit}`,
          desc: desc || null,
        },
        {
          onSuccess: (res) =>
            Swal.fire({ title: res.data.message, icon: "success" }),
          onError: (error) =>
            Swal.fire({ title: "Something Went Wrong", icon: "error" }),
        }
      );
    }
  };

  return (
    <div className="admin__create">
      <AppBar title="Create Offer" />

      {isOfferAddedLoading || isRechargeAddedLoading ? (
        <PageLoader />
      ) : (
        <div className="admin__create__container">
          <div className="input__container">
            <p className="label">Category: </p>
            <Select
              styles={{ control: (styles) => ({ ...styles, padding: "7px" }) }}
              options={categoryOptions}
              defaultValue={categoryOptions[0]}
              // @ts-ignore
              onChange={(option) => setcategory(option?.value)}
            />
          </div>
          {category != "recharge" && (
            <>
              <div className="input__container">
                <p className="label">Title: </p>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                />
              </div>
              <div className="input__container">
                <p className="label">Description: </p>
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => setdesc(e.target.value)}
                />
              </div>
            </>
          )}
          {category == "recharge" && (
            <div className="input__container">
              <p className="label">Price: </p>
              <IMaskInput
                type="number"
                mask={Number}
                signed={false}
                onAccept={(value) => setrechargePrice(parseInt(value))}
              />
            </div>
          )}

          {category != "recharge" && (
            <>
              <div className="input__container">
                <p className="label">Sim Card: </p>
                <Select
                  styles={{
                    control: (styles) => ({ ...styles, padding: "7px" }),
                  }}
                  isClearable
                  options={simOptions}
                  // @ts-ignore
                  onChange={(option) => setsimcard(option?.value)}
                />
              </div>
              <div className="input__container">
                <p className="label">VIP Offer: </p>
                <Select
                  styles={{
                    control: (styles) => ({ ...styles, padding: "7px" }),
                  }}
                  options={vipOfferOptions}
                  defaultValue={vipOfferOptions[0]}
                  // @ts-ignore
                  onChange={(option) => setisVip(option?.value)}
                />
              </div>
              <div className="input__container">
                <p className="label">Admin Price: </p>
                <IMaskInput
                  type="number"
                  mask={Number}
                  signed={false}
                  max={10000}
                  onAccept={(value) => setadminPrice(parseInt(value))}
                />
              </div>
              <div className="input__container">
                <p className="label">Regular Price: </p>
                <IMaskInput
                  type="number"
                  mask={Number}
                  signed={false}
                  max={10000}
                  onAccept={(value) => setregularPrice(parseInt(value))}
                />
              </div>
              <div className="input__container">
                <p className="label">Discount Price: </p>
                <IMaskInput
                  type="number"
                  mask={Number}
                  max={10000}
                  signed={false}
                  onAccept={(value) => setdiscountPrice(parseInt(value))}
                />
              </div>
              <div className="input__container">
                <p className="label">Expiration: </p>
                <div className="sibling">
                  <IMaskInput
                    type="number"
                    mask={Number}
                    signed={false}
                    min={1}
                    max={expirationUnit == "day" ? 31 : 24}
                    onAccept={(value) => setexpiration(parseInt(value))}
                  />
                  <Select
                    options={expiryUnitOptions}
                    defaultValue={expiryUnitOptions[1]}
                    // @ts-ignore
                    onChange={(option) => setexpirationUnit(option?.value)}
                  />
                </div>
              </div>
              <div className="input__container">
                <p className="label">Banner: </p>
                <Select
                  options={offerBannerOptions}
                  defaultValue={offerBannerOptions[0]}
                  // @ts-ignore
                  onChange={(option) => setbanner(option?.value)}
                />
              </div>
            </>
          )}
          <button onClick={handleSubmitClick} className="btn__submit">
            Create
          </button>
        </div>
      )}
    </div>
  );
};
export default CreateOffer;
