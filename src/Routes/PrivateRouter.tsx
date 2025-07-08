import { useEffect, type ReactNode } from 'react';
import { Navigate } from 'react-router';
import { ROUTE } from '../Constants/routes.constants';
import { useProfile } from '../contexts/profile.context';
import { TOKEN } from '../Constants/globals.constants';
import Loader from '../Components/Loader/Loader';

function PrivateRouter({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, profile, refetchProfile, enabled } =
    useProfile();
  const token = localStorage.getItem(TOKEN);

  useEffect(() => {
    if (!profile && !enabled) {
      refetchProfile();
    }
  }, [profile, refetchProfile, enabled]);

  console.log(profile, 'profile');
  console.log(isAuthenticated, 'auth');
  console.log(isLoading, 'loading');

  if (isLoading || !isAuthenticated || !token) return <Loader />;
  if (!isAuthenticated || !token) return <Navigate to={ROUTE.SIGNUP} />;

  return children;
}

export default PrivateRouter;
