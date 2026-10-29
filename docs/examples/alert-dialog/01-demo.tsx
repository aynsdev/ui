import * as React from "react"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"

export default function Demo() {
  const [archived, setArchived] = React.useState(false)
  return <div className="grid justify-items-center gap-4">
    <AlertDialog>
      <AlertDialogTrigger asChild><Button variant="destructive-soft" disabled={archived}>Archive sample project</Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader><AlertDialogTitle>Archive this project?</AlertDialogTitle><AlertDialogDescription>The sample project will leave your active list. You can restore it afterward.</AlertDialogDescription></AlertDialogHeader>
        <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => setArchived(true)}>Archive project</AlertDialogAction></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    {archived && <><p role="status" className="text-sm text-muted-foreground">Sample project archived.</p><Button variant="secondary" onClick={() => setArchived(false)}>Restore project</Button></>}
  </div>
}
