import { Outlet } from 'react-router';
import Sidebar from '../Components/Sidebar/Sidebar';
import { useContext } from 'react';
import { ProfileContext } from '../contexts/profile.context';

export default function HomeLayout() {
  const useProfile = () => useContext(ProfileContext);
  const { isLoading } = useProfile();
  return (
    <div className="main-wrapper">
      {isLoading ? null : <Sidebar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
