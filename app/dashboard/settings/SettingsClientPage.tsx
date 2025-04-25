"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsClientPage() {
  const [isLoading, setIsLoading] = useState(false)

  // Настройки Telegram
  const [telegramEnabled, setTelegramEnabled] = useState(false)
  const [telegramToken, setTelegramToken] = useState("")
  const [telegramChatId, setTelegramChatId] = useState("")

  // Настройки экспорта
  const [autoExport, setAutoExport] = useState(false)
  const [exportFormat, setExportFormat] = useState("csv")
  const [exportEmail, setExportEmail] = useState("")

  // Настройки API
  const [apiKey, setApiKey] = useState("sk_test_12345678901234567890")

  async function saveTelegramSettings() {
    setIsLoading(true)

    try {
      // Имитация сохранения настроек
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Настройки сохранены",
        description: "Настройки Telegram успешно сохранены",
      })
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить настройки Telegram",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function saveExportSettings() {
    setIsLoading(true)

    try {
      // Имитация сохранения настроек
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Настройки сохранены",
        description: "Настройки экспорта успешно сохранены",
      })
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить настройки экспорта",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function regenerateApiKey() {
    setIsLoading(true)

    try {
      // Имитация генерации нового ключа
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newApiKey = "sk_test_" + Math.random().toString(36).substring(2, 15)
      setApiKey(newApiKey)

      toast({
        title: "API ключ обновлен",
        description: "Новый API ключ успешно сгенерирован",
      })
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сгенерировать новый API ключ",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-1">
        <h1 className="text-3xl font-bold">Настройки</h1>
        <p className="text-muted-foreground">Настройки приложения SellZilla</p>
      </div>

      <Tabs defaultValue="telegram" className="space-y-6">
        <TabsList>
          <TabsTrigger value="telegram">Telegram</TabsTrigger>
          <TabsTrigger value="export">Экспорт данных</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="telegram">
          <Card>
            <CardHeader>
              <CardTitle>Настройки Telegram</CardTitle>
              <CardDescription>Настройте интеграцию с Telegram для получения уведомлений</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Включить Telegram уведомления</p>
                  <p className="text-sm text-muted-foreground">Получать уведомления в Telegram</p>
                </div>
                <Switch checked={telegramEnabled} onCheckedChange={setTelegramEnabled} />
              </div>

              {telegramEnabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="telegram-token">Токен бота</Label>
                    <Input
                      id="telegram-token"
                      value={telegramToken}
                      onChange={(e) => setTelegramToken(e.target.value)}
                      placeholder="1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                    />
                    <p className="text-sm text-muted-foreground">Токен бота, полученный от @BotFather</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telegram-chat-id">ID чата</Label>
                    <Input
                      id="telegram-chat-id"
                      value={telegramChatId}
                      onChange={(e) => setTelegramChatId(e.target.value)}
                      placeholder="123456789"
                    />
                    <p className="text-sm text-muted-foreground">ID чата или группы для отправки уведомлений</p>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={saveTelegramSettings} disabled={isLoading}>
                {isLoading ? "Сохранение..." : "Сохранить настройки"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle>Настройки экспорта данных</CardTitle>
              <CardDescription>Настройте автоматический экспорт данных</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Автоматический экспорт</p>
                  <p className="text-sm text-muted-foreground">Автоматически экспортировать данные каждую неделю</p>
                </div>
                <Switch checked={autoExport} onCheckedChange={setAutoExport} />
              </div>

              {autoExport && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="export-format">Формат экспорта</Label>
                    <Select value={exportFormat} onValueChange={setExportFormat}>
                      <SelectTrigger id="export-format">
                        <SelectValue placeholder="Выберите формат" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="export-email">Email для отправки</Label>
                    <Input
                      id="export-email"
                      type="email"
                      value={exportEmail}
                      onChange={(e) => setExportEmail(e.target.value)}
                      placeholder="example@mail.ru"
                    />
                    <p className="text-sm text-muted-foreground">
                      Email, на который будут отправляться экспортированные данные
                    </p>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={saveExportSettings} disabled={isLoading}>
                {isLoading ? "Сохранение..." : "Сохранить настройки"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Экспорт запущен",
                    description: "Экспорт данных запущен. Файл будет отправлен на указанный email.",
                  })
                }}
              >
                Экспортировать сейчас
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>Настройки API</CardTitle>
              <CardDescription>Управление API ключами для доступа к данным</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API ключ</Label>
                <div className="flex space-x-2">
                  <Input id="api-key" value={apiKey} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(apiKey)
                      toast({
                        title: "Скопировано",
                        description: "API ключ скопирован в буфер обмена",
                      })
                    }}
                  >
                    Копировать
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Используйте этот ключ для доступа к API SellZilla</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={regenerateApiKey} disabled={isLoading}>
                {isLoading ? "Генерация..." : "Сгенерировать новый ключ"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
