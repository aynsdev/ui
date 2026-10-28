import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export default function SonnerDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast.success("Changes saved")}>
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Project archived", {
            description: "It's hidden from the sidebar.",
            action: { label: "Undo", onClick: () => toast("Restored") },
          })
        }
      >
        With action
      </Button>
      <Button variant="outline" onClick={() => toast.error("Couldn't reach the server. Try again.")}>
        Error
      </Button>
    </div>
  )
}
