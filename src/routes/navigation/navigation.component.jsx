import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";

export default function Navigation() {
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}
