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
};
