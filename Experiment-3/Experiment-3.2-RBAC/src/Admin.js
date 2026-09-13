import { useNavigate } from "react-router-dom";
import { getUser, logout } from "./token";

function Navbar() {

  const navigate = useNavigate();

  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (

    <div className="navbar">

      <div>
        <h3>Role Based Access Control</h3>
      </div>

      <div>

        <span>
          {user?.username}
        </span>

        <span style={{marginLeft:"20px"}}>
          {user?.role}
        </span>

        <button
          className="logoutBtn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>

  );
}

export default Navbar;