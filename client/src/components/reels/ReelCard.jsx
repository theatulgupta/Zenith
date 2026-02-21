import Card from "../ui/Card";
import Avatar from "../ui/Avatar";

export default function ReelCard({ reel }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-center gap-3">
        <Avatar name={reel?.user?.fullName} size="sm" />
        <div>
          <p className="text-sm font-semibold">{reel?.user?.fullName}</p>
          <p className="text-xs text-text-muted">{reel?.title}</p>
        </div>
      </div>
      {reel?.video && (
        <video
          src={reel.video}
          controls
          className="w-full rounded-xl border border-border"
        />
      )}
    </Card>
  );
}
