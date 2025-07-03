import type { PostData } from '../../types/PostTypes';
import Image from 'antd/es/image';
import styles from '../../Pages/UI/home.module.css';

interface PostImagesProps {
  postItem: PostData;
}

export default function PostImages({ postItem }: PostImagesProps) {
  return (
    <>
      {postItem.images.length > 0 && (
        <div className={styles.imageContainer}>
          {postItem.images.map((imageItem, index) => (
            <Image
              key={index}
              src={imageItem.url}
              alt={`post image ${index}`}
              className={styles.postImage}
            />
          ))}
        </div>
      )}
    </>
  );
}
