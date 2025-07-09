/**
 * @description this object maitains all of our api end points
 */
export const apipaths = {
  auth: {
    login: () => `users/login`,
    signup: () => `users/register`,
  },
  user: {
    profile: () => 'social-media/profile',
    getMyPosts: (username: string) =>
      `social-media/posts/get/u/${username}?page=1`,
  },
  posts: {
    getAllPosts: () => 'social-media/posts?page=1&limit=10',
    createPost: () => 'social-media/posts',
  },
};
