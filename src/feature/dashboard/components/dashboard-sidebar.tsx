"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/src/components/ui/sidebar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { Skeleton } from "@/src/components/ui/skeleton";
import { OrganizationSwitcher, UserButton, useClerk } from "@clerk/nextjs";
import { Home, LayoutGrid, AudioLines, Volume2, Settings, Headphones } from "lucide-react";
import Link from "next/link";

interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  onClick?: () => void;
}

interface NavSelectionProps {
  label?: string;
  pathName: string;
  items: MenuItem[];
}

function NavSelection({ label, pathName, items }: NavSelectionProps) {
  return (
    <SidebarGroup>
      {label && (
        <SidebarGroupLabel className="text-muted-foreground text-[13px] uppercase">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                asChild={!!item.url}
                isActive={
                  item.url
                    ? item.url === "/"
                      ? pathName === "/"
                      : pathName.startsWith(item.url)
                    : false
                }
                onClick={item.onClick}
                tooltip={item.title}
              >
                {item.url ? (
                  <Link href={item.url} className="flex items-center gap-2">
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </div>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const clerk = useClerk();

  const mainMenuItems: MenuItem[] = [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Explore Voice", url: "/voices", icon: LayoutGrid },
    { title: "Text to speech", url: "/text-to-speech", icon: AudioLines },
    { title: "Voice cloning ", icon: Volume2 },
  ];

  const othersMenuItems: MenuItem[] = [
    { title: "Settings", icon: Settings, onClick: () => clerk.openOrganizationProfile() },
    { title: "Help and support", url: "mailto:support@resonance.ai", icon: Headphones },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-col gap-4 pt-4">
        <div className="flex items-center gap-2 pl-1 group-data-[collapsed=icon]:justify-center group-data-[collapsed=icon]:pl-2">
             <Image src="/logo.svg" alt="Resonance Logo" width={24} height={24} />
             <span className="group-data-[collapsible=icon]:hidden font-semibold text-lg tracking-tighter text-foreground">
                Resonance
             </span>
             <SidebarTrigger className="ml-auto lg:hidden" />
        </div>
      </SidebarHeader>
      <div className="border-b border-dashed border-border">
        <SidebarContent>
          <NavSelection label="Main" pathName={pathname} items={mainMenuItems} />
          <SidebarSeparator className="my-2" />
          <NavSelection label="Others" pathName={pathname} items={othersMenuItems} />
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
