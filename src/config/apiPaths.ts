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
  },
  posts: {
    getAllPosts: () => 'social-media/posts?page=1&limit=10',
    createPost: () => 'social-media/posts',
  },
};
