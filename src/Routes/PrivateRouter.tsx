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

  if (isLoading) return <Loader />;
  if (isAuthenticated || token) return <>{children}</>;
  if (!isAuthenticated || !token) return <Navigate to={ROUTE.SIGNUP} />;
}

export default PrivateRouter;
