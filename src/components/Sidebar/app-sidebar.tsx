"use client"

import * as React from "react"
import {
  HiOutlineCamera,
  HiOutlineChartBar,
  HiOutlineHome,
  HiOutlineDatabase,
  HiOutlineDocumentText,
  HiOutlineFolder,
  HiOutlineQuestionMarkCircle,
  HiOutlineUsers,
  HiOutlineSearch,
  HiOutlineCog,
} from "react-icons/hi"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavDocuments } from "./nav-documents"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Dashboard", url: "#", icon: HiOutlineHome },
    { title: "Lifecycle", url: "#", icon: HiOutlineDocumentText },
    { title: "Analytics", url: "#", icon: HiOutlineChartBar },
    { title: "Projects", url: "#", icon: HiOutlineFolder },
    { title: "Team", url: "#", icon: HiOutlineUsers },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: HiOutlineCamera,
      isActive: true,
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
  ],
  navSecondary: [
    { title: "Settings", url: "#", icon: HiOutlineCog },
    { title: "Get Help", url: "#", icon: HiOutlineQuestionMarkCircle },
    { title: "Search", url: "#", icon: HiOutlineSearch },
  ],
  documents: [
    { name: "Data Library", url: "#", icon: HiOutlineDatabase },
    { name: "Reports", url: "#", icon: HiOutlineDocumentText },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <HiOutlineHome className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
