import React, { useState } from "react";
import "./Login.scss";
import { RiLockPasswordLine, RiPhoneLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import InputMask from "react-input-mask";
import { useStateValue } from "../shared/StateProvider";
import { ACTION_TYPES } from "../../reducer";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { createUser } from "../../api/auth/register";
import { login } from "../../api/auth/login";
import { PageLoader } from "../shared/SuspenseWrapper";
import Swal from "sweetalert2";
import { MySwal, formatPhone } from "../../uitls";
import { IMaskInput } from "react-imask";

const ICON_SIZE = 32;

const Login = () => {
  const [userMode, setuserMode] = React.useState("login");
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [pin, setpin] = useState("");

  const { isLoading: isRegisterLoading, mutate: register } =
    useMutation(createUser);
  const { isLoading: isLoginLoading, mutate: loginUser } = useMutation(login);

  // @ts-ignore
  const [{ loggedIn }, dispatch] = useStateValue();

  const handleUserModeClick = () => {
    if (userMode == "login") {
      setuserMode("register");
    } else if (userMode == "register") {
      setuserMode("login");
    }
  };

  const handleSubmitClick = () => {
    let formattedPhone = formatPhone(phone);

    if (!formattedPhone || !pin) {
      return Swal.fire({
        title: "Please fill in all the info",
        icon: "error",
      });
    }

    if (formattedPhone.length != 11) {
      return Swal.fire({
        title: "Invalid Phone Number",
        icon: "error",
      });
    }

    if (formattedPhone[1] == "0") {
      return Swal.fire({
        title: "Invalid Phone Number",
        icon: "error",
      });
    }

    if (pin.length != 6) {
      return Swal.fire({
        title: "Invalid Pin",
        icon: "error",
      });
    }

    if (userMode == "register") {
      register(
        { name, phone: formattedPhone, pin },
        {
          onSuccess: (res) =>
            Swal.fire({
              // @ts-ignore
              title: res.data.message,
              text: "Login to continue",
              icon: "success",
            }),
          onError: (err) =>
            Swal.fire({
              // @ts-ignore
              title: err?.response.data.message,
              icon: "error",
            }),
        }
      );
    } else if (userMode == "login") {
      loginUser(
        { phone: formattedPhone, pin },
        {
          onSuccess: (res) => {
            Swal.fire({
              // @ts-ignore
              title: res.data.message,
              icon: "success",
            });
            dispatch({
              type: ACTION_TYPES.SET_LOGGED_IN_STATE,
              payload: { loggedIn: true },
            });
            dispatch({
              type: ACTION_TYPES.SET_USER,
              payload: { user: res.data.payload },
            });
            navigate("/");
          },
          onError: (err) =>
            MySwal.fire({
              title: (
                // @ts-ignore
                <p style={{ fontSize: 24 }}>{err?.response.data.message}</p>
              ),
              icon: "error",
            }),
        }
      );
    }
  };

  if (isLoginLoading || isRegisterLoading) {
    return <PageLoader />;
  }

  return (
    <div className="auth__login">
      <div className="auth__login__container">
        <div className="title">
          <h2>{userMode == "login" ? "Login" : "Register"}</h2>
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
                <input
                  type={"text"}
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
            </div>
          )}
          <div className="input__container input__phone">
            <span>PHONE</span>
            <div className="input__icon">
              <RiPhoneLine size={ICON_SIZE} />
              <IMaskInput
                mask="+{88\0} #000 000000"
                definitions={{
                  "#": /[1-9]/,
                }}
                onAccept={(value) => setphone(value)}
              />
            </div>
          </div>
          <div className="input__container input__pin">
            <span>PIN</span>
            <div className="input__icon">
              <RiLockPasswordLine size={ICON_SIZE} />
              <IMaskInput
                mask="999999"
                onAccept={(value) => setpin(value)}
              />
            </div>
          </div>
        </div>

        <div onClick={handleSubmitClick} className="btn__login">
          <span>{userMode == "login" ? "LOGIN" : "REGISTER"}</span>
          <BsArrowRight />
        </div>
      </div>
    </div>
  );
};
export default Login;
