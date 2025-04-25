"use client"

import { useState } from "react"
import { Eye, MessageSquare, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useAppContext } from "@/lib/context/app-context"
import type { mockReviews } from "@/lib/mock-data/reviews"
import { formatDate } from "@/lib/utils/format-date"

export default function ReviewsClientPage() {
  const { reviews, respondToReview } = useAppContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAccount, setFilterAccount] = useState<string>("all")
  const [filterRating, setFilterRating] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<(typeof mockReviews)[0] | null>(null)
  const [messageTemplate, setMessageTemplate] = useState(
    "Здравствуйте! Благодарим за ваш отзыв о товаре. Мы ценим ваше мнение и постоянно работаем над улучшением качества нашей продукции.",
  )
  const [autoSend, setAutoSend] = useState(false)

  // Получаем уникальные аккаунты для фильтра
  const uniqueAccounts = Array.from(new Set(reviews.map((review) => review.account)))

  const filteredReviews = reviews.filter((review) => {
    // Search filter
    const searchMatch =
      review.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.articleId.includes(searchTerm)

    // Account filter
    const accountMatch = filterAccount === "all" || review.account === filterAccount

    // Rating filter
    const ratingMatch = filterRating === "all" || review.rating === Number.parseInt(filterRating)

    // Status filter
    const statusMatch = filterStatus === "all" || review.status === filterStatus

    return searchMatch && accountMatch && ratingMatch && statusMatch
  })

  const handleOpenMessageDialog = (review: (typeof mockReviews)[0]) => {
    setSelectedReview(review)
    setIsMessageDialogOpen(true)
  }

  const handleSendMessage = async () => {
    if (!selectedReview) return

    try {
      // Отправляем ответ на отзыв через контекст
      respondToReview(selectedReview.id, messageTemplate)

      // Закрываем диалог
      setIsMessageDialogOpen(false)
      setSelectedReview(null)
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение",
        variant: "destructive",
      })
    }
  }

  const handleResetTemplate = () => {
    setMessageTemplate(
      "Здравствуйте! Благодарим за ваш отзыв о товаре. Мы ценим ваше мнение и постоянно работаем над улучшением качества нашей продукции.",
    )
  }

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "fill-none text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "purchase":
        return "text-green-500 bg-green-50 dark:bg-green-900/20"
      case "refusal":
        return "text-orange-500 bg-orange-50 dark:bg-orange-900/20"
      case "return":
        return "text-red-500 bg-red-50 dark:bg-red-900/20"
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-900/20"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "purchase":
        return "Выкуп"
      case "refusal":
        return "Отказ"
      case "return":
        return "Возврат"
      default:
        return status
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-1">
        <h1 className="text-3xl font-bold">Отзывы</h1>
        <p className="text-muted-foreground">Управление отзывами на ваши товары</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по отзывам..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterAccount} onValueChange={setFilterAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Аккаунт" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все аккаунты</SelectItem>
                {uniqueAccounts.map((account) => (
                  <SelectItem key={account} value={account}>
                    {account}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-4">
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Оценка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все оценки</SelectItem>
                  <SelectItem value="5">5 звезд</SelectItem>
                  <SelectItem value="4">4 звезды</SelectItem>
                  <SelectItem value="3">3 звезды</SelectItem>
                  <SelectItem value="2">2 звезды</SelectItem>
                  <SelectItem value="1">1 звезда</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="purchase">Выкуп</SelectItem>
                  <SelectItem value="refusal">Отказ</SelectItem>
                  <SelectItem value="return">Возврат</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Оценка</TableHead>
              <TableHead>Текст</TableHead>
              <TableHead>Артикул</TableHead>
              <TableHead>Товар</TableHead>
              <TableHead>Аккаунт</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Пользователь</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="whitespace-nowrap">{formatDate(review.date)}</TableCell>
                <TableCell>{renderRatingStars(review.rating)}</TableCell>
                <TableCell className="max-w-[200px] truncate">{review.text}</TableCell>
                <TableCell>{review.articleId}</TableCell>
                <TableCell className="max-w-[150px] truncate">{review.productName}</TableCell>
                <TableCell>{review.account}</TableCell>
                <TableCell>{review.orderAmount} ₽</TableCell>
                <TableCell>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(review.status)}`}>
                    {getStatusText(review.status)}
                  </span>
                </TableCell>
                <TableCell>{review.userName}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        toast({
                          title: "Просмотр отзыва",
                          description: `Открыт отзыв от пользователя ${review.userName}`,
                        })
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleOpenMessageDialog(review)}>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredReviews.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} className="h-24 text-center">
                  Нет отзывов, соответствующих фильтрам
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Отправить сообщение</DialogTitle>
            <DialogDescription>
              Отправьте сообщение пользователю {selectedReview?.userName} в ответ на отзыв
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-md bg-muted p-3">
              <p className="text-sm font-medium">Отзыв:</p>
              <p className="text-sm">{selectedReview?.text}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="message-template">Шаблон сообщения</Label>
                <Button variant="ghost" size="sm" onClick={handleResetTemplate}>
                  Сбросить шаблон
                </Button>
              </div>
              <Textarea
                id="message-template"
                value={messageTemplate}
                onChange={(e) => setMessageTemplate(e.target.value)}
                rows={6}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="auto-send" checked={autoSend} onCheckedChange={setAutoSend} />
              <Label htmlFor="auto-send">Автоматическая отправка</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSendMessage}>Отправить сообщение</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
