"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string().email({
    message: "Пожалуйста, введите корректный email",
  }),
  password: z.string().min(1, {
    message: "Пожалуйста, введите пароль",
  }),
})

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [twoFactorCode, setTwoFactorCode] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Здесь будет логика входа
      console.log(values)

      // Имитация двухфакторной аутентификации
      setShowTwoFactor(true)

      toast({
        title: "Код подтверждения отправлен",
        description: "Проверьте ваш email",
      })
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Неверный email или пароль",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function onVerifyTwoFactor() {
    setIsLoading(true)

    try {
      // Здесь будет логика проверки кода
      console.log("Two factor code:", twoFactorCode)

      toast({
        title: "Вход выполнен успешно",
      })

      // Перенаправление на дашборд
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Неверный код подтверждения",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (showTwoFactor) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <FormLabel>Код подтверждения</FormLabel>
          <Input
            value={twoFactorCode}
            onChange={(e) => setTwoFactorCode(e.target.value)}
            placeholder="123456"
            disabled={isLoading}
          />
        </div>
        <Button onClick={onVerifyTwoFactor} className="w-full" disabled={isLoading || !twoFactorCode}>
          {isLoading ? "Проверка..." : "Подтвердить"}
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@mail.ru" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Вход..." : "Войти"}
        </Button>
      </form>
    </Form>
  )
}
