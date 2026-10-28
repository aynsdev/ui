import { CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Copy link">
          <CopyIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Copy link <Kbd>⌘C</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}
