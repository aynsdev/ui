import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Starter plan</CardTitle>
        <CardDescription>Renews on 1 December.</CardDescription>
        <CardAction>
          <Button variant="link" size="sm">Change</Button>
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        3 of 5 seats in use. Add seats any time; you only pay for the rest of the cycle.
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost" size="sm">View invoices</Button>
        <Button size="sm">Add seats</Button>
      </CardFooter>
    </Card>
  )
}
