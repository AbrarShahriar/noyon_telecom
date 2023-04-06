import React from "react";
import "./Login.scss";
import { RiLockPasswordLine, RiPhoneLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import InputMask from "react-input-mask";
import { useStateValue } from "../shared/StateProvider";
import { ACTION_TYPES } from "../../reducer";

const ICON_SIZE = 32;

const Login = () => {
  const [userMode, setuserMode] = React.useState("login");

  // @ts-ignore
  const [{ loggedIn }, dispatch] = useStateValue();

  const handleUserModeClick = () => {
    if (userMode == "login") {
      setuserMode("register");
    } else if (userMode == "register") {
      setuserMode("login");
    }
  };

  return (
    <div className="auth__login">
      <div className="auth__login__container">
        {loggedIn ? (
          <h2>Logged In</h2>
        ) : (
          <>
            <div className="title">
              <h3>{userMode == "login" ? "Login" : "Register"}</h3>
              <p className="desc" onClick={handleUserModeClick}>
                {userMode == "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
            </div>

            <div className="auth__login__container__inputs">
              {userMode == "register" && (
                <div className="input__container input__name">
                  <span>NAME</span>
                  <div className="input__icon">
                    <AiOutlineUser size={ICON_SIZE} />
                    <input type={"text"} />
                  </div>
                </div>
              )}
              <div className="input__container input__phone">
                <span>PHONE</span>
                <div className="input__icon">
                  <RiPhoneLine size={ICON_SIZE} />
                  <InputMask mask="+88\0 9999 999999" maskChar={null} />
                </div>
              </div>
              <div className="input__container input__pin">
                <span>PIN</span>
                <div className="input__icon">
                  <RiLockPasswordLine size={ICON_SIZE} />
                  <InputMask mask="999999" maskChar={null} maskPlaceholder="" />
                </div>
              </div>
            </div>

            <div
              onClick={() =>
                dispatch({
                  type: ACTION_TYPES.SET_LOGGED_IN_STATE,
                  payload: { loggedIn: true },
                })
              }
              className="btn__login"
            >
              <span>{userMode == "login" ? "LOGIN" : "REGISTER"}</span>
              <BsArrowRight />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Login;
