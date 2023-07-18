import Sidebar from "../sidebar/sidebar";
import Navbar from "../navbar/navbar";
import styles from "./Layout.module.css";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="d-flex">
      <div className="col-2 position-fixed">
        <Sidebar />
      </div>
      <div className={`col offset-2 ${styles.bg}`}>
        <Navbar />
        <div className={styles.mainContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;