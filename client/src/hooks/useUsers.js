import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/users";
import { useAuthStore } from "../store/authStore";
import { queryKeys } from "../api/queryKeys";

export const userKeys = queryKeys.users;

export function useProfile() {
  const token = useAuthStore((s) => s.token);
  const setUser = useAuthStore((s) => s.setUser);

  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: async () => {
      const user = await userApi.getProfile();
      setUser(user);
      return user;
    },
    enabled: !!token,
  });
}

export function useUser(id) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userApi.getUserById(id),
    enabled: !!id,
  });
}

export function useSearchUsers(query) {
  return useQuery({
    queryKey: userKeys.search(query),
    queryFn: () => userApi.searchUsers(query),
    enabled: query?.length >= 2,
    retry: false,
  });
}

export function useAllUsers() {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: userApi.getAllUsers,
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: userApi.updateUser,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: userKeys.profile() });
    },
  });
}

export function useToggleFollow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, follow }) => userApi.toggleFollow(userId, follow),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: userKeys.all });
      qc.invalidateQueries({ queryKey: userKeys.profile() });
    },
  });
}
