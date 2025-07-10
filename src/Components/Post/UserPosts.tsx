import Loader from '../Loader/Loader';
import PostCard from './PostCard';
import styles from '../../Pages/UserPages/profile.module.css';
import type { PostData } from '../../types/PostTypes';
import List from 'antd/es/list';

interface UserPostsProps {
  isPostsLoading: boolean;
  posts: PostData[] | undefined;
}

export default function UserPosts({ isPostsLoading, posts }: UserPostsProps) {
  return (
    <>
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
    </>
  );
}
