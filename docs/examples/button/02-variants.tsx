import { Button } from "@/components/ui/button"

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="brand">Brand</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="destructive-soft">Remove</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
