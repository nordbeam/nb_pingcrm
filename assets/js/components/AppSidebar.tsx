import { Link, usePage } from "@/lib/inertia";
import type { AuthProps } from "@/types";
import { user_sessions } from "@/routes";
import { Logo, LogoIcon } from "@/components/Logo";
import {
  Home,
  Building2,
  Users,
  User,
  BarChart3,
  ChevronsUpDown,
  Settings,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Navigation items
const mainNav: { name: string; href: string; icon: LucideIcon }[] = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Organizations", href: "/organizations", icon: Building2 },
  { name: "Contacts", href: "/contacts", icon: Users },
  { name: "Users", href: "/users", icon: User },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

export function AppSidebar() {
  const { props, url } = usePage<AuthProps>();
  const { user, account } = props;
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="group-data-[collapsible=icon]:!p-0">
              <Link href="/">
                {state === "collapsed" ? (
                  <LogoIcon className="h-5 w-5 text-primary" />
                ) : (
                  <Logo variant="light" />
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Workspace Selector - hidden when collapsed */}
        {account && (
          <SidebarMenu className="group-data-[collapsible=icon]:hidden">
            <SidebarMenuItem>
              <SidebarMenuButton className="w-full">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-xs font-semibold text-primary">
                  {account.name?.[0]?.toUpperCase()}
                </span>
                <span className="flex-1 truncate text-left font-medium">
                  {account.name}
                </span>
                <ChevronsUpDown className="h-4 w-4 text-sidebar-foreground/50" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => {
                const isActive =
                  item.href === "/" ? url === "/" : url.startsWith(item.href);

                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.name}>
                      <Link href={item.href}>
                        <item.icon className={isActive ? "text-primary" : ""} />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {user && (
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg" tooltip={user.name}>
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt=""
                        className="h-6 w-6 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        {user.firstName?.[0]}
                        {user.lastName?.[0]}
                      </span>
                    )}
                    <span className="flex-1 truncate text-left font-medium">
                      {user.name}
                    </span>
                    <ChevronsUpDown className="h-4 w-4 text-sidebar-foreground/50" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  align="start"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem asChild>
                    <Link href="/users/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/users" className="cursor-pointer">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Users
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href={user_sessions.delete()}
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
