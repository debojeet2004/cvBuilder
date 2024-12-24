"use client"

import {
  ChevronsUpDown,
  LogOut,
  Moon,
  Settings,
  Sparkles,
  Sun,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { signOut } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Separator } from "@/components/ui/separator"
import { users } from "@/db/schema/user"

export function NavUser({ user }: { user: typeof users.$inferSelect }) {

  const router = useRouter()
  const { isMobile } = useSidebar()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()


  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <SidebarMenu>
      <Separator />
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={String(user.image)} alt={String(user.name)} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{String(user.name)}</span>
                <span className="truncate text-xs">{String(user.email)}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={String(user.image)} alt={String(user.name)} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{String(user.name)}</span>
                  <span className="truncate text-xs">{String(user.email)}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro (coming soon)
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={toggleTheme}>
                {isDark ? <Sun /> : <Moon />}
                Toogle {isDark ? "Light" : "Dark"} Mode
              </DropdownMenuItem>
              {(String(user.organizationRole) === "Admin" && !pathname.startsWith('/admin')) ? (
                <DropdownMenuItem onClick={() => router.push("/admin")}>
                  <Settings />
                  Admin Dashboard
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  <Settings />
                  User Dashboard
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer bg-red-500  dark:bg-red-500/80">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
