import { useQuery } from "@tanstack/react-query";
import { storyApi } from "../../api/stories";
import { queryKeys } from "../../api/queryKeys";
import Avatar from "../ui/Avatar";

export default function StoryBar() {
  const { data: stories = [] } = useQuery({
    queryKey: queryKeys.stories.mine,
    queryFn: storyApi.getMyStories,
  });

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center gap-2">
          <div className="story-ring">
            <Avatar
              name={story?.user?.fullName}
              size="lg"
              className="bg-dark"
            />
          </div>
          <span className="text-xs text-text-muted">
            {story?.user?.fullName || "Story"}
          </span>
        </div>
      ))}
      {!stories.length && (
        <div className="text-sm text-text-muted">No stories yet</div>
      )}
    </div>
  );
}
