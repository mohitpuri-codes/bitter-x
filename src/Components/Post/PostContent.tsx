import styles from '../../Pages/UI/home.module.css';
import type { PostData } from '../../types/PostTypes';

interface PostContentProps {
  postItem: PostData;
}

export default function PostContent({ postItem }: PostContentProps) {
  return <div className={styles.postContent}>{postItem.content}</div>;
}
