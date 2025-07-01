import { type ReactNode } from 'react';
import { Navigate } from 'react-router';
import { ROUTE } from '../Constants/routes.constants';
import { useProfile } from '../contexts/profile.context';
import Spin from 'antd/es/spin';
import { LoadingOutlined } from '@ant-design/icons';

function PrivateRouter({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useProfile();

  if (isLoading)
    return (
      <Spin
        fullscreen
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
      />
    );
  if (!isAuthenticated) return <Navigate to={ROUTE.SIGNUP} />;

  return children;
}

export default PrivateRouter;
