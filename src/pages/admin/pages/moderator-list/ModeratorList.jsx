import React from "react";
import "./ModeratorList.scss";
import AppBar from "../../../shared/AppBar";
import Swal from "sweetalert2";

const moderatorList = [
  {
    username: "mahin_islam",
    password: "12345678",
  },
  {
    username: "mahin_islam",
    password: "12345678",
  },
  {
    username: "mahin_islam",
    password: "12345678",
  },
  {
    username: "mahin_islam",
    password: "12345678",
  },
  {
    username: "mahin_islam",
    password: "12345678",
  },
  {
    username: "mahin_islam",
    password: "12345678",
  },
  {
    username: "mahin_islam",
    password: "12345678",
  },
];

const ModeratorList = () => {
  return (
    <div className="admin__moderator-list">
      <AppBar title="Moderator List" />

      <div className="moderators">
        {moderatorList.map((moderator) => (
          <Moderator
            username={moderator.username}
            password={moderator.password}
          />
        ))}
      </div>
    </div>
  );
};

const Moderator = ({ username, password }) => {
  const handleRemoveClick = (name) => {
    Swal.fire({
      title: `Do you want to delete '${name}'?`,
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Yes`,
    }).then((result) => {
      if (result.isDenied) {
        alert("deleted");
      }
    });
  };
  return (
    <div className="moderator">
      <div className="content">
        <div className="data">
          <p className="label">Username:</p>
          <p className="value">{username}</p>
        </div>
        <div className="data">
          <p className="label">Password:</p>
          <p className="value">{password}</p>
        </div>
      </div>
      <div className="actions">
        <button
          className="btn__delete"
          onClick={() => {
            handleRemoveClick(username);
          }}
        >
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default ModeratorList;
