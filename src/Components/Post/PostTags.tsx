import type { PostData } from '../../types/PostTypes';
import { Typography } from 'antd';
import styles from '../../Pages/UI/home.module.css';

const { Text } = Typography;

interface PostTagsProps {
  postItem: PostData;
}

export default function PostTags({ postItem }: PostTagsProps) {
  return (
    <>
      {postItem.tags.length > 0 && (
        <div className={styles.tags}>
          {postItem.tags.map((tagItem, index) => (
            <Text key={index} type="secondary" className={styles.tag}>
              #{tagItem}
            </Text>
          ))}
        </div>
      )}
    </>
  );
}
