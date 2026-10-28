import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-sm text-muted-foreground">Usage and billing at a glance.</TabsContent>
      <TabsContent value="activity" className="text-sm text-muted-foreground">Who changed what, and when.</TabsContent>
      <TabsContent value="settings" className="text-sm text-muted-foreground">Name, members and integrations.</TabsContent>
    </Tabs>
  )
}
