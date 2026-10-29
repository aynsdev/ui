import * as React from "react"

import registry from "../../registry.json"
import themeSource from "../../registry/theme.css?raw"

export type Prop = { name: string; type: string; default?: string; description: string }
export type ApiPart = { name: string; description?: string; props: Prop[] }

export type ComponentDoc = {
  id: string
  group: "Actions" | "Forms" | "Data display" | "Navigation" | "Overlays" | "Feedback" | "Utilities"
  /** Short import + JSX shown under Usage. */
  usage: string
  guidelines: string[]
  api?: ApiPart[]
  /** Upstream primitive whose remaining props are passed through. */
  primitive?: { name: string; href: string }
}

const radix = (part: string) => ({ name: `Radix ${part}`, href: `https://www.radix-ui.com/primitives/docs/components/${part.toLowerCase().replace(/ /g, "-")}` })
const asChild: Prop = { name: "asChild", type: "boolean", default: "false", description: "Render the child element instead, merging props (e.g. a link styled as this component)." }

export const docs: ComponentDoc[] = [
  {
    id: "popover", group: "Overlays",
    usage: `import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

<Popover>
  <PopoverTrigger asChild><Button>Options</Button></PopoverTrigger>
  <PopoverContent aria-label="Options">Contextual controls</PopoverContent>
</Popover>`,
    guidelines: ["Name the content with aria-label or aria-labelledby.", "Use for short contextual tasks. Move longer workflows into a Sheet or Dialog.", "Escape closes the popup and returns focus to its trigger."],
    primitive: radix("Popover"),
    api: [{ name: "PopoverContent", props: [{ name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "Alignment against the trigger." }, { name: "sideOffset", type: "number", default: "8", description: "Space between the trigger and popup." }] }],
  },
  {
    id: "alert-dialog", group: "Overlays",
    usage: `import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"

<AlertDialog>
  <AlertDialogTrigger>Archive project</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Archive this project?</AlertDialogTitle>
    <AlertDialogDescription>It will leave the active project list.</AlertDialogDescription>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={archiveProject}>Archive project</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    guidelines: ["Always include a title and description naming the object and consequence.", "Cancel receives initial focus. Clicking outside does not confirm or dismiss.", "For async actions, control open, preventDefault on the action click, disable actions while pending, show errors inline, and close only after success."],
    primitive: radix("Alert Dialog"),
  },
  {
    id: "sheet", group: "Overlays",
    usage: `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger>Edit project</SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Edit project</SheetTitle>
      <SheetDescription>Update project details.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
    guidelines: ["Always provide a title and description. Sheets trap focus and return it to the trigger.", "Use side=bottom for a short mobile task. Long forms should stay scrollable.", "Use controlled open state for save flows and close only after a successful save.", "Fixed edges account for device safe-area insets."],
    api: [{ name: "SheetContent", props: [{ name: "side", type: '"left" | "right" | "bottom"', default: '"right"', description: "Edge of the viewport to attach to." }] }],
    primitive: radix("Dialog"),
  },
  {
    id: "combobox", group: "Forms",
    usage: `import { Combobox } from "@/components/ui/combobox"

<Combobox label="Project" options={[
  { id: "design", label: "Design system" },
  { id: "web", label: "Website" },
]} />`,
    guidelines: ["Use NativeSelect for short lists that do not need search.", "Uses React Aria throughout the input and popup; do not wrap its internals with another focus primitive.", "Supply stable option IDs. Use selectedKey/onSelectionChange for controlled selection.", "isDisabled, isRequired, isInvalid, description and errorMessage support form states. Use I18nProvider from react-aria-components for locale overrides."],
    api: [{ name: "Combobox", props: [
      { name: "options", type: "ComboboxOption[]", description: "Required items: id, label, and optional disabled." },
      { name: "label", type: "string", description: "Required visible label, associated with the input." },
      { name: "selectedKey / onSelectionChange", type: "Key | null / (key) => void", description: "Controlled single selection." },
      { name: "description / errorMessage", type: "string", description: "Associated helper and validation text." },
      { name: "emptyMessage", type: "string", description: "Message shown when no options match." },
    ] }],
  },
  {
    id: "date-picker", group: "Forms",
    usage: `import { parseDate } from "@internationalized/date"
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker"

<DatePicker label="Due date" defaultValue={parseDate("2026-10-28")} />
<DateRangePicker label="Reporting period" />`,
    guidelines: ["Use DatePicker for a single value and DateRangePicker for a start/end pair.", "Values use @internationalized/date, not JavaScript Date, to avoid timezone shifts for calendar dates.", "React Aria handles date segments, calendar keyboard navigation and range validation. Its popup uses the same primitive system.", "Use minValue, maxValue and isDateUnavailable for date constraints. Use I18nProvider for locale overrides.", "isDisabled, isReadOnly, isRequired, isInvalid and errorMessage are supported. The visible label is required."],
    api: [{ name: "DatePicker / DateRangePicker", props: [
      { name: "label", type: "string", description: "Required visible field label." },
      { name: "value / defaultValue", type: "DateValue | { start: DateValue; end: DateValue }", description: "Single date or date range, depending on the component." },
      { name: "onChange", type: "(value) => void", description: "Receives the selected date or range." },
      { name: "minValue / maxValue", type: "DateValue", description: "Inclusive selectable bounds." },
      { name: "description / errorMessage", type: "string", description: "Associated helper and validation messages." },
    ] }],
  },
  {
    id: "input-group", group: "Forms",
    usage: `import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

<label htmlFor="budget">Budget in USD</label>
<InputGroup>
  <InputGroupAddon aria-hidden="true">$</InputGroupAddon>
  <InputGroupInput id="budget" type="number" min={0} />
</InputGroup>`,
    guidelines: ["Use a visible label outside the group. A prefix is not a label.", "Keep decoration in InputGroupAddon and interactive actions in InputGroupButton.", "Icon-only actions need aria-label. Units not present in the label should be linked with aria-describedby.", "Use useField to associate descriptions and errors without dangling IDs."],
    api: [{ name: "InputGroup / InputGroupAddon / InputGroupInput / InputGroupButton", props: [] }],
  },
  {
    id: "activity-feed", group: "Data display",
    usage: `import { ActivityFeed, ActivityFeedItem, ActivityFeedContent, ActivityFeedTime } from "@/components/ui/activity-feed"

<ActivityFeed aria-label="Project activity">
  <ActivityFeedItem>
    <ActivityFeedContent>
      <p>Alex approved the component review.</p>
      <ActivityFeedTime dateTime="2026-10-28T09:30:00Z">Oct 28, 9:30 AM UTC</ActivityFeedTime>
    </ActivityFeedContent>
  </ActivityFeedItem>
</ActivityFeed>`,
    guidelines: ["Use a named ordered list with a consistent chronological direction.", "Provide an ISO dateTime value and a readable timestamp with timezone context.", "Indicators are decorative; communicate the event in text.", "Compose with Skeleton and Empty for loading and first-use states."],
    api: [{ name: "ActivityFeed / ActivityFeedItem / ActivityFeedIndicator / ActivityFeedContent / ActivityFeedTime", props: [] }],
  },
  {
    id: "data-table", group: "Data display",
    usage: `import { DataTable } from "@/components/ui/data-table"

<DataTable
  label="Projects"
  data={[{ id: "design", name: "Design system" }]}
  columns={[{ id: "name", header: "Project", cell: row => row.name, sortValue: row => row.name }]}
  getRowId={row => row.id}
  getRowLabel={row => row.name}
  searchText={row => row.name}
  selectable
/>`,
    guidelines: ["This is a client-side pattern for modest datasets. For server pagination or virtualization, compose the Table primitives in your application.", "Row IDs must be unique and stable. Selection persists across pages and filters; the header checkbox affects only the current page.", "Numeric sorting uses numbers, not formatted strings. Provide sortValue separately from the rendered cell.", "Loading and errors replace stale rows. Supply onRetry for recoverable errors and emptyAction for first-use states.", "Use onSelectionChange for non-destructive bulk actions. Any destructive action needs an AlertDialog."],
    api: [{ name: "DataTable", props: [
      { name: "data / columns", type: "T[] / DataTableColumn<T>[]", description: "Rows and columns with id, header, cell, optional sortValue and numeric." },
      { name: "getRowId / getRowLabel", type: "(row: T) => string", description: "Stable identity and readable selection label." },
      { name: "label", type: "string", description: "Accessible table name." },
      { name: "searchText", type: "(row: T) => string", description: "Enables search over returned text." },
      { name: "filters", type: "{ value, label, matches }[]", description: "Optional preset filters; values must be unique and nonempty." },
      { name: "pageSize", type: "number", default: "10", description: "Rows displayed per page." },
      { name: "selectable / onSelectionChange", type: "boolean / (ids: string[]) => void", description: "Enable selection and receive IDs after user changes." },
      { name: "loading / error / onRetry / emptyAction", type: "boolean / string / () => void / ReactNode", description: "Loading, recovery and first-use states." },
    ] }],
  },

  {
    id: "contribution-grid",
    group: "Data display",
    usage: `import { ContributionGrid } from "@/components/ui/contribution-grid"

<ContributionGrid
  year={2026}
  data={[{ date: "2026-01-05", count: 8 }]}
/>`,
    guidelines: [
      "A GitHub-style calendar using the system’s neutral foreground and surface tokens in both themes.",
      "Supply complete data for the selected calendar year. Missing dates represent zero; use endDate to distinguish future or unavailable dates. Fetch data outside this presentation component.",
      "Intensity defaults to the busiest day in the displayed year. Supply the same thresholds across calendars for consistent comparisons. Use the daily breakdown for exact values and comparisons between years.",
      "Dates are UTC calendar dates in YYYY-MM-DD format. Invalid counts and out-of-year dates are ignored; duplicate dates use the last valid count.",
      "The calendar scrolls within its container on small screens. View daily counts provides keyboard, touch and screen reader access to every value.",
      "An empty array renders a zero-activity year. Handle loading and fetch failures in the parent so they are not mistaken for zero activity.",
    ],
    api: [{ name: "ContributionGrid", props: [
      { name: "year", type: "number", description: "Required calendar year, an integer from 1000 to 9999." },
      { name: "data", type: "Contribution[]", description: "Required array of { date: string, count: number }. Counts must be nonnegative safe integers." },
      { name: "endDate", type: "string", description: "Last available YYYY-MM-DD date. Later dates use dashed outlines and are excluded from totals." },
      { name: "thresholds", type: "readonly [number, number, number]", description: "Increasing positive integer upper bounds for levels 1–3. Counts above the last bound use level 4." },
      { name: "locale", type: "string", default: '"en"', description: "Locale for date labels and numbers; surrounding interface copy is English." },
      { name: "label", type: "string", default: '"Contributions"' , description: "Visible caption and accessible calendar name." },
      { name: "className", type: "string", description: "Additional classes on the figure; standard figure props are also supported." },
    ] }],
  },
  {
    id: "button",
    group: "Actions",
    usage: `import { Button } from "@/components/ui/button"

<Button>Save changes</Button>`,
    guidelines: [
      "One default (filled) button per view. Everything else is outline, ghost or link.",
      "Label with a verb that says what happens: “Save changes”, not “OK”.",
      "Use loading instead of disabling while a request is in flight; it keeps the width and blocks repeat clicks.",
      "Icon-only buttons need aria-label. Ghost icon buttons are muted until hovered; toggle state with aria-pressed.",
      "brand is for a single marketing or onboarding call to action, not for app chrome.",
    ],
    api: [
      {
        name: "Button",
        props: [
          { name: "variant", type: '"default" | "outline" | "secondary" | "ghost" | "brand" | "destructive" | "destructive-soft" | "link"', default: '"default"', description: "Visual weight." },
          { name: "size", type: '"xs" | "sm" | "default" | "lg" | "xl" | "icon-xs" | "icon-sm" | "icon" | "icon-lg"', default: '"default"', description: "Height and padding. icon-* sizes are square with a 44px touch target on coarse pointers." },
          { name: "loading", type: "boolean", default: "false", description: "Shows a spinner over the label, keeps the width, sets aria-busy." },
          asChild,
        ],
      },
    ],
  },
  {
    id: "segmented-control",
    group: "Actions",
    usage: `import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"

<SegmentedControl aria-label="View" defaultValue="list">
  <SegmentedControlItem value="list">List</SegmentedControlItem>
  <SegmentedControlItem value="board">Board</SegmentedControlItem>
</SegmentedControl>`,
    guidelines: [
      "For 2–4 mutually exclusive modes of the same content (view, period, filter). Use Tabs when panels differ.",
      "Always has a selection: clicking the active item does nothing.",
      "Give the group an aria-label; icon-only items need their own aria-label.",
    ],
    api: [
      {
        name: "SegmentedControl",
        props: [
          { name: "value / defaultValue", type: "string", description: "Selected item (controlled / uncontrolled)." },
          { name: "onValueChange", type: "(value: string) => void", description: "Called with the new value. Never called with an empty string." },
          { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Item height." },
        ],
      },
    ],
    primitive: radix("Toggle Group"),
  },
  {
    id: "input",
    group: "Forms",
    usage: `import { Input } from "@/components/ui/input"

<Input type="email" placeholder="you@company.com" />`,
    guidelines: [
      "Pair with a visible label (use Field). Placeholders are examples, not labels.",
      "Mark errors with aria-invalid; the border turns destructive.",
      "Font size is 16px on touch devices so iOS does not zoom.",
    ],
  },
  {
    id: "textarea",
    group: "Forms",
    usage: `import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Add a note" />`,
    guidelines: ["Starts at 88px tall; users can resize it.", "Same states as Input: aria-invalid, disabled."],
  },
  {
    id: "native-select",
    group: "Forms",
    usage: `import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

<NativeSelect defaultValue="member">
  <NativeSelectOption value="admin">Admin</NativeSelectOption>
  <NativeSelectOption value="member">Member</NativeSelectOption>
</NativeSelect>`,
    guidelines: ["The default choice for selects: native keyboard, screen-reader and mobile behaviour for free.", "Reach for a custom listbox only when options need rich content or search."],
  },
  {
    id: "label",
    group: "Forms",
    usage: `import { Label } from "@/components/ui/label"

<Label htmlFor="email">Email</Label>`,
    guidelines: ["Usually used through FieldLabel.", "Dims automatically when the associated control (or its group) is disabled."],
    primitive: radix("Label"),
  },
  {
    id: "field",
    group: "Forms",
    usage: `import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

<Field>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" type="email" />
  <FieldDescription>We only use this for sign-in.</FieldDescription>
</Field>`,
    guidelines: [
      "useField({ description, error }) returns controlProps, labelProps, descriptionProps and errorProps. Spread them on the matching parts to wire IDs, aria-describedby and aria-invalid. The hook installs with Field.",
      "Label above the control, description below, error replaces nothing: it appears under the control.",
      "Errors say what to do: “Enter a full domain, like acme.com”, not “Invalid input”.",
      "Set aria-invalid on the control and point aria-describedby at the FieldError id.",
      "Use orientation=\"horizontal\" for checkboxes and switches with a label beside them.",
    ],
    api: [
      { name: "Field", props: [{ name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Stack label and control, or put the control first in a row." }] },
      { name: "FieldError", props: [{ name: "children", type: "ReactNode", description: "Rendered with role=\"alert\" and a leading icon. Renders nothing when empty." }] },
      { name: "FieldGroup / FieldSet / FieldLegend / FieldContent / FieldDescription", props: [] },
    ],
  },
  {
    id: "checkbox",
    group: "Forms",
    usage: `import { Checkbox } from "@/components/ui/checkbox"

<Checkbox id="terms" />`,
    guidelines: ["For independent on/off choices submitted with a form. Use Switch for settings that apply immediately.", "checked=\"indeterminate\" for a parent of partially selected children."],
    primitive: radix("Checkbox"),
  },
  {
    id: "radio-group",
    group: "Forms",
    usage: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup defaultValue="monthly">
  <RadioGroupItem value="monthly" id="monthly" />
</RadioGroup>`,
    guidelines: ["For one choice from 2–5 visible options. Longer lists: NativeSelect.", "Always preselect a sensible default."],
    primitive: radix("Radio Group"),
  },
  {
    id: "switch",
    group: "Forms",
    usage: `import { Switch } from "@/components/ui/switch"

<Switch id="autosave" />`,
    guidelines: ["Takes effect immediately; no Save button.", "Label states the setting, not the action: “Autosave drafts”, not “Turn on autosave”."],
    primitive: radix("Switch"),
  },
  {
    id: "card",
    group: "Data display",
    usage: `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Starter plan</CardTitle>
    <CardDescription>Renews on 1 December.</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
</Card>`,
    guidelines: [
      "A white (dark: raised grey) surface with 24px corners on the page background. No shadow; never nest cards.",
      "Use interactive + asChild with an <a> when the whole card is a link.",
      "CardAction sits top-right in the header for a single secondary action.",
    ],
    api: [
      {
        name: "Card",
        props: [{ name: "interactive", type: "boolean", default: "false", description: "Hover outline, focus ring and pointer cursor for clickable cards." }, asChild],
      },
      { name: "CardHeader / CardTitle / CardDescription / CardAction / CardContent / CardFooter", props: [] },
    ],
  },
  {
    id: "accordion",
    group: "Data display",
    usage: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="why">
    <AccordionTrigger>Why this?</AccordionTrigger>
    <AccordionContent>…</AccordionContent>
  </AccordionItem>
</Accordion>`,
    guidelines: [
      "For secondary detail people may want: reasons, risks, FAQs. Never hide the main answer inside one.",
      "Phrase triggers as the question the reader has (“Why this?”, “What happens next?”).",
      "Each item is its own filled surface; don't wrap the accordion in a Card.",
      "Use type=\"multiple\" when items are independent; type=\"single\" collapsible when one at a time keeps the page calm.",
    ],
    api: [
      {
        name: "Accordion",
        props: [
          { name: "type", type: '"single" | "multiple"', description: "One open item at a time, or any number." },
          { name: "collapsible", type: "boolean", default: "false", description: "With type=\"single\", allow closing the open item." },
          { name: "value / defaultValue", type: "string | string[]", description: "Open item(s), controlled or uncontrolled." },
        ],
      },
      { name: "AccordionItem / AccordionTrigger / AccordionContent", props: [] },
    ],
    primitive: radix("Accordion"),
  },
  {
    id: "stat",
    group: "Data display",
    usage: `import { Stat, StatDelta, StatLabel, StatValue } from "@/components/ui/stat"

<Stat>
  <StatLabel>Revenue</StatLabel>
  <StatValue>₱482,900</StatValue>
  <StatDelta trend="up" sentiment="positive">+12.4%</StatDelta>
</Stat>`,
    guidelines: ["Values use tabular numerals so columns line up.", "Write the sign or direction in the delta text; colour alone is not enough.", "Say what the delta compares against."],
    api: [{ name: "StatDelta", props: [{ name: "trend", type: '"neutral" | "up" | "down"', default: '"neutral"', description: "Direction metadata only; include direction in the visible label." }, { name: "sentiment", type: '"neutral" | "positive" | "negative"', default: '"neutral"', description: "Meaning of the change, independent of direction." }] }],
  },
  {
    id: "badge",
    group: "Data display",
    usage: `import { Badge } from "@/components/ui/badge"

<Badge variant="success" dot>Paid</Badge>`,
    guidelines: ["Status and metadata only; badges are not buttons.", "Pair status colour with text. dot adds a leading marker in the same colour.", "Keep labels to one or two words."],
    api: [
      {
        name: "Badge",
        props: [
          { name: "variant", type: '"default" | "outline" | "solid" | "success" | "warning" | "destructive" | "info" | "brand"', default: '"default"', description: "Tone." },
          { name: "size", type: '"default" | "sm"', default: '"default"', description: "sm for dense tables and nav." },
          { name: "dot", type: "boolean", default: "false", description: "Leading status dot." },
          asChild,
        ],
      },
    ],
  },
  {
    id: "alert",
    group: "Feedback",
    usage: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

<Alert variant="warning">
  <AlertTitle>Card expires soon</AlertTitle>
  <AlertDescription>Update it before 30 November.</AlertDescription>
</Alert>`,
    guidelines: ["Persistent, in-page messages about state. For transient feedback after an action, use a toast.", "Name what happened and the recovery step.", "A leading lucide icon picks up the variant colour automatically."],
    api: [
      { name: "Alert", props: [{ name: "variant", type: '"default" | "info" | "success" | "warning" | "destructive"', default: '"default"', description: "Tone." }] },
      { name: "AlertAction", props: [{ name: "children", type: "ReactNode", description: "Pinned to the top-right; usually one small button." }] },
    ],
  },
  {
    id: "avatar",
    group: "Data display",
    usage: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="/me.png" alt="Ada Lovelace" />
  <AvatarFallback>AL</AvatarFallback>
</Avatar>`,
    guidelines: ["Circle for people, square for workspaces, teams and apps.", "Fallback initials are one or two letters."],
    api: [
      {
        name: "Avatar",
        props: [
          { name: "size", type: '"sm" | "default" | "lg" | "xl"', default: '"default"', description: "32, 40, 48 or 64px." },
          { name: "shape", type: '"circle" | "square"', default: '"circle"', description: "Person or entity." },
        ],
      },
      { name: "AvatarGroup", props: [{ name: "children", type: "Avatar[]", description: "Overlapping stack with a ring in the page background." }] },
    ],
    primitive: radix("Avatar"),
  },
  {
    id: "tabs",
    group: "Navigation",
    usage: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
</Tabs>`,
    guidelines: ["Underline style, for switching between views of the same object.", "Use SegmentedControl for compact mode switches inside a toolbar."],
    primitive: radix("Tabs"),
  },
  {
    id: "nav",
    group: "Navigation",
    usage: `import { Nav, NavItem } from "@/components/ui/nav"

<Nav aria-label="Main">
  <NavItem href="/inbox" isActive>Inbox</NavItem>
</Nav>`,
    guidelines: [
      "The active item is shown through foreground and surface, not a bright pill.",
      "Wrap labels in <span> so long names truncate.",
      "Use asChild with your router's Link.",
    ],
    api: [
      { name: "NavItem", props: [{ name: "isActive", type: "boolean", default: "false", description: "Sets aria-current=\"page\" and the active style." }, asChild] },
      { name: "NavGroup / NavLabel / NavBadge", props: [] },
    ],
  },
  {
    id: "breadcrumb",
    group: "Navigation",
    usage: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"`,
    guidelines: ["The last item is the current page (BreadcrumbPage), not a link.", "Collapse the middle with BreadcrumbEllipsis past four levels."],
  },
  {
    id: "pagination",
    group: "Navigation",
    usage: `import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"`,
    guidelines: ["Show the current page, its neighbours, and the first and last.", "For feeds, prefer “Load more” or infinite scroll."],
    api: [{ name: "PaginationLink", props: [{ name: "isActive", type: "boolean", default: "false", description: "Current page; sets aria-current=\"page\"." }] }],
  },
  {
    id: "dropdown-menu",
    group: "Overlays",
    usage: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Rename</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    guidelines: ["For actions on an object or view options. Navigation belongs in Nav.", "Put destructive items last, after a separator, with variant=\"destructive\".", "Keep labels short; shortcuts go in DropdownMenuShortcut."],
    api: [{ name: "DropdownMenuItem", props: [{ name: "variant", type: '"default" | "destructive"', default: '"default"', description: "Destructive tints the label and icon." }, { name: "inset", type: "boolean", description: "Indent to align with items that have icons." }] }],
    primitive: radix("Dropdown Menu"),
  },
  {
    id: "dialog",
    group: "Overlays",
    usage: `import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
    guidelines: [
      "For focused tasks that block the page. Prefer inline editing when possible.",
      "Always include a DialogTitle. Footer: secondary action left of the primary one.",
      "Destructive confirmations name the object and the consequence, and the confirm button repeats the verb.",
    ],
    api: [
      {
        name: "DialogContent",
        props: [
          { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Max width: 400, 480 or 640px." },
          { name: "showCloseButton", type: "boolean", default: "true", description: "Top-right close button." },
        ],
      },
    ],
    primitive: radix("Dialog"),
  },
  {
    id: "tooltip",
    group: "Overlays",
    usage: `import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

<Tooltip>
  <TooltipTrigger asChild>
    <Button size="icon" aria-label="Copy">…</Button>
  </TooltipTrigger>
  <TooltipContent>Copy link</TooltipContent>
</Tooltip>`,
    guidelines: ["Short hints for icon buttons and truncated text. Never put essential information only in a tooltip.", "400ms delay so passing the cursor over a toolbar stays quiet."],
    primitive: radix("Tooltip"),
  },
  {
    id: "sonner",
    group: "Feedback",
    usage: `// Once, near the root of your app
import { Toaster } from "@/components/ui/sonner"
<Toaster />

// Anywhere
import { toast } from "sonner"
toast.success("Changes saved")`,
    guidelines: ["Brief confirmation after an action. Persistent problems belong in an Alert.", "Offer Undo instead of a confirmation dialog for reversible actions.", "Keep it to one line; add a description only when needed."],
    primitive: { name: "Sonner", href: "https://sonner.emilkowal.ski" },
  },
  {
    id: "table",
    group: "Data display",
    usage: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"`,
    guidelines: [
      "Right-align numbers with numeric; they use tabular numerals.",
      "Cells don't wrap by default; the container scrolls horizontally on small screens.",
      "Sortable columns: TableSortButton inside TableHead, and set aria-sort on the TableHead.",
    ],
    api: [
      { name: "Table", props: [{ name: "containerClassName", type: "string", description: "Class for the bordered, scrolling wrapper." }] },
      { name: "TableHead / TableCell", props: [{ name: "numeric", type: "boolean", default: "false", description: "Right-aligned tabular numbers." }] },
      { name: "TableSortButton", props: [{ name: "direction", type: '"ascending" | "descending" | "none"', default: '"none"', description: "Arrow shown next to the label." }] },
    ],
  },
  {
    id: "empty",
    group: "Feedback",
    usage: `import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"`,
    guidelines: ["Explain what will appear here and offer one next step.", "First-run empty states teach; filtered-to-nothing states offer to clear filters."],
  },
  {
    id: "skeleton",
    group: "Feedback",
    usage: `import { Skeleton } from "@/components/ui/skeleton"

<Skeleton className="h-4 w-32" />`,
    guidelines: ["Mirror the real layout so nothing jumps when content arrives.", "Mark the region with aria-busy."],
  },
  {
    id: "spinner",
    group: "Feedback",
    usage: `import { Spinner } from "@/components/ui/spinner"

<Spinner />`,
    guidelines: ["For short, inline waits. Inside buttons use <Button loading>. For page loads prefer Skeleton."],
    api: [
      {
        name: "Spinner",
        props: [
          { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "12, 16 or 24px." },
          { name: "label", type: "string", default: '"Loading"', description: "Accessible name (role=\"status\")." },
        ],
      },
    ],
  },
  {
    id: "progress",
    group: "Feedback",
    usage: `import { Progress } from "@/components/ui/progress"

<Progress value={64} aria-label="Upload" />`,
    guidelines: ["Determinate progress only. Show the number as text nearby.", "Give it an accessible name."],
    api: [{ name: "Progress", props: [{ name: "value", type: "number", description: "0–100." }, { name: "indicatorClassName", type: "string", description: "Class for the filled bar, e.g. bg-success." }] }],
    primitive: radix("Progress"),
  },
  {
    id: "separator",
    group: "Utilities",
    usage: `import { Separator } from "@/components/ui/separator"

<Separator />`,
    guidelines: ["Prefer spacing over lines; use a separator when spacing alone is ambiguous."],
    primitive: radix("Separator"),
  },
  {
    id: "kbd",
    group: "Utilities",
    usage: `import { Kbd, KbdGroup } from "@/components/ui/kbd"

<Kbd>⌘K</Kbd>`,
    guidelines: ["Use platform symbols (⌘ ⌥ ⇧) on macOS.", "Group key combinations with KbdGroup."],
  },
  {
    id: "theme-switcher",
    group: "Utilities",
    usage: `import { ThemeSwitcher } from "@/components/ui/theme-switcher"

<ThemeSwitcher />`,
    guidelines: [
      "Installs the useTheme hook (@/hooks/use-theme), which toggles the .dark class on <html> and stores the choice in localStorage.",
      "Add the inline script from use-theme.ts to <head> to avoid a flash of the wrong theme.",
      "Already using next-themes? Keep it and build the switcher on its useTheme instead.",
    ],
    api: [
      {
        name: "ThemeSwitcher",
        props: [
          { name: "showLabels", type: "boolean", default: "false", description: "Show “System / Light / Dark” next to the icons." },
          { name: "size", type: '"sm" | "default"', default: '"sm"', description: "Control size." },
        ],
      },
    ],
  },
]

/* Joined with registry.json (title, description, dependencies), examples and source */

type RegistryItem = (typeof registry.items)[number] & { dependencies?: string[]; registryDependencies?: string[] }
const items = registry.items as RegistryItem[]

const exampleModules = import.meta.glob<{ default: React.ComponentType }>("../examples/*/*.tsx")
const exampleSources = import.meta.glob<string>("../examples/*/*.tsx", { eager: true, query: "?raw", import: "default" })
const sources = import.meta.glob<string>(["../../registry/ui/*.tsx", "../../registry/hooks/*.ts", "../../registry/lib/*.ts"], {
  eager: true,
  query: "?raw",
  import: "default",
})

export const themeCss = themeSource.trimEnd()

export type Example = { slug: string; title: string; Component: React.ComponentType; source: string }

function examplesFor(id: string): Example[] {
  return Object.keys(exampleModules)
    .filter((p) => p.startsWith(`../examples/${id}/`))
    .sort()
    .map((p) => {
      const slug = p.split("/").pop()!.replace(/^\d+-|\.tsx$/g, "")
      return {
        slug,
        title: slug === "demo" ? "Demo" : slug.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase()),
        Component: React.lazy(exampleModules[p]),
        source: exampleSources[p].trimEnd(),
      }
    })
}

export type FileSource = { path: string; target: string; code: string }

export type ComponentEntry = ComponentDoc & {
  title: string
  description: string
  dependencies: string[]
  registryDependencies: string[]
  examples: Example[]
  files: FileSource[]
}

function filesFor(item: RegistryItem): FileSource[] {
  const own = (item.files ?? []).map((f) => f.path)
  const hooks = ["use-theme", "use-field"].filter(name => (item.registryDependencies ?? []).includes(`@aynsdev/${name}`)).map(name => `registry/hooks/${name}.ts`)
  return [...own, ...hooks].map((path) => ({
    path,
    target: path.replace(/^registry\/ui\//, "components/ui/").replace(/^registry\/hooks\//, "hooks/"),
    code: (sources[`../../${path}`] ?? "").trimEnd(),
  }))
}

export const components: ComponentEntry[] = docs.map((d) => {
  const item = items.find((i) => i.name === d.id)
  if (!item) throw new Error(`No registry item for ${d.id}`)
  return {
    ...d,
    title: item.title ?? d.id,
    description: item.description ?? "",
    dependencies: item.dependencies ?? [],
    registryDependencies: (item.registryDependencies ?? []).filter((r) => r.startsWith("@aynsdev/") && r !== "@aynsdev/theme" && r !== "@aynsdev/use-theme"),
    examples: examplesFor(d.id),
    files: filesFor(item),
  }
})

export const groups = ["Actions", "Forms", "Data display", "Navigation", "Overlays", "Feedback", "Utilities"] as const

export const NAMESPACE = "@aynsdev"
export const REGISTRY_URL = "https://raw.githubusercontent.com/aynsdev/ui/main/public/r/{name}.json"
export const REPO_URL = "https://github.com/aynsdev/ui"
export const utilsSource = (sources["../../registry/lib/utils.ts"] ?? "").trimEnd()
