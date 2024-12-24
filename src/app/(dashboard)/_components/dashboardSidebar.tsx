"use client"

import * as React from "react"
import {
  BookOpen,
  Frame,
  UserCircle,
  Lightbulb,
  GraduationCap,
  Briefcase,
  Award,
  FolderGit2,
} from "lucide-react"
import { usePathname } from "next/navigation"

import { NavMain } from "@/components/sidebar/sideCollapsibleNavMenu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"





export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const isResumeBuilder = pathname.startsWith("/resume-builder/create")
  const data = {
    tools: [
      {
        title: "Resume Builder",
        url: "/resume-builder",
        icon: Frame,
      }
    ],
  }
  const resumeBuilderSections = [
    {
      title: "Personal Info",
      url: "/resume-builder/create/personal-info",
      icon: UserCircle,
      isActive: true,
      isFocused: pathname.split("/").pop() === "personal-info",
    },
    {
      title: "Skills & Languages",
      url: "/resume-builder/create/skills&languages",
      icon: Lightbulb,
      isActive: true,
      isFocused: pathname.split("/").pop() === "skills&languages",
    },
    {
      title: "Education",
      url: "/resume-builder/create/education",
      icon: GraduationCap,
      isActive: true,
      isFocused: pathname.split("/").pop() === "education",
    },
    {
      title: "Experience",
      url: "/resume-builder/create/experience",
      icon: Briefcase,
      isActive: true,
      isFocused: pathname.split("/").pop() === "experience",
    },
    {
      title: "Projects",
      url: "/resume-builder/create/projects",
      icon: FolderGit2,
      isActive: true,
      isFocused: pathname.split("/").pop() === "projects",
    },
    {
      title: "Certifications",
      url: "/resume-builder/create/certifications",
      icon: Award,
      isActive: true,
      isFocused: pathname.split("/").pop() === "certifications",
    },
  ]
  return (
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <BookOpen className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  Hyrecruit AI
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {isResumeBuilder ? (
          <>
            {/* <NavMain items={resumeBuilderNav} type="normal" /> */}
            <NavMain items={resumeBuilderSections} itemsCategory="Resume Builder" type="normal" />
          </>
        ) : (
          <>
            <NavMain items={data.tools} itemsCategory="Tools" />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
