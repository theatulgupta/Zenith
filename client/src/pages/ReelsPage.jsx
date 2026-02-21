import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { reelApi } from "../api/reels";
import { queryKeys } from "../api/queryKeys";
import ReelCard from "../components/reels/ReelCard";
import CreateReelModal from "../components/reels/CreateReelModal";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

export default function ReelsPage() {
  const [openCreate, setOpenCreate] = useState(false);
  const {
    data: reels = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: queryKeys.reels.all,
    queryFn: reelApi.getAllReels,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Reels</h1>
          <p className="text-sm text-text-muted">Watch and create reels.</p>
        </div>
        <Button size="sm" onClick={() => setOpenCreate(true)}>
          New Reel
        </Button>
      </div>

      {isLoading && <div className="h-32 rounded-2xl skeleton" />}

      {!isLoading && (isError || reels.length === 0) && (
        <EmptyState
          title="No reels yet"
          description="Create your first reel to get started."
        />
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {reels.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
        ))}
      </div>

      <CreateReelModal open={openCreate} onClose={() => setOpenCreate(false)} />
    </div>
  );
}
