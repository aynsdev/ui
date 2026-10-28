import { FolderIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

export default function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>Projects group pages, assets and people. Create one to get started.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <PlusIcon />
          New project
        </Button>
      </EmptyContent>
    </Empty>
  )
}
