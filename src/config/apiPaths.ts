/**
 * @description this object maitains all of our api end points
 */
export const apipaths = {
  auth: {
    login: () => `users/login`,
    signup: () => `users/register`,
    logout: () => 'users/logout',
  },
  user: {
    profile: () => 'social-media/profile',
    getMyPosts: (username: string) =>
      `social-media/posts/get/u/${username}?page=1`,
    getMyBookmarks: () => `social-media/bookmarks?page=1&limit=5`,
  },
  posts: {
    getAllPosts: () => 'social-media/posts?page=1&limit=10',
    createPost: () => 'social-media/posts',
    getPostByID: (id: string) => `social-media/posts/${id}`,
  },
  postActions: {
    likeOrUnlike: (id: string) => `social-media/like/post/${id}`,
    getAllComments: (id: string) =>
      `social-media/comments/post/${id}?page=1&limit=5`,
    addComment: (id: string) => `social-media/comments/post/${id}`,
    addOrRemoveBookMarks: (id: string) => `social-media/bookmarks/${id}`,
  },
};
