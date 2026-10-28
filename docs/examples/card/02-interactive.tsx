import { ArrowUpRightIcon } from "lucide-react"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CardInteractive() {
  return (
    <Card interactive asChild className="w-full max-w-sm">
      <a href="#card">
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5">
            Read the changelog
            <ArrowUpRightIcon className="size-3.5 text-muted-foreground" />
          </CardTitle>
          <CardDescription>Everything that shipped this month.</CardDescription>
        </CardHeader>
      </a>
    </Card>
  )
}
