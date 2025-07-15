import Space from 'antd/es/space';
import { MessageOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import type {
  BookmarkedPostResponse,
  LikedPostResponse,
  PostData,
} from '../../types/PostTypes';
import styles from '../../Pages/UI/home.module.css';
import bookmark from '../../assets/bookmark.svg';
import notBookmarked from '../../assets/notBookmarked.svg';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../config/axios.config';
import { apipaths } from '../../config/apiPaths';
import { useState, useEffect } from 'react';
import type { AxiosError, AxiosResponse } from 'axios';
import type { APIResponse } from '../../types/AuthTypes';
import { QueryKey } from '../../Constants/queryKeys.constants';

interface PostActionsProps {
  postItem: PostData;
}

interface PostID {
  postId: string;
}

export default function PostActions({ postItem }: PostActionsProps) {
  const [liked, setLiked] = useState(postItem.isLiked);
  const [bookmarked, setBookmarked] = useState(postItem.isBookmarked);
  const [likes, setLikes] = useState(postItem.likes);

  const { data: singlePostFetchedData } = useQuery<
    AxiosResponse<APIResponse<PostData>>
  >({
    queryKey: [QueryKey.getSinglePost, postItem._id, liked],
    queryFn: () => axiosInstance.get(apipaths.posts.getPostByID(postItem._id)),
  });

  // Update likes count when query data changes
  useEffect(() => {
    if (singlePostFetchedData?.data.data.likes !== undefined) {
      setLikes(singlePostFetchedData.data.data.likes);
    }
  }, [singlePostFetchedData]);

  const { mutate: bookmarkMutation } = useMutation<
    AxiosResponse<APIResponse<BookmarkedPostResponse>>,
    AxiosError<Error>,
    PostID
  >({
    mutationFn: ({ postId }) =>
      axiosInstance.post(apipaths.postActions.addOrRemoveBookMarks(postId)),
    onSuccess: (data) => {
      if (data.data.data.isBookmarked) {
        setBookmarked(true);

        return;
      } else {
        setBookmarked(false);
      }
    },
  });

  const { mutate: likeMutation } = useMutation<
    AxiosResponse<APIResponse<LikedPostResponse>>,
    AxiosError<Error>,
    PostID
  >({
    mutationFn: ({ postId }) =>
      axiosInstance.post(apipaths.postActions.likeOrUnlike(postId)),
    onSuccess: (data) => {
      if (data.data.data.isLiked) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    },
  });

  function handleBookmarkClick() {
    bookmarkMutation({ postId: postItem._id });
  }

  function handleLikeClick() {
    likeMutation({ postId: postItem._id });
  }

  return (
    <Space size="large" className={styles.actions}>
      <div>
        <button
          onClick={handleLikeClick}
          className={`${styles.likeButton} ${liked ? styles.liked : ''}`}
        >
          {liked ? (
            <HeartFilled className={styles.actionButtons} />
          ) : (
            <HeartOutlined className={styles.actionButtons} />
          )}{' '}
          {likes}
        </button>

        <button>
          <MessageOutlined className={styles.actionButtons} />{' '}
          {postItem.comments}
        </button>
      </div>

      <button onClick={handleBookmarkClick}>
        <img
          src={bookmarked ? bookmark : notBookmarked}
          alt="add or remove bookmark"
        />
      </button>
    </Space>
  );
}
