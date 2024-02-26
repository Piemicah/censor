import { Link } from "react-router-dom";
import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <HomeOutlinedIcon
          style={{ cursor: "pointer", textDecoration: "unset", color: "white" }}
        />
      </Link>

      <div>
        <Link to="/persons" style={{ textDecoration: "unset", color: "white" }}>
          View List
        </Link>
      </div>
      <div>
        <Link
          to="/registration/reg"
          style={{ textDecoration: "unset", color: "white" }}
        >
          Registration
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
