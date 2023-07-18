import React from "react";
import "../../index.css"
import styles from "./navbar.module.css";
import { useLocation } from "react-router";

const Navbar = () => {
  const { pathname } = useLocation();

  const setTitle = (pathname) => {
    if (pathname === "/dashboard") {
      return "Dashboard";
    } else if (pathname.includes("menu")) {
      return "Menu";
    } else if (pathname.includes("profile")) {
      return "Profile";
    } else {
      return "Dashboard";
    }
  };
  return (
    <nav id="navbar" className={`${styles.navbar} fixed-top offset-2`}>
      <div className="d-flex align-items-center justify-content-between">
        <a
          id="navbarBrand"
          className={`${styles.navbarBrand} headline-small-semibold`}
        >
          {setTitle(pathname)}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
