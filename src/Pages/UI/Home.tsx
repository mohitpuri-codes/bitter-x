import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../config/axios.config';
import { apipaths } from '../../config/apiPaths';
import Loader from '../../Components/Loader/Loader';
import type { AxiosResponse } from 'axios';
import type { GetAllPosts } from '../../types/PostTypes';
import { Empty } from 'antd';
import Fallback from '../../Components/Fallback /Fallback';
import styles from './home.module.css';
import { QueryKey } from '../../Constants/queryKeys.constants';
import PostList from '../../Components/Post/PostList';

export default function Home() {
  const { data, isLoading, isError } = useQuery<AxiosResponse<GetAllPosts>>({
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
  console.log(data);

  return (
    <>
      {(totalPostsLength ?? 0) > 0 ? (
        <div className={styles.feedContainer}>
          {posts?.map((postItem) => (
            <PostList postItem={postItem} />
          ))}
        </div>
      ) : (
        <Empty description="No posts to display" />
      )}
    </>
  );
}
