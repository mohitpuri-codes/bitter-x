import { Space } from 'antd';
import { MessageOutlined, HeartOutlined } from '@ant-design/icons';
import type { PostData } from '../../types/PostTypes';
import styles from '../../Pages/UI/home.module.css';

export default function PostActions({ postItem }: { postItem: PostData }) {
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
