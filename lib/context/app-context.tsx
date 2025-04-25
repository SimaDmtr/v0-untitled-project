"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { mockAccounts, type WBAccount } from "@/lib/mock-data/accounts"
import { mockReviews, type Review } from "@/lib/mock-data/reviews"
import { mockLikes, type Like } from "@/lib/mock-data/likes"
import { mockRejections, type Rejection } from "@/lib/mock-data/rejections"
import { toast } from "@/components/ui/use-toast"

interface AppContextType {
  // Данные
  accounts: WBAccount[]
  reviews: Review[]
  likes: Like[]
  rejections: Rejection[]

  // Методы для аккаунтов
  addAccount: (account: Omit<WBAccount, "id" | "createdAt">) => void
  updateAccount: (id: string, data: Partial<WBAccount>) => void
  deleteAccount: (id: string) => void

  // Методы для отзывов
  respondToReview: (reviewId: string, message: string) => void

  // Методы для уведомлений
  hasUnreadNotifications: boolean
  markNotificationsAsRead: () => void

  // Методы для пользователя
  logout: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<WBAccount[]>(mockAccounts)
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [likes] = useState<Like[]>(mockLikes)
  const [rejections] = useState<Rejection[]>(mockRejections)
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true)

  // Методы для аккаунтов
  const addAccount = (account: Omit<WBAccount, "id" | "createdAt">) => {
    const newAccount: WBAccount = {
      ...account,
      id: `${accounts.length + 1}`,
      createdAt: new Date().toISOString(),
    }
    setAccounts([...accounts, newAccount])
    toast({
      title: "Аккаунт добавлен",
      description: `Аккаунт ${account.shopName} успешно добавлен`,
    })
  }

  const updateAccount = (id: string, data: Partial<WBAccount>) => {
    setAccounts(accounts.map((account) => (account.id === id ? { ...account, ...data } : account)))
    toast({
      title: "Аккаунт обновлен",
      description: "Данные аккаунта успешно обновлены",
    })
  }

  const deleteAccount = (id: string) => {
    setAccounts(accounts.filter((account) => account.id !== id))
    toast({
      title: "Аккаунт удален",
      description: "Аккаунт успешно удален из системы",
    })
  }

  // Методы для отзывов
  const respondToReview = (reviewId: string, message: string) => {
    // В реальном приложении здесь был бы API запрос
    toast({
      title: "Ответ отправлен",
      description: "Ваш ответ на отзыв успешно отправлен",
    })
  }

  // Методы для уведомлений
  const markNotificationsAsRead = () => {
    setHasUnreadNotifications(false)
    toast({
      title: "Уведомления прочитаны",
      description: "Все уведомления отмечены как прочитанные",
    })
  }

  // Методы для пользователя
  const logout = () => {
    // В реальном приложении здесь был бы API запрос для выхода
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из системы",
    })
    // В реальном приложении здесь был бы редирект на страницу входа
  }

  return (
    <AppContext.Provider
      value={{
        accounts,
        reviews,
        likes,
        rejections,
        addAccount,
        updateAccount,
        deleteAccount,
        respondToReview,
        hasUnreadNotifications,
        markNotificationsAsRead,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
