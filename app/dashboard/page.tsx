import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BarChart3, MessageSquare, ThumbsUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { mockAccounts } from "@/lib/mock-data/accounts"
import { mockLikes } from "@/lib/mock-data/likes"
import { mockReviews } from "@/lib/mock-data/reviews"

export const metadata: Metadata = {
  title: "Дашборд - SellZilla",
  description: "Панель управления SellZilla",
}

export default function DashboardPage() {
  // Используем тестовые данные для отображения статистики
  const accountsCount = mockAccounts.length
  const reviewsCount = mockReviews.length
  const likesCount = mockLikes.filter((like) => like.type === "like").length

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">Дашборд</h1>
        <p className="text-muted-foreground">Добро пожаловать в панель управления SellZilla</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Аккаунты WB</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accountsCount}</div>
            <p className="text-xs text-muted-foreground">Подключенных аккаунтов</p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/accounts" className="w-full">
              <Button variant="outline" className="w-full">
                Управление аккаунтами
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Отзывы</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviewsCount}</div>
            <p className="text-xs text-muted-foreground">Всего отзывов</p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/reviews" className="w-full">
              <Button variant="outline" className="w-full">
                Просмотр отзывов
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Лайки</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{likesCount}</div>
            <p className="text-xs text-muted-foreground">Всего лайков</p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/reviews-likes" className="w-full">
              <Button variant="outline" className="w-full">
                Просмотр лайков
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Статистика</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">Аналитика по отзывам</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Скоро
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-bold">Начало работы</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Подключите аккаунт WB</CardTitle>
              <CardDescription>Добавьте свой аккаунт Wildberries для начала работы</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/dashboard/accounts/add" className="w-full">
                <Button className="w-full">
                  Подключить
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Настройте уведомления</CardTitle>
              <CardDescription>Настройте уведомления о новых отзывах и лайках</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Настроить
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Изучите документацию</CardTitle>
              <CardDescription>Ознакомьтесь с руководством по использованию сервиса</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Открыть
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
