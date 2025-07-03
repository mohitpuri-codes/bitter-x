import type { PostData } from '../../types/PostTypes';
import styles from '../../Pages/UI/home.module.css';
import Typography from 'antd/es/typography';

const { Text } = Typography;

interface PostTagsProps {
  postItem: PostData;
}

export default function PostTags({ postItem }: PostTagsProps) {
  console.log(postItem.tags);

  return (
    <>
      {postItem.tags.length > 0 && (
        <div className={styles.tags}>
          {postItem.tags.map((tagItem) => (
            <Text key={tagItem} type="secondary" className={styles.tag}>
              {`#${tagItem}`}
            </Text>
          ))}
        </div>
      )}
    </>
  );
}
