import { ChevronDownIcon, CopyIcon, FileTextIcon, SparklesIcon, TerminalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { copy } from "../lib/clipboard"

/** Copy a page as Markdown, or as a ready-to-paste prompt for Claude or Codex. */
export function CopyMenu({
  markdown,
  prompt,
  label = "Copy page",
}: {
  markdown: () => string
  prompt: (agent: "Claude" | "Codex") => string
  label?: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <CopyIcon />
          {label}
          <ChevronDownIcon className="-mr-1 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem onSelect={() => copy(markdown(), "Copied as Markdown")}>
          <FileTextIcon />
          Copy as Markdown
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Prompt for an agent</DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => copy(prompt("Claude"), "Copied prompt for Claude")}>
          <SparklesIcon />
          Copy for Claude
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => copy(prompt("Codex"), "Copied prompt for Codex")}>
          <TerminalIcon />
          Copy for Codex
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
