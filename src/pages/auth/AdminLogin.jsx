import React from "react";
import "./AdminLogin.scss";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { adminLogin } from "../../api/auth/admin";
import { PageLoader } from "../shared/SuspenseWrapper";
import { setAdminKey } from "../../uitls";

const AdminLogin = () => {
  const [username, setusername] = React.useState("");
  const [password, setpassword] = React.useState("");
  const navigate = useNavigate();

  const { isLoading, mutate: login } = useMutation(adminLogin);

  const handleLoginClick = () => {
    login(
      { username, password },
      {
        onSuccess: (res) => {
          if (res.data.message) {
            Swal.fire({
              title: res.data.message,
              icon: "error",
            });
          } else if (res.data.adminKey) {
            setAdminKey(res.data.adminKey);
            navigate("/admin");
          }
        },
      }
    );
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="admin__login">
      <div className="container">
        <h2>Admin Login</h2>
        <input
          type="text"
          className="admin__username"
          value={username}
          placeholder="Username"
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          className="admin__password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button onClick={handleLoginClick} className="btn__admin__login">
          Login
        </button>
      </div>
    </div>
  );
};
export default AdminLogin;
