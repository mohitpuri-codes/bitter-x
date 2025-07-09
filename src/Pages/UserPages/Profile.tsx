import Card from 'antd/es/card';
import Avatar from 'antd/es/avatar';
import Typography from 'antd/es/typography';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Divider from 'antd/es/divider';
import List from 'antd/es/list';
import styles from './profile.module.css';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../config/axios.config';
import { apipaths } from '../../config/apiPaths';
import Fallback from '../../Components/Fallback /Fallback';
import Loader from '../../Components/Loader/Loader';
import type { APIResponse } from '../../types/AuthTypes';
import type { GetAllPosts, UserSchema } from '../../types/PostTypes';
import type { AxiosResponse } from 'axios';
import PostCard from '../../Components/Post/PostCard';
import EditProfileModal from '../../Components/Modal/EditProfileModal';
import { QueryKey } from '../../Constants/queryKeys.constants';

const { Title, Text } = Typography;

export default function Profile() {
  const {
    data: userInfo,
    isError,
    isLoading,
  } = useQuery<AxiosResponse<APIResponse<UserSchema>>>({
    queryKey: [QueryKey.userInfo],
    queryFn: () => axiosInstance.get(apipaths.user.profile()),
  });

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

  if (isError || isPostError) {
    <Fallback />;
  }

  const user = userInfo?.data.data;
  const posts = userPosts?.data?.data?.posts;
  return (
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
            <Col>
              <EditProfileModal userProfile={user} />
            </Col>
          </Row>
        </Card>
      )}

      <Divider />

      <Title level={4}>Posts</Title>

      {isPostsLoading ? (
        <Loader />
      ) : (
        <List
          itemLayout="vertical"
          dataSource={posts}
          className={styles.feedContainer}
          renderItem={(post) => (
            <div className={styles.feedContainer}>
              <PostCard key={post._id} postItem={post} />
            </div>
          )}
        />
      )}
    </div>
  );
}
