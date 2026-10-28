import { InfoIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertDemo() {
  return (
    <Alert className="max-w-lg">
      <InfoIcon />
      <AlertTitle>Scheduled maintenance</AlertTitle>
      <AlertDescription>Payments will be read-only on Sunday from 02:00 to 03:00.</AlertDescription>
    </Alert>
  )
}
