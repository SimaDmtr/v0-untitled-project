"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HelpCircle } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import { useAppContext } from "@/lib/context/app-context"

const formSchema = z.object({
  cookie: z.string().min(10, {
    message: "Кука должна содержать минимум 10 символов",
  }),
  apiKey: z.string().min(10, {
    message: "API ключ должен содержать минимум 10 символов",
  }),
})

export function AddAccountForm() {
  const router = useRouter()
  const { addAccount } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  const [accountInfo, setAccountInfo] = useState<{
    name: string
    shopName: string
    inn: string
  } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cookie: "",
      apiKey: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Имитация получения данных аккаунта
      // В реальном приложении здесь будет запрос к API
      setTimeout(() => {
        setAccountInfo({
          name: "ООО Компания",
          shopName: "BrandShop",
          inn: "1234567890",
        })
      }, 1000)

      toast({
        title: "Данные проверены",
        description: "Информация об аккаунте получена успешно",
      })
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось получить информацию об аккаунте",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function saveAccount() {
    setIsLoading(true)

    try {
      // Добавляем аккаунт в контекст
      addAccount({
        name: accountInfo!.name,
        shopName: accountInfo!.shopName,
        inn: accountInfo!.inn,
        cookieStatus: true,
        apiStatus: true,
      })

      router.push("/dashboard/accounts")
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить аккаунт",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="cookie"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Cookie Wildberries
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Для получения cookie войдите в личный кабинет Wildberries, откройте инструменты разработчика
                          (F12), перейдите во вкладку Application &gt; Cookies и скопируйте значение cookie
                          WILDAUTHNEW_V3
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Вставьте значение cookie WILDAUTHNEW_V3"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Cookie используется для авторизации в личном кабинете Wildberries</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  API ключ
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          API ключ можно получить в личном кабинете Wildberries в разделе "Настройки" &gt; "Доступ к
                          API"
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Введите API ключ" {...field} />
                </FormControl>
                <FormDescription>API ключ используется для доступа к API Wildberries</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading || !!accountInfo}>
            {isLoading ? "Проверка..." : "Проверить данные"}
          </Button>
        </form>
      </Form>

      {accountInfo && (
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 font-medium">Информация об аккаунте</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">Название компании:</div>
              <div className="text-sm font-medium">{accountInfo.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">Название магазина:</div>
              <div className="text-sm font-medium">{accountInfo.shopName}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">ИНН:</div>
              <div className="text-sm font-medium">{accountInfo.inn}</div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={saveAccount} disabled={isLoading}>
              {isLoading ? "Сохранение..." : "Сохранить аккаунт"}
            </Button>
            <Button variant="outline" onClick={() => setAccountInfo(null)} disabled={isLoading}>
              Отмена
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
