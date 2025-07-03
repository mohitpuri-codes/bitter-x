import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../config/axios.config';
import { apipaths } from '../../config/apiPaths';
import Loader from '../../Components/Loader/Loader';
import type { AxiosResponse } from 'axios';
import type { GetAllPosts } from '../../types/PostTypes';
import { Card, Row, Col, Avatar, Empty } from 'antd';
import Fallback from '../../Components/Fallback /Fallback';
import styles from './home.module.css';
import PostHeader from '../../Components/Post/PostHeader';
import PostImages from '../../Components/Post/PostImages';
import PostTags from '../../Components/Post/PostTags';
import PostActions from '../../Components/Post/PostActions';
import PostContent from '../../Components/Post/PostContent';
import { QueryKey } from '../../Constants/queryKeys.constants';

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
            <Card key={postItem._id} className={styles.postCard}>
              <Row align="top" gutter={[12, 0]}>
                <Col flex="40px">
                  <Avatar size={40} src={postItem.author?.account.avatar.url} />
                </Col>
                <Col flex="auto">
                  <PostHeader postItem={postItem} />
                  <PostContent postItem={postItem} />
                  <PostImages postItem={postItem} />
                  <PostTags postItem={postItem} />
                  <PostActions postItem={postItem} />
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      ) : (
        <Empty description="No posts to display" />
      )}
    </>
  );
}
