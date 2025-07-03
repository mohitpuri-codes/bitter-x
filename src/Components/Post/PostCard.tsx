import type { PostData } from '../../types/PostTypes';
import styles from '../../Pages/UI/home.module.css';
import Card from 'antd/es/card/Card';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import PostActions from './PostActions';
import PostContent from './PostContent';
import PostHeader from './PostHeader';
import PostImages from './PostImages';
import PostTags from './PostTags';

interface PostListProps {
  postItem: PostData;
}

export default function PostCard({ postItem }: PostListProps) {
  return (
    <Card key={postItem._id} className={styles.postCard}>
      <Row align="top" gutter={[12, 0]}>
        <Col flex="auto">
          <PostHeader postItem={postItem} />
          <PostContent postItem={postItem} />
          <PostImages postItem={postItem} />
          <PostTags postItem={postItem} />
          <PostActions postItem={postItem} />
        </Col>
      </Row>
    </Card>
  );
}
