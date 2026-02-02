import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="nav-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </div>

      <div className="nav-text-container">
        <Link to="/">
          <p className="nav-text">Home</p>
        </Link>
        <Link to="/jobs">
          <p className="nav-text">Jobs</p>
        </Link>
      </div>

      <button type="button" className="logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Header;
