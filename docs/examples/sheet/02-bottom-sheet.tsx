import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetFooter } from "@/components/ui/sheet"
export default function BottomSheet() {
  return <Sheet><SheetTrigger asChild><Button variant="secondary">Project details</Button></SheetTrigger><SheetContent side="bottom"><SheetHeader><SheetTitle>Design system</SheetTitle><SheetDescription>Shared components and foundations for product teams.</SheetDescription></SheetHeader><SheetFooter><SheetClose asChild><Button>Done</Button></SheetClose></SheetFooter></SheetContent></Sheet>
}
