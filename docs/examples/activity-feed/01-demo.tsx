import { CheckIcon, FileTextIcon, MessageSquareIcon } from "lucide-react"
import { ActivityFeed, ActivityFeedItem, ActivityFeedIndicator, ActivityFeedContent, ActivityFeedTime } from "@/components/ui/activity-feed"
const events = [
  { id: "1", icon: CheckIcon, text: "Alex approved the component review.", date: "2026-10-28T09:30:00Z", time: "Oct 28 at 9:30 AM UTC" },
  { id: "2", icon: MessageSquareIcon, text: "Morgan left feedback on the input states.", date: "2026-10-28T08:15:00Z", time: "Oct 28 at 8:15 AM UTC" },
  { id: "3", icon: FileTextIcon, text: "Alex updated the typography guidelines.", date: "2026-10-27T16:00:00Z", time: "Oct 27 at 4:00 PM UTC" },
]
export default function Demo() {
  return <ActivityFeed aria-label="Sample project activity" className="w-full max-w-md">{events.map(event => <ActivityFeedItem key={event.id}><ActivityFeedIndicator><event.icon /></ActivityFeedIndicator><ActivityFeedContent><p>{event.text}</p><ActivityFeedTime dateTime={event.date}>{event.time}</ActivityFeedTime></ActivityFeedContent></ActivityFeedItem>)}</ActivityFeed>
}
