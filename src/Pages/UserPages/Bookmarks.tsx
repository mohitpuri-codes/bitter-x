import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import Empty from 'antd/es/empty';
import Loader from '../../Components/Loader/Loader';
import Fallback from '../../Components/Fallback /Fallback';
import PostCard from '../../Components/Post/PostCard';
import { axiosInstance } from '../../config/axios.config';
import { apipaths } from '../../config/apiPaths';
import styles from '../UI/home.module.css';
import bookmarkStyles from './bookmark.module.css';
import { QueryKey } from '../../Constants/queryKeys.constants';
import type { GetBookmarkedPosts } from '../../types/PostTypes';
import type { APIResponse } from '../../types/AuthTypes';

export default function Bookmarks() {
  const { data, isLoading, isError } = useQuery<
    AxiosResponse<APIResponse<GetBookmarkedPosts>>
  >({
    queryKey: [QueryKey.bookmarkedPosts],
    queryFn: () => axiosInstance.get(apipaths.user.getMyBookmarks()),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data?.data.success) {
    return <Fallback />;
  }

  const bookmarkedPosts = data?.data?.data?.bookmarkedPosts;
  const totalBookmarkedPostsLength = bookmarkedPosts?.length;

  return (
    <>
      {(totalBookmarkedPostsLength ?? 0) > 0 ? (
        <div className={styles.feedContainer}>
          <div className={bookmarkStyles.headerContainer}>
            <h2 className={bookmarkStyles.mainHeading}>Bookmarks</h2>
            <p className={bookmarkStyles.subtitle}>
              {data?.data?.data?.totalBookmarkedPosts} saved posts
            </p>
          </div>
          {bookmarkedPosts?.map((postItem) => (
            <PostCard key={postItem._id} postItem={postItem} />
          ))}
        </div>
      ) : (
        <div className={styles.feedContainer}>
          <div className={bookmarkStyles.headerContainer}>
            <h2 className={bookmarkStyles.mainHeading}>Bookmarks</h2>
          </div>
          <Empty
            description="No bookmarked posts yet"
            className={bookmarkStyles.emptyState}
          />
        </div>
      )}
    </>
  );
}
