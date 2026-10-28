import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function DialogDestructive() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive-soft">Delete project</Button>
      </DialogTrigger>
      <DialogContent size="sm" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete “Website”?</DialogTitle>
          <DialogDescription>This removes 24 pages and their history. It cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Keep project</Button>
          </DialogClose>
          <Button variant="destructive">Delete project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
