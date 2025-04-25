"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockRejections } from "@/lib/mock-data/rejections"
import { formatDate } from "@/lib/utils/format-date"

export default function RejectionsClientPage() {
  const [rejections] = useState(mockRejections)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAccount, setFilterAccount] = useState<string>("all")
  const [filterReason, setFilterReason] = useState<string>("all")

  // Получаем уникальные аккаунты и причины для фильтров
  const uniqueAccounts = Array.from(new Set(rejections.map((rejection) => rejection.account)))
  const uniqueReasons = Array.from(new Set(rejections.map((rejection) => rejection.reason)))

  const filteredRejections = rejections.filter((rejection) => {
    // Search filter
    const searchMatch =
      rejection.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rejection.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rejection.articleId.includes(searchTerm) ||
      rejection.reason.toLowerCase().includes(searchTerm.toLowerCase())

    // Account filter
    const accountMatch = filterAccount === "all" || rejection.account === filterAccount

    // Reason filter
    const reasonMatch = filterReason === "all" || rejection.reason === filterReason

    return searchMatch && accountMatch && reasonMatch
  })

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-1">
        <h1 className="text-3xl font-bold">Отказы</h1>
        <p className="text-muted-foreground">Анализ отказов от заказов</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative md:col-span-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по отказам..."
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
            <Select value={filterReason} onValueChange={setFilterReason}>
              <SelectTrigger>
                <SelectValue placeholder="Причина" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все причины</SelectItem>
                {uniqueReasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Артикул</TableHead>
              <TableHead>Товар</TableHead>
              <TableHead>Бренд</TableHead>
              <TableHead>Аккаунт</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Причина</TableHead>
              <TableHead>Пользователь</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRejections.map((rejection) => (
              <TableRow key={rejection.id}>
                <TableCell className="whitespace-nowrap">{formatDate(rejection.date)}</TableCell>
                <TableCell>{rejection.articleId}</TableCell>
                <TableCell className="max-w-[200px] truncate">{rejection.productName}</TableCell>
                <TableCell>{rejection.brand}</TableCell>
                <TableCell>{rejection.account}</TableCell>
                <TableCell>{rejection.orderAmount} ₽</TableCell>
                <TableCell>{rejection.reason}</TableCell>
                <TableCell>{rejection.userName}</TableCell>
              </TableRow>
            ))}
            {filteredRejections.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Нет отказов, соответствующих фильтрам
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
