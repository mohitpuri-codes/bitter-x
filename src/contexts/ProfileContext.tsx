import { type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { LoginResponse } from '../types/AuthTypes';
import { axiosInstance } from '../config/axios.config';
import { apipaths } from '../config/apiPaths';
import { ProfileContext } from './profile.context';

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useQuery<LoginResponse>({
    queryKey: ['profile'],
    queryFn: () => axiosInstance.get(apipaths.user.profile()),
  });

  const isAuthenticated = !!data && !isError;

  return (
    <ProfileContext.Provider
      value={{ profile: data ?? null, isLoading, isAuthenticated }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
