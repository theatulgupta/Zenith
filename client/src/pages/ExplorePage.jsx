import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/users";
import { queryKeys } from "../api/queryKeys";
import UserCard from "../components/users/UserCard";
import EmptyState from "../components/ui/EmptyState";

export default function ExplorePage() {
  const [params] = useSearchParams();
  const query = params.get("query") || "";

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: query ? queryKeys.users.search(query) : queryKeys.users.all,
    queryFn: () => (query ? userApi.searchUsers(query) : userApi.getAllUsers()),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Explore</h1>
        <p className="text-sm text-text-muted">
          Discover people and start following.
        </p>
      </div>

      {isLoading && <div className="h-20 rounded-2xl skeleton" />}

      {!isLoading && (isError || users.length === 0) && (
        <EmptyState
          title="No users found"
          description="Try searching for another name."
        />
      )}

      <div className="space-y-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
