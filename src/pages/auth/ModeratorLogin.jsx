import React from "react";
import "./AdminLogin.scss";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { moderatorLogin } from "../../api/auth/moderator";
import { useMutation } from "react-query";
import { setModeratorKey } from "../../uitls";
import { PageLoader } from "../shared/SuspenseWrapper";

const ModeratorLogin = () => {
  const [username, setusername] = React.useState("");
  const [password, setpassword] = React.useState("");
  const navigate = useNavigate();

  const { isLoading, mutate: login } = useMutation(moderatorLogin);

  const handleLoginClick = () => {
    login(
      { username, password },
      {
        onSuccess: (res) => {
          if (res.data) {
            setModeratorKey(res.data);
            navigate("/moderator");
          }
        },
        onError: (err) => {
          Swal.fire({
            // @ts-ignore
            title: err.response.data.message,
            icon: "error",
          });
        },
      }
    );
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="moderator__login">
      <div className="container">
        <h2>Moderator Login</h2>
        <input
          type="text"
          className="moderator__username"
          value={username}
          placeholder="Username"
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          className="moderator__password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button onClick={handleLoginClick} className="btn__moderator__login">
          Login
        </button>
      </div>
    </div>
  );
};
export default ModeratorLogin;
