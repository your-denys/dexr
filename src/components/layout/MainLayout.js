// src/layouts/MainLayout.jsx
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
