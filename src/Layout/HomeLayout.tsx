import { Outlet } from "react-router";
import Sidebar from "../Components/Sidebar/Sidebar";

export default function HomeLayout() {
  return (
    <div className="main-wrapper">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
