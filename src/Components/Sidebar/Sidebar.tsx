import Menu from 'antd/es/menu';
import Button from 'antd/es/button';
import Sider from 'antd/es/layout/Sider';
import {
  HomeOutlined,
  CompassOutlined,
  BookOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router';
import { ROUTE } from '../../Constants/routes.constants';
import styles from './sidebar.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../config/axios.config';
import { apipaths } from '../../config/apiPaths';
import notification from 'antd/es/notification';
import type { AxiosResponse, AxiosError } from 'axios';
import type { APIResponse, LoggedinUserReponse } from '../../types/AuthTypes';
import type { CreatePostData } from '../../types/CreatePostFormTypes';
import { QueryKey } from '../../Constants/queryKeys.constants';

export default function Sidebar() {
  const location = useLocation();
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();

  const { mutateAsync: seedPostMutation } = useMutation<
    AxiosResponse<APIResponse<LoggedinUserReponse>>,
    AxiosError<AxiosError>,
    CreatePostData
  >({
    mutationFn: (data) => {
      const formData = new FormData();
      formData.append('content', data.content);

      return axiosInstance.post(apipaths.posts.createPost(), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onError: (error) => {
      api.error({
        message: error.response?.data.message,
        placement: 'topRight',
      });
    },
  });

  async function handleSeedPostClick() {
    const postData: CreatePostData[] = Array.from({ length: 5 }).map(
      (_, i) => ({
        content: `Seed post #${i + 1}`,
        images: [],
        tags: [],
      })
    );

    try {
      for (const data of postData) {
        await seedPostMutation(data);
      }

      api.success({
        message: '5 posts seeded successfully!',
        placement: 'topRight',
      });
      queryClient.invalidateQueries({ queryKey: [QueryKey.allPosts] });
      queryClient.invalidateQueries({ queryKey: [QueryKey.getMyPosts] });
    } catch (error) {
      console.error('Error seeding posts:', error);
    }
  }

  return (
    <>
      {contextHolder}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={250}
        className={styles.sidebarWrapper}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          className={styles.menu}
        >
          <Menu.Item
            key={ROUTE.HOME}
            icon={<HomeOutlined />}
            className={styles.menuItem}
          >
            <Link to={ROUTE.HOME}>Home</Link>
          </Menu.Item>
          <Menu.Item
            key={ROUTE.EXPLORE}
            icon={<CompassOutlined />}
            className={styles.menuItem}
          >
            <Link to={ROUTE.EXPLORE}>Explore</Link>
          </Menu.Item>
          <Menu.Item
            key={ROUTE.BOOKMARKS}
            icon={<BookOutlined />}
            className={styles.menuItem}
          >
            <Link to={ROUTE.BOOKMARKS}>Bookmarks</Link>
          </Menu.Item>
          <Menu.Item
            key={ROUTE.PROFILE}
            icon={<UserOutlined />}
            className={styles.menuItem}
          >
            <Link to={ROUTE.PROFILE}>Profile</Link>
          </Menu.Item>
        </Menu>

        <div className={styles.tweetButtonWrapper}>
          <Link to={ROUTE.TWEET}>
            <Button type="primary" block className={styles.tweetButton}>
              Tweet
            </Button>
          </Link>
        </div>

        <div className={styles.tweetButtonWrapper}>
          <Button onClick={handleSeedPostClick}>Seed Posts</Button>
        </div>
      </Sider>
    </>
  );
}
