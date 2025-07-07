import { type ReactNode } from 'react';
import { Navigate } from 'react-router';
import { ROUTE } from '../Constants/routes.constants';
import { useProfile } from '../contexts/profile.context';
import { TOKEN } from '../Constants/globals.constants';
import Loader from '../Components/Loader/Loader';
import { ProfileProvider } from '../contexts/ProfileContext';

function PrivateRouter({ children }: { children: ReactNode }) {
  return (
    <ProfileProvider>
      <PrivateRouterContent>{children}</PrivateRouterContent>
    </ProfileProvider>
  );
}

function PrivateRouterContent({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useProfile();
  const token = localStorage.getItem(TOKEN);

  if (isLoading || !token) return <Loader />;
  if (!isAuthenticated || !token) return <Navigate to={ROUTE.SIGNUP} />;

  return children;
}

export default PrivateRouter;
