import React from "react";
import "./Home.scss";
import Body from "./layout/Body";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useStateValue } from "../shared/StateProvider";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

const LS = {
  setTIme: () =>
    localStorage.setItem(
      "lastSec",
      JSON.stringify(Math.round(new Date().getTime() / 1000))
    ),
  getTIme: () => Math.round(Number(localStorage.getItem("lastSec"))),
};

const getCurTime = () => Math.round(new Date().getTime() / 1000);

function Home() {
  // @ts-ignore
  const [{ loggedIn }] = useStateValue();
  const navigate = useNavigate();

  React.useEffect(() => {
    let lsSec = LS.getTIme();

    if (!lsSec) {
      LS.setTIme();
      lsSec = LS.getTIme();
    }

    if (getCurTime() - lsSec > 10 * 60) {
      MySwal.fire({
        title: <p style={{ fontSize: 18 }}>NOTE!!</p>,
        html: (
          <span style={{ fontSize: 16, lineHeight: 1 }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure ut
            saepe sunt molestias officia laborum porro beatae iste doloremque
            maiores.
          </span>
        ),
      });
      LS.setTIme();
    }
  }, []);

  return (
    <div className="home">
      {loggedIn ? (
        <Body />
      ) : (
        <p onClick={() => navigate("/login")}>Login To View This Page</p>
      )}
    </div>
  );
}

export default Home;
