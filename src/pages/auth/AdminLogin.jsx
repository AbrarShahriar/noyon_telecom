import React from "react";
import "./AdminLogin.scss";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminLogin = () => {
  const [username, setusername] = React.useState("");
  const [password, setpassword] = React.useState("");
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin");
    } else {
      Swal.fire({
        title: "Wrong Credentials!",
        icon: "error",
      });
    }
  };

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
