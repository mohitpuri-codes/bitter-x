import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { AxiosResponse, AxiosError } from 'axios';
import { apipaths } from '../../config/apiPaths';
import { axiosInstance } from '../../config/axios.config';
import { QueryKey } from '../../Constants/queryKeys.constants';
import styles from '../../Components/Sidebar/sidebar.module.css';
import Button from 'antd/es/button';
import type { APIResponse, LoggedinUserReponse } from '../../types/AuthTypes';
import type { CreatePostData } from '../../types/CreatePostFormTypes';
import useNotification from 'antd/es/notification/useNotification';
import { SUCCESS_MESSAGES } from '../../Constants/success.constants';

export default function SeedPosts() {
  const queryClient = useQueryClient();
  const [api, contextHolder] = useNotification();

  const { mutateAsync: seedPostMutation } = useMutation<
    AxiosResponse<APIResponse<LoggedinUserReponse>>,
    AxiosError<Error>,
    CreatePostData
  >({
    mutationFn: (data) => {
      const formData = new FormData();
      formData.append('content', data.content);

      return axiosInstance.post(apipaths.posts.createPost(), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onError: (error) => {
      api.error({
        message: error.response?.data.message,
        placement: 'topRight',
      });
    },
  });

  /**
   * @description method to create dummy data for seeded posts and add them to DB
   */
  async function handleSeedPostClick() {
    const postData: CreatePostData[] = Array.from({ length: 5 }).map(
      (_, i) => ({
        content: `Seed post #${i + 1}`,
        images: [],
        tags: [],
      })
    );

    try {
      for (const data of postData) {
        await seedPostMutation(data);
      }

      api.success({
        message: SUCCESS_MESSAGES.POST_CREATION,
        placement: 'topRight',
      });
      queryClient.invalidateQueries({ queryKey: [QueryKey.allPosts] });
      queryClient.invalidateQueries({ queryKey: [QueryKey.profile] });
      queryClient.invalidateQueries({ queryKey: [QueryKey.getMyPosts] });
    } catch (error) {
      console.error('Error seeding posts:', error);
    }
  }
  return (
    <>
      {contextHolder}
      <div className={styles.tweetButtonWrapper}>
        <Button onClick={handleSeedPostClick}>Seed Posts</Button>
      </div>
    </>
  );
}
