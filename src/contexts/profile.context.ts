import { createContext } from 'react';
import type { LoginResponse } from '../types/AuthTypes';

type ProfileContextType = {
  profile: LoginResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

export const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  isLoading: true,
  isAuthenticated: false,
});
