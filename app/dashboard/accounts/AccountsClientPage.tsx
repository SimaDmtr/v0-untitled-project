"use client"

import Link from "next/link"
import { CheckCircle, PlusCircle, Settings, Trash2, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAppContext } from "@/lib/context/app-context"
import { formatDate } from "@/lib/utils/format-date"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AccountsClientPage() {
  const { accounts, updateAccount, deleteAccount } = useAppContext()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentAccount, setCurrentAccount] = useState<(typeof accounts)[0] | null>(null)
  const [editName, setEditName] = useState("")
  const [editShopName, setEditShopName] = useState("")

  const handleEditClick = (account: (typeof accounts)[0]) => {
    setCurrentAccount(account)
    setEditName(account.name)
    setEditShopName(account.shopName)
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    if (currentAccount) {
      updateAccount(currentAccount.id, {
        name: editName,
        shopName: editShopName,
      })
      setIsEditDialogOpen(false)
      setCurrentAccount(null)
    }
  }

  const handleDeleteAccount = (id: string) => {
    deleteAccount(id)
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Аккаунты Wildberries</h1>
          <p className="text-muted-foreground">Управление подключенными аккаунтами Wildberries</p>
        </div>
        <Link href="/dashboard/accounts/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Добавить аккаунт
          </Button>
        </Link>
      </div>

      {accounts.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Подключенные аккаунты</CardTitle>
            <CardDescription>Список ваших подключенных аккаунтов Wildberries</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Магазин</TableHead>
                  <TableHead>ИНН</TableHead>
                  <TableHead>Статус куки</TableHead>
                  <TableHead>Статус API</TableHead>
                  <TableHead>Дата добавления</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.name}</TableCell>
                    <TableCell>{account.shopName}</TableCell>
                    <TableCell>{account.inn}</TableCell>
                    <TableCell>
                      {account.cookieStatus ? (
                        <div className="flex items-center text-green-500">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Активно
                        </div>
                      ) : (
                        <div className="flex items-center text-red-500">
                          <XCircle className="mr-1 h-4 w-4" />
                          Ошибка
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {account.apiStatus ? (
                        <div className="flex items-center text-green-500">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Активно
                        </div>
                      ) : (
                        <div className="flex items-center text-red-500">
                          <XCircle className="mr-1 h-4 w-4" />
                          Ошибка
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(account.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditClick(account)}>
                          <Settings className="mr-1 h-4 w-4" />
                          Настроить
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                              <Trash2 className="mr-1 h-4 w-4" />
                              Удалить
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Удаление аккаунта</AlertDialogTitle>
                              <AlertDialogDescription>
                                Вы уверены, что хотите удалить аккаунт {account.shopName}? Это действие нельзя отменить.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отмена</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteAccount(account.id)}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Удалить
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="flex flex-col items-center justify-center p-8 text-center">
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Нет подключенных аккаунтов</h2>
            <p className="text-muted-foreground">Добавьте свой первый аккаунт Wildberries для начала работы</p>
          </div>
          <Link href="/dashboard/accounts/add" className="mt-4">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Добавить аккаунт
            </Button>
          </Link>
        </Card>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Настройка аккаунта</DialogTitle>
            <DialogDescription>
              Измените настройки аккаунта Wildberries. Нажмите сохранить, когда закончите.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Название
              </Label>
              <Input id="name" value={editName} onChange={(e) => setEditName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shopName" className="text-right">
                Магазин
              </Label>
              <Input
                id="shopName"
                value={editShopName}
                onChange={(e) => setEditShopName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSaveEdit}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
