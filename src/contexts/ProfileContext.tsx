import { type ReactNode, useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { APIResponse, LoggedinUserReponse } from '../types/AuthTypes';
import { axiosInstance } from '../config/axios.config';
import { apipaths } from '../config/apiPaths';
import { ProfileContext } from './profile.context';
import { QueryKey } from '../Constants/queryKeys.constants';

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  const { data, isLoading, isError } = useQuery<
    APIResponse<LoggedinUserReponse>
  >({
    queryKey: [QueryKey.profile],
    queryFn: () => axiosInstance.get(apipaths.user.profile()),
    enabled,
  });

  const refetchProfile = useCallback(() => {
    console.log('refetch');
    setEnabled(true);
  }, []);

  const memoized = useMemo(() => {
    const isAuthenticated = !!data?.data && !isError;
    return {
      profile: data ?? null,
      isLoading,
      isAuthenticated,
      refetchProfile,
      enabled,
    };
  }, [data, isError, isLoading, refetchProfile, enabled]);

  return (
    <ProfileContext.Provider value={memoized}>
      {children}
    </ProfileContext.Provider>
  );
}
