import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "./authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const token = authenticateUser(username, password);

    if (!token) {
      setError("Invalid Username or Password");
      return;
    }

    localStorage.setItem("token", token);

    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    if (payload.role === "Admin") {
      navigate("/admin");
    } else if (payload.role === "Editor") {
      navigate("/editor");
    } else {
      navigate("/viewer");
    }
  };

  return (
    <div className="container">
      <div className="box">

        <h2>Role Based Authentication</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p className="error">{error}</p>

      </div>
    </div>
  );
}

export default Login;