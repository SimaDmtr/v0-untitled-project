"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Имя должно содержать минимум 2 символа",
  }),
  email: z.string().email({
    message: "Пожалуйста, введите корректный email",
  }),
  company: z.string().optional(),
  phone: z.string().optional(),
})

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Пароль должен содержать минимум 8 символов",
    }),
    newPassword: z.string().min(8, {
      message: "Пароль должен содержать минимум 8 символов",
    }),
    confirmPassword: z.string().min(8, {
      message: "Пароль должен содержать минимум 8 символов",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  })

export default function ProfileClientPage() {
  const [isLoading, setIsLoading] = useState(false)

  // Настройки уведомлений
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [telegramNotifications, setTelegramNotifications] = useState(false)
  const [reviewNotifications, setReviewNotifications] = useState(true)
  const [likeNotifications, setLikeNotifications] = useState(true)
  const [systemNotifications, setSystemNotifications] = useState(true)

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Иван Иванов",
      email: "ivan@example.com",
      company: "ООО Компания",
      phone: "+7 (999) 123-45-67",
    },
  })

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  async function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    setIsLoading(true)

    try {
      // Имитация сохранения данных
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Профиль обновлен",
        description: "Ваши данные успешно сохранены",
      })
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить данные профиля",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function onPasswordSubmit(values: z.infer<typeof passwordFormSchema>) {
    setIsLoading(true)

    try {
      // Имитация смены пароля
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Пароль изменен",
        description: "Ваш пароль успешно изменен",
      })

      // Сбрасываем форму
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось изменить пароль",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function saveNotificationSettings() {
    setIsLoading(true)

    try {
      // Имитация сохранения настроек
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Настройки сохранены",
        description: "Настройки уведомлений успешно сохранены",
      })
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить настройки уведомлений",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-1">
        <h1 className="text-3xl font-bold">Профиль</h1>
        <p className="text-muted-foreground">Управление вашим профилем и настройками</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="password">Пароль</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Данные профиля</CardTitle>
              <CardDescription>Обновите ваши персональные данные и контактную информацию</CardDescription>
            </CardHeader>
            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Имя</FormLabel>
                        <FormControl>
                          <Input placeholder="Иван Иванов" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="ivan@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Компания</FormLabel>
                        <FormControl>
                          <Input placeholder="ООО Компания" {...field} />
                        </FormControl>
                        <FormDescription>Необязательное поле</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Телефон</FormLabel>
                        <FormControl>
                          <Input placeholder="+7 (999) 123-45-67" {...field} />
                        </FormControl>
                        <FormDescription>Необязательное поле</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Сохранение..." : "Сохранить"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Изменение пароля</CardTitle>
              <CardDescription>Измените ваш пароль для входа в систему</CardDescription>
            </CardHeader>
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Текущий пароль</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Новый пароль</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Подтверждение пароля</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Сохранение..." : "Изменить пароль"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
              <CardDescription>Настройте способы получения уведомлений и их типы</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Способы уведомлений</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email уведомления</p>
                    <p className="text-sm text-muted-foreground">Получать уведомления на email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Telegram уведомления</p>
                    <p className="text-sm text-muted-foreground">Получать уведомления в Telegram</p>
                  </div>
                  <Switch checked={telegramNotifications} onCheckedChange={setTelegramNotifications} />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Типы уведомлений</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Новые отзывы</p>
                    <p className="text-sm text-muted-foreground">Уведомления о новых отзывах на товары</p>
                  </div>
                  <Switch checked={reviewNotifications} onCheckedChange={setReviewNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Новые лайки</p>
                    <p className="text-sm text-muted-foreground">Уведомления о новых лайках на товары</p>
                  </div>
                  <Switch checked={likeNotifications} onCheckedChange={setLikeNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Системные уведомления</p>
                    <p className="text-sm text-muted-foreground">Уведомления о системных событиях и обновлениях</p>
                  </div>
                  <Switch checked={systemNotifications} onCheckedChange={setSystemNotifications} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveNotificationSettings} disabled={isLoading}>
                {isLoading ? "Сохранение..." : "Сохранить настройки"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
