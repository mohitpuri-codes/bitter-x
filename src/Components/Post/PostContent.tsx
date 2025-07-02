import styles from '../../Pages/UI/home.module.css';
import type { PostData } from '../../types/PostTypes';

export default function PostContent({ postItem }: { postItem: PostData }) {
  return <div className={styles.postContent}>{postItem.content}</div>;
}
