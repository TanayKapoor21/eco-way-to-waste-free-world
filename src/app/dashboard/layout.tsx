'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Leaf,
  LayoutDashboard,
  Camera,
  Map,
  MessageCircle,
  Users,
  Bot,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/classify', icon: Camera, label: 'Waste Classifier' },
  { href: '/dashboard/locator', icon: Map, label: 'Recycling Locator' },
  { href: '/dashboard/chatbot', icon: Bot, label: 'AI Chatbot' },
  { href: '/dashboard/forum', icon: Users, label: 'Community Forum' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-sidebar-accent" asChild>
              <Link href="/dashboard">
                <Leaf />
              </Link>
            </Button>
            <h1 className="text-lg font-headline font-semibold text-primary-foreground group-data-[collapsible=icon]:hidden">
              EWWW
            </h1>
          </div>
        </SidebarHeader>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarFooter>
          <div className="flex items-center gap-2 p-2 group-data-[collapsible=icon]:justify-center">
            <Avatar className="h-8 w-8">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-semibold text-sidebar-foreground">User</span>
              <span className="text-xs text-sidebar-foreground/70">user@example.com</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-card p-4 lg:justify-end">
          <SidebarTrigger className="lg:hidden" />
          <h1 className="text-xl font-headline font-semibold lg:hidden">
            EWWW
          </h1>
          <div>{/* Placeholder for header content */}</div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
