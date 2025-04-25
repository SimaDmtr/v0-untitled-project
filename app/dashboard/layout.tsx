"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAppContext } from "@/lib/context/app-context"
import { Badge } from "@/components/ui/badge"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { hasUnreadNotifications, markNotificationsAsRead, logout } = useAppContext()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleNotificationsClick = () => {
    markNotificationsAsRead()
    router.push("/dashboard/notifications")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="text-2xl font-bold tracking-tight">
              <span className="text-primary">Sell</span>Zilla
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden gap-6 md:flex">
              <Link href="/dashboard/accounts" className="text-sm font-medium hover:underline">
                Аккаунты WB
              </Link>
              <Link href="/dashboard/reviews" className="text-sm font-medium hover:underline">
                Отзывы
              </Link>
              <Link href="/dashboard/reviews-likes" className="text-sm font-medium hover:underline">
                Отзывы и лайки
              </Link>
              <Link href="/dashboard/rejections" className="text-sm font-medium hover:underline">
                Отказы
              </Link>
            </nav>
            <ThemeToggle />
            <Button variant="outline" size="icon" onClick={handleNotificationsClick}>
              <div className="relative">
                <Bell className="h-4 w-4" />
                {hasUnreadNotifications && (
                  <Badge
                    className="absolute -right-2 -top-2 h-4 w-4 p-0 flex items-center justify-center"
                    variant="destructive"
                  >
                    <span className="sr-only">Новые уведомления</span>
                  </Badge>
                )}
              </div>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">Профиль</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Профиль</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Настройки</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
