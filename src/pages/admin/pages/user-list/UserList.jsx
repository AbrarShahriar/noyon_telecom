import React, { useEffect, useState } from "react";
import "./UserList.scss";
import AppBar from "../../../shared/AppBar";
import Swal from "sweetalert2";
import { TbCurrencyTaka } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { PageLoader } from "../../../shared/SuspenseWrapper";
import { getAllUsers } from "../../../../api/queries/admin";
import { deleteUser } from "../../../../api/mutations/admin";
// @ts-ignore
import ReactInputMask from "react-input-mask";

const UserList = () => {
  const { isLoading, refetch } = useQuery(["user", "list"], getAllUsers, {
    enabled: false,
    onSuccess: (res) => {
      setdata(res.data);
      setinitData(res.data);
    },
    staleTime: 1000 * 60 * 2,
  });

  // @ts-ignore
  const [data, setdata] = useState([]);
  const [initData, setinitData] = useState([]);

  useEffect(() => {
    refetch();
  }, []);

  const [phone, setphone] = useState("");
  const handleSearchByPhone = () => {
    // @ts-ignore
    let filteredData = data.filter((d) => d.phone.includes(phone));

    console.log(filteredData);
    // @ts-ignore
    setdata(filteredData);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="admin__user-list">
      <AppBar title="User List" />

      <div className="search">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
          placeholder="Search By User Phone"
          className="search__by__phone"
        />
        <button onClick={handleSearchByPhone}>
          <AiOutlineSearch strokeWidth={10} size={18} />
        </button>
      </div>

      <p className="reset" onClick={() => setdata(initData)}>
        Reset
      </p>

      {data && (
        <div className="users">
          {data.map((user) => (
            <User
              // @ts-ignore
              username={user.name}
              // @ts-ignore
              phone={user.phone}
              // @ts-ignore
              balance={user.balance}
              // @ts-ignore
              userId={user.id}
              // @ts-ignore
              createdAt={user.createdAt}
              // @ts-ignore
              key={user.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const User = ({ username, balance, userId, createdAt, phone }) => {
  // @ts-ignore
  const { isLoading, mutate } = useMutation(deleteUser);
  const queryClient = useQueryClient();

  const handleRemoveClick = () => {
    Swal.fire({
      title: `Do you want to delete '${username}'?`,
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Yes`,
    }).then((result) => {
      if (result.isDenied) {
        mutate(userId, {
          onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["user", "list"] });
            Swal.fire({ title: res.data.message, icon: "success" });
          },
        });
      }
    });
  };
  return (
    <div className="user">
      <div className="content">
        <div className="data">
          <p className="label">Username:</p>
          <p className="value">{username}</p>
        </div>
        <div className="data">
          <p className="label">Phone:</p>
          <p className="value">{phone}</p>
        </div>
        <div className="data">
          <p className="label">Created At:</p>
          <p className="value">{dayjs(createdAt).format("D MMM, YYYY")}</p>
        </div>
        <div className="data">
          <p className="label">Balance:</p>
          <p
            className="value"
            style={{ display: "flex", alignItems: "center" }}
          >
            <TbCurrencyTaka strokeWidth={3} style={{ marginRight: -2 }} />
            {balance}
          </p>
        </div>
      </div>
      <div className="actions">
        <button className="btn__delete" onClick={handleRemoveClick}>
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default UserList;
