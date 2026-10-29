import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"

export default function Demo() {
  return <Popover><PopoverTrigger asChild><Button variant="secondary">Display options</Button></PopoverTrigger><PopoverContent aria-label="Display options" className="grid gap-4">
    <p className="text-base font-semibold">Display options</p>
    <label className="flex items-center gap-2"><Checkbox defaultChecked />Show archived projects</label>
    <PopoverClose asChild><Button size="sm" className="justify-self-end">Done</Button></PopoverClose>
  </PopoverContent></Popover>
}
