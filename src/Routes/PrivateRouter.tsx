import { useContext, type ReactNode } from 'react';
import { Navigate } from 'react-router';
import { ROUTE } from '../Constants/routes.constants';
import { ProfileContext } from '../contexts/profile.context';
import Spin from 'antd/es/spin';
import { LoadingOutlined } from '@ant-design/icons';
import Flex from 'antd/es/flex';

function PrivateRouter({ children }: { children: ReactNode }) {
  const useProfile = () => useContext(ProfileContext);
  const { isAuthenticated, isLoading } = useProfile();

  if (isLoading)
    return (
      <Flex align="center" gap="middle">
        <Spin
          fullscreen
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        />
      </Flex>
    );
  if (!isAuthenticated) return <Navigate to={ROUTE.SIGNUP} />;

  return children;
}

export default PrivateRouter;
