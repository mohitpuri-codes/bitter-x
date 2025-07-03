import { createContext, useContext } from 'react';
import type { APIResponse, LoggedinUserReponse } from '../types/AuthTypes';

type ProfileContextType = {
  profile: APIResponse<LoggedinUserReponse> | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

export const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  isLoading: true,
  isAuthenticated: false,
});

export const useProfile = () => useContext(ProfileContext);
