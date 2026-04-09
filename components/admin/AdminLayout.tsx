"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  BarChart3,
  DollarSign,
  MessageSquare,
  FileText,
  Users,
  Heart,
  Menu,
  X,
  LogOut,
  User,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: BarChart3 },
  { name: "Pricing", href: "/admin/pricing", icon: DollarSign },
  { name: "Contact Inquiries", href: "/admin/contact", icon: MessageSquare },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Testimonials", href: "/admin/testimonials", icon: Users },
  { name: "Community Impact", href: "/admin/community", icon: Heart },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("traceit_admin_auth");
    router.push("/admin/login");
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-center border-b border-gray-800 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">TraceIT Admin</h1>
      </div>
      <nav className="flex-1 space-y-1 bg-gradient-to-b from-black via-gray-900 to-black p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <button
              key={item.name}
              onClick={() => {
                router.push(item.href);
                setSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300",
                isActive
                  ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                  : "text-gray-400 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:text-white hover:shadow-md"
              )}
            >
              <item.icon className={cn(
                "mr-3 h-5 w-5 transition-colors duration-300",
                isActive ? "text-cyan-400" : "text-gray-500"
              )} />
              {item.name}
            </button>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-50 lg:hidden bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 border border-gray-600"
          >
            <Menu className="h-5 w-5 text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-black border-gray-800">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-800">
        <SidebarContent />
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-lg border-b border-gray-800 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <div className="hidden lg:block">
                <h2 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {navigation.find(item => item.href === pathname)?.name || "Admin"}
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 border border-gray-600">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-900 border-gray-700" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-white">Admin User</p>
                      <p className="w-[200px] truncate text-sm text-gray-400">
                        admin@traceit.com
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem onClick={handleLogout} className="text-gray-300 hover:text-white hover:bg-gray-800">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
