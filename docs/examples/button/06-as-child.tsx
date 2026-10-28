import { Button } from "@/components/ui/button"

export default function ButtonAsChild() {
  return (
    <Button variant="outline" asChild>
      <a href="#pricing">See pricing</a>
    </Button>
  )
}
