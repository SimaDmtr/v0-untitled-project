"use client"

import { useState } from "react"
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
})

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Здесь будет логика отправки ссылки для сброса пароля
      console.log(values)

      setIsSubmitted(true)

      toast({
        title: "Ссылка отправлена",
        description: "Проверьте ваш email для восстановления пароля",
      })
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Что-то пошло не так. Пожалуйста, попробуйте снова.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-medium">Проверьте ваш email</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Мы отправили ссылку для восстановления пароля на указанный email.
          </p>
        </div>
        <Button onClick={() => setIsSubmitted(false)} variant="outline" className="w-full">
          Отправить повторно
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Отправка..." : "Отправить ссылку для восстановления"}
        </Button>
      </form>
    </Form>
  )
}
