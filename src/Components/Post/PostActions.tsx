import Space from 'antd/es/space';
import { MessageOutlined, HeartOutlined } from '@ant-design/icons';
import type { PostData } from '../../types/PostTypes';
import styles from '../../Pages/UI/home.module.css';

interface PostActionsProps {
  postItem: PostData;
}

export default function PostActions({ postItem }: PostActionsProps) {
  return (
    <Space size="large" className={styles.actions}>
      <button>
        <HeartOutlined /> {postItem.likes}
      </button>
      <button>
        <MessageOutlined /> {postItem.comments}
      </button>
    </Space>
  );
}
