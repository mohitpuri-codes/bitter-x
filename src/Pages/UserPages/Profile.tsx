import Card from 'antd/es/card';
import Avatar from 'antd/es/avatar';
import Typography from 'antd/es/typography';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Divider from 'antd/es/divider';
import styles from './profile.module.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../config/axios.config';
import { apipaths } from '../../config/apiPaths';
import Fallback from '../../Components/Fallback /Fallback';
import Loader from '../../Components/Loader/Loader';
import type { APIResponse } from '../../types/AuthTypes';
import type { GetAllPosts, UserSchema } from '../../types/PostTypes';
import type { AxiosResponse } from 'axios';
import EditProfileModal from '../../Components/Modal/EditProfileModal';
import { QueryKey } from '../../Constants/queryKeys.constants';
import UserPosts from '../../Components/Post/UserPosts';
import Button from 'antd/es/button';
import logout from '../../assets/logout.svg';
import { TOKEN } from '../../Constants/globals.constants';
import useNotification from 'antd/es/notification/useNotification';
import { useNavigate } from 'react-router';
import { ROUTE } from '../../Constants/routes.constants';

const { Title, Text } = Typography;

export default function Profile() {
  const [api, contextHolder] = useNotification();
  const navigate = useNavigate();

  const {
    data: userInfo,
    isError,
    isLoading,
  } = useQuery<AxiosResponse<APIResponse<UserSchema>>>({
    queryKey: [QueryKey.userInfo],
    queryFn: () => axiosInstance.get(apipaths.user.profile()),
  });

  if (userInfo?.data.data) {
    <Fallback />;
  }

  const username = userInfo?.data.data.account.username;

  if (!username) {
    <Fallback />;
  }

  const {
    data: userPosts,
    isError: isPostError,
    isLoading: isPostsLoading,
  } = useQuery<AxiosResponse<APIResponse<GetAllPosts>>>({
    queryKey: [QueryKey.getMyPosts],
    queryFn: () =>
      axiosInstance.get(apipaths.user.getMyPosts(username as string)),
  });

  const { mutate: userLogoutMutation } = useMutation<
    AxiosResponse<APIResponse<null>>
  >({
    mutationFn: () => axiosInstance.post(apipaths.auth.logout()),
    onSuccess: (data) => {
      localStorage.removeItem(TOKEN);
      api.success({
        message: data.data.message,
      });
      navigate(ROUTE.SIGNUP);
    },
  });

  if (isError || isPostError) {
    <Fallback />;
  }

  const user = userInfo?.data.data;
  const posts = userPosts?.data?.data?.posts;

  function handleLogoutClick() {
    userLogoutMutation();
  }

  if (!user) return;

  return (
    <>
      {contextHolder}
      <div className={styles.profileContainer}>
        {isLoading ? (
          <Loader />
        ) : (
          <Card className={styles.profileCard}>
            <Row gutter={[16, 16]} align="middle">
              <Col>
                <Avatar size={100} src={user?.account?.avatar.url} />
              </Col>
              <Col flex="auto">
                <Title level={3} className={styles.profileTitle}>
                  {user?.firstName} {user?.lastName}
                </Title>
                <Text type="secondary">@{user?.account.username}</Text>
                <div className={styles.profileBio}>
                  <Text>{user?.bio}</Text>
                </div>
                <div className={styles.profileCount}>
                  <Text strong>{user?.followingCount}</Text> Following
                  &nbsp;&nbsp;
                  <Text strong>{user?.followersCount}</Text> Followers
                </div>
              </Col>
              <Col className={styles.logoutWrapper}>
                <EditProfileModal userProfile={user} />
                <Button onClick={handleLogoutClick} className={styles.logout}>
                  <div>
                    <img src={logout} alt="logout" />
                    <span>Logout</span>
                  </div>
                </Button>
              </Col>
            </Row>
          </Card>
        )}

        <Divider />

        <Title level={4}>Posts</Title>

        {isPostsLoading ? (
          <Loader />
        ) : (
          <UserPosts isPostsLoading={isPostsLoading} posts={posts} />
        )}
      </div>
    </>
  );
}
