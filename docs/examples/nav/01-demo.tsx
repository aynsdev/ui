import { InboxIcon, LayoutDashboardIcon, SettingsIcon, UsersIcon } from "lucide-react"

import { Nav, NavBadge, NavGroup, NavItem, NavLabel } from "@/components/ui/nav"

export default function NavDemo() {
  return (
    <Nav aria-label="Main" className="w-56">
      <NavGroup>
        <NavItem href="#" isActive>
          <LayoutDashboardIcon />
          <span>Dashboard</span>
        </NavItem>
        <NavItem href="#">
          <InboxIcon />
          <span>Inbox</span>
          <NavBadge>12</NavBadge>
        </NavItem>
      </NavGroup>
      <NavGroup>
        <NavLabel>Workspace</NavLabel>
        <NavItem href="#">
          <UsersIcon />
          <span>Members</span>
        </NavItem>
        <NavItem href="#">
          <SettingsIcon />
          <span>Settings</span>
        </NavItem>
      </NavGroup>
    </Nav>
  )
}
