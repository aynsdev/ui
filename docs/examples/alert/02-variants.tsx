import { CircleAlertIcon, CircleCheckIcon, TriangleAlertIcon } from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function AlertVariants() {
  return (
    <div className="grid w-full max-w-lg gap-3">
      <Alert variant="success">
        <CircleCheckIcon />
        <AlertTitle>Domain verified</AlertTitle>
        <AlertDescription>Emails now send from acme.com.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>Card expires soon</AlertTitle>
        <AlertDescription>Update it before 30 November to avoid a failed renewal.</AlertDescription>
        <AlertAction>
          <Button size="xs" variant="outline">Update</Button>
        </AlertAction>
      </Alert>
      <Alert variant="destructive">
        <CircleAlertIcon />
        <AlertTitle>Payout failed</AlertTitle>
        <AlertDescription>The bank rejected the account number. Check it and retry.</AlertDescription>
      </Alert>
    </div>
  )
}
