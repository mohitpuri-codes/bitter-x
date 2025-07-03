import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../config/axios.config';
import { apipaths } from '../../config/apiPaths';
import Loader from '../../Components/Loader/Loader';
import type { AxiosResponse } from 'axios';
import type { GetAllPosts } from '../../types/PostTypes';
import Fallback from '../../Components/Fallback /Fallback';
import styles from './home.module.css';
import { QueryKey } from '../../Constants/queryKeys.constants';
import PostCard from '../../Components/Post/PostCard';
import Empty from 'antd/es/empty';
import type { APIResponse } from '../../types/AuthTypes';

export default function Home() {
  const { data, isLoading, isError } = useQuery<
    AxiosResponse<APIResponse<GetAllPosts>>
  >({
    queryKey: [QueryKey.allPosts],
    queryFn: () => axiosInstance.get(apipaths.posts.getAllPosts()),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data?.data.success) {
    return <Fallback />;
  }

  const posts = data?.data?.data?.posts;
  const totalPostsLength = posts?.length;

  return (
    <>
      {(totalPostsLength ?? 0) > 0 ? (
        <div className={styles.feedContainer}>
          {posts?.map((postItem) => (
            <PostCard key={postItem._id} postItem={postItem} />
          ))}
        </div>
      ) : (
        <Empty description="No posts to display" />
      )}
    </>
  );
}
