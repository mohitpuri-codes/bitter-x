import Typography from 'antd/es/typography';
import styles from '../../Pages/UI/home.module.css';
import type { PostData } from '../../types/PostTypes';

const { Text } = Typography;

export default function PostHeader({ postItem }: { postItem: PostData }) {
  return (
    <div className={styles.userInfo}>
      <Text strong>
        {postItem.author?.firstName} {postItem.author?.lastName}
      </Text>
      <Text type="secondary" className={styles.username}>
        @{postItem.author?.account.username}
      </Text>
    </div>
  );
}
