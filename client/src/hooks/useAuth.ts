import { trpc } from '@/lib/trpc';

export function useAuth() {
  const { data: user } = trpc.auth.me.useQuery();
  const logoutMutation = trpc.auth.logout.useMutation();

  const logout = async () => {
    await logoutMutation.mutateAsync();
    window.location.reload();
  };

  return {
    user,
    logout,
    isLoading: !user,
  };
}
