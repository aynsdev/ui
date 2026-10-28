import { MoreHorizontalIcon, PencilIcon, StarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ButtonIcon() {
  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" aria-label="Edit">
        <PencilIcon />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Starred" aria-pressed="true">
        <StarIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="More actions">
        <MoreHorizontalIcon />
      </Button>
    </div>
  )
}
