import React from "react";
import styles from "./sidebar.module.css";
import logo from "../../assets/mate.png";
import dashboard from "../../assets/dashboard.svg";
import article from "../../assets/article.svg";
import logout from "../../assets/logout.svg"
import home from "../../assets/home.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setisLoggedIn } from "../../config/store/userSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const nameUser = useSelector((state) => state.user.user) 
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    navigate("/login")
    dispatch(setisLoggedIn(false));
  }

  
  return (
    <div className={`${styles.sidebar}`}>
      <div
        className="d-flex flex-column flex-shrink-0 p-3"
        style={{ width: "15%", height: "100vh" }}
      >
        <Link
          to=""
          className="d-flex align-items-center gap-5 mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <img src={logo} alt="img" style={{width: "150px"}} />
        </Link>
        <br />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} nav-link d-flex align-item-center gap-3 ${styles.active}`
                  : `${styles.navLink} nav-link d-flex align-item-center gap-3`
              }
            >
              <img src={dashboard} alt="" className="img" />
              <span id="dashboard">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} nav-link d-flex align-item-center gap-3 ${styles.active}`
                  : `${styles.navLink} nav-link d-flex align-item-center gap-3`
              }
            >
              <img src={article} alt="" className="img" />
              <span id="menu">Menu</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} nav-link d-flex align-item-center gap-3 ${styles.active}`
                  : `${styles.navLink} nav-link d-flex align-item-center gap-3`
              }
            >
              <img src={home} alt="" className="img" />
              <span id="event">Proflie</span>
            </NavLink>
          </li>
        </ul>
        <div className="exit">
          <Link
            to="#"
            className="d-flex align-item-center gap-3 text-decoration-none"
            onClick={handleLogout}
          >
            <img src={logout} alt="" className="img" />
            <span className="text-danger" id="keluar">
              Keluar
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;