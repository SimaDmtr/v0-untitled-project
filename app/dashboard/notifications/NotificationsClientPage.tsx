"use client"

import { useState } from "react"
import { Bell, Check, MessageSquare, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils/format-date"
import { useRouter } from "next/navigation"

// Типы уведомлений
type NotificationType = "review" | "like" | "system"

// Интерфейс уведомления
interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  date: string
  read: boolean
  link?: string
}

// Моковые данные уведомлений
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "review",
    title: "Новый отзыв",
    message: "Пользователь Алексей оставил отзыв на товар 'Футболка хлопковая'",
    date: "2023-10-15T14:30:00Z",
    read: false,
    link: "/dashboard/reviews",
  },
  {
    id: "2",
    type: "like",
    title: "Новый лайк",
    message: "Пользователь поставил лайк товару 'Джинсы классические'",
    date: "2023-10-14T10:15:00Z",
    read: false,
    link: "/dashboard/reviews-likes",
  },
  {
    id: "3",
    type: "system",
    title: "Обновление системы",
    message: "Мы обновили функционал работы с отзывами. Теперь вы можете отвечать на отзывы прямо из системы.",
    date: "2023-10-13T16:45:00Z",
    read: true,
  },
  {
    id: "4",
    type: "review",
    title: "Новый отзыв",
    message: "Пользователь Мария оставила отзыв на товар 'Платье вечернее'",
    date: "2023-10-12T09:20:00Z",
    read: true,
    link: "/dashboard/reviews",
  },
  {
    id: "5",
    type: "like",
    title: "Новый лайк",
    message: "Пользователь поставил лайк товару 'Куртка зимняя'",
    date: "2023-10-11T13:10:00Z",
    read: true,
    link: "/dashboard/reviews-likes",
  },
]

export default function NotificationsClientPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") {
      return !notification.read
    }
    return true
  })

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "review":
        return <MessageSquare className="h-5 w-5 text-blue-500" />
      case "like":
        return <ThumbsUp className="h-5 w-5 text-green-500" />
      case "system":
        return <Bell className="h-5 w-5 text-orange-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Уведомления</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `У вас ${unreadCount} непрочитанных уведомлений` : "У вас нет непрочитанных уведомлений"}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-2">
            <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
              Все
            </Button>
            <Button variant={filter === "unread" ? "default" : "outline"} onClick={() => setFilter("unread")}>
              Непрочитанные
            </Button>
          </div>
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            Отметить все как прочитанные
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-colors ${!notification.read ? "border-l-4 border-l-primary" : ""}`}
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{notification.title}</CardTitle>
                  <CardDescription>{formatDate(notification.date)}</CardDescription>
                </div>
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="ml-auto"
                  >
                    <Check className="mr-1 h-4 w-4" />
                    Прочитано
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <p>{notification.message}</p>
              </CardContent>
              {notification.link && (
                <CardFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleMarkAsRead(notification.id)
                      router.push(notification.link!)
                    }}
                  >
                    Перейти
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))
        ) : (
          <Card className="flex flex-col items-center justify-center p-8 text-center">
            <div className="space-y-2">
              <h2 className="text-xl font-bold">Нет уведомлений</h2>
              <p className="text-muted-foreground">
                {filter === "unread" ? "У вас нет непрочитанных уведомлений" : "У вас нет уведомлений"}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
