"use client"

import { useState } from "react"
import { Search, Star, ThumbsDown, ThumbsUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockLikes } from "@/lib/mock-data/likes"
import { mockReviews } from "@/lib/mock-data/reviews"
import { formatDate } from "@/lib/utils/format-date"

export default function ReviewsLikesClientPage() {
  // Используем только необходимые поля из отзывов для этой страницы
  const reviews = mockReviews.map((review) => ({
    id: review.id,
    date: review.date,
    rating: review.rating,
    text: review.text,
    articleId: review.articleId,
    productName: review.productName,
    brand: review.brand,
    seller: review.account,
  }))

  const likes = mockLikes

  const [reviewSearchTerm, setReviewSearchTerm] = useState("")
  const [reviewFilterSeller, setReviewFilterSeller] = useState<string>("all")
  const [reviewFilterRating, setReviewFilterRating] = useState<string>("all")

  const [likeSearchTerm, setLikeSearchTerm] = useState("")
  const [likeFilterSeller, setLikeFilterSeller] = useState<string>("all")
  const [likeFilterType, setLikeFilterType] = useState<string>("all")

  // Получаем уникальные продавцы для фильтров
  const uniqueSellers = Array.from(
    new Set([...reviews.map((review) => review.seller), ...likes.map((like) => like.seller)]),
  )

  const filteredReviews = reviews.filter((review) => {
    // Search filter
    const searchMatch =
      review.text.toLowerCase().includes(reviewSearchTerm.toLowerCase()) ||
      review.productName.toLowerCase().includes(reviewSearchTerm.toLowerCase()) ||
      review.articleId.includes(reviewSearchTerm)

    // Seller filter
    const sellerMatch = reviewFilterSeller === "all" || review.seller === reviewFilterSeller

    // Rating filter
    const ratingMatch = reviewFilterRating === "all" || review.rating === Number.parseInt(reviewFilterRating)

    return searchMatch && sellerMatch && ratingMatch
  })

  const filteredLikes = likes.filter((like) => {
    // Search filter
    const searchMatch =
      like.productName.toLowerCase().includes(likeSearchTerm.toLowerCase()) || like.articleId.includes(likeSearchTerm)

    // Seller filter
    const sellerMatch = likeFilterSeller === "all" || like.seller === likeFilterSeller

    // Type filter
    const typeMatch = likeFilterType === "all" || like.type === likeFilterType

    return searchMatch && sellerMatch && typeMatch
  })

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

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-1">
        <h1 className="text-3xl font-bold">Отзывы и лайки</h1>
        <p className="text-muted-foreground">Просмотр отзывов и лайков на ваши товары</p>
      </div>

      <Tabs defaultValue="reviews" className="space-y-6">
        <TabsList>
          <TabsTrigger value="reviews">Отзывы</TabsTrigger>
          <TabsTrigger value="likes">Лайки</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="relative md:col-span-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по отзывам..."
                    className="pl-8"
                    value={reviewSearchTerm}
                    onChange={(e) => setReviewSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={reviewFilterSeller} onValueChange={setReviewFilterSeller}>
                  <SelectTrigger>
                    <SelectValue placeholder="Продавец" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все продавцы</SelectItem>
                    {uniqueSellers.map((seller) => (
                      <SelectItem key={seller} value={seller}>
                        {seller}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={reviewFilterRating} onValueChange={setReviewFilterRating}>
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
              </div>
            </CardContent>
          </Card>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата и время</TableHead>
                  <TableHead>Оценка</TableHead>
                  <TableHead>Текст</TableHead>
                  <TableHead>Артикул</TableHead>
                  <TableHead>Товар</TableHead>
                  <TableHead>Бренд</TableHead>
                  <TableHead>Продавец</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="whitespace-nowrap">{formatDate(review.date)}</TableCell>
                    <TableCell>{renderRatingStars(review.rating)}</TableCell>
                    <TableCell className="max-w-[300px] truncate">{review.text}</TableCell>
                    <TableCell>{review.articleId}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{review.productName}</TableCell>
                    <TableCell>{review.brand}</TableCell>
                    <TableCell>{review.seller}</TableCell>
                  </TableRow>
                ))}
                {filteredReviews.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Нет отзывов, соответствующих фильтрам
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="likes" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="relative md:col-span-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по лайкам..."
                    className="pl-8"
                    value={likeSearchTerm}
                    onChange={(e) => setLikeSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={likeFilterSeller} onValueChange={setLikeFilterSeller}>
                  <SelectTrigger>
                    <SelectValue placeholder="Продавец" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все продавцы</SelectItem>
                    {uniqueSellers.map((seller) => (
                      <SelectItem key={seller} value={seller}>
                        {seller}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={likeFilterType} onValueChange={setLikeFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="like">Лайки</SelectItem>
                    <SelectItem value="dislike">Дизлайки</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата и время</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Артикул</TableHead>
                  <TableHead>Товар</TableHead>
                  <TableHead>Бренд</TableHead>
                  <TableHead>Продавец</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLikes.map((like) => (
                  <TableRow key={like.id}>
                    <TableCell className="whitespace-nowrap">{formatDate(like.date)}</TableCell>
                    <TableCell>
                      {like.type === "like" ? (
                        <div className="flex items-center text-green-500">
                          <ThumbsUp className="mr-1 h-4 w-4" />
                          Лайк
                        </div>
                      ) : (
                        <div className="flex items-center text-red-500">
                          <ThumbsDown className="mr-1 h-4 w-4" />
                          Дизлайк
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{like.articleId}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{like.productName}</TableCell>
                    <TableCell>{like.brand}</TableCell>
                    <TableCell>{like.seller}</TableCell>
                  </TableRow>
                ))}
                {filteredLikes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Нет лайков, соответствующих фильтрам
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
