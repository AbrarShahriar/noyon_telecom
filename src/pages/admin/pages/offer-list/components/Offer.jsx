import React from "react";
import "./Offer.scss";
import { BiEditAlt } from "react-icons/bi";
import { MySwal, formatLabel } from "../../../../../uitls";
import { useMutation, useQueryClient } from "react-query";
import { udpateOffer } from "../../../../../api/mutations/admin";
import { PageLoader } from "../../../../shared/SuspenseWrapper";

const Offer = ({
  title,
  adminPrice,
  discountPrice,
  regularPrice,
  id,
  expiration,
  category,
  simcard,
  offerType,
}) => {
  const { isLoading, mutate: update } = useMutation(udpateOffer);
  const queryClient = useQueryClient();

  const handleEditClick = (propName) => {
    let modalTitle = "";
    let modalInputType = "number";
    let modalInputValue = "";

    switch (propName) {
      case "adminPrice":
        modalTitle = "Set Admin Price";
        modalInputValue = adminPrice;
        break;
      case "discountPrice":
        modalTitle = "Set Discount Price";
        modalInputValue = discountPrice;
        break;
      case "notice":
        modalTitle = "Set Regular Price";
        modalInputValue = regularPrice;
        break;

      default:
        break;
    }

    MySwal.fire({
      title: <p className="modal-title">{modalTitle}</p>,
      // @ts-ignore
      input: modalInputType,
      inputValue: modalInputValue,
      showCancelButton: true,
      // @ts-ignore
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }

        let propValue = Number(value);

        update(
          {
            id,
            [propName]: propValue,
          },
          {
            onSuccess: () => {
              MySwal.fire({ title: "Updated", icon: "success" });
              queryClient.invalidateQueries(["offers", offerType, "list"]);
            },
            onError: () =>
              MySwal.fire({ title: "Something Went Wrong!", icon: "error" }),
          }
        );
      },
    });
  };

  const handleDelete = () => {
    update(
      {
        id,
        showOffer: false,
      },
      {
        onSuccess: () => {
          MySwal.fire({ title: "Deleted", icon: "success" });
          queryClient.invalidateQueries(["offers", offerType, "list"]);
        },
        onError: () =>
          MySwal.fire({ title: "Something Went Wrong!", icon: "error" }),
      }
    );
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="offer">
      <p className="title">{title}</p>
      <div className="other">
        <p className="expiration">{expiration}</p>
        <p className="simcard">{formatLabel(simcard)}</p>
        <p className="category">{formatLabel(category)}</p>
      </div>
      <hr />
      <div className="offer__data">
        <p className="label">Admin Price</p>
        <div className="value">
          <p>{adminPrice}</p>
          <BiEditAlt size={24} onClick={() => handleEditClick("adminPrice")} />
        </div>
      </div>
      <div className="offer__data">
        <p className="label">Discount Price</p>
        <div className="value">
          <p>{discountPrice}</p>
          <BiEditAlt
            size={24}
            onClick={() => handleEditClick("discountPrice")}
          />
        </div>
      </div>
      <div className="offer__data">
        <p className="label">Regular Price</p>
        <div className="value">
          <p>{regularPrice}</p>
          <BiEditAlt
            size={24}
            onClick={() => handleEditClick("regularPrice")}
          />
        </div>
      </div>

      <button onClick={handleDelete}>DELETE</button>
    </div>
  );
};
export default Offer;
