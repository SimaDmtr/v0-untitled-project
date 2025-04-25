import Link from "next/link"
import type { Metadata } from "next"

import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Вход - SellZilla",
  description: "Войдите в свой аккаунт SellZilla",
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Вход в аккаунт</h1>
          <p className="text-sm text-muted-foreground">Введите данные для входа</p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/reset-password" className="underline underline-offset-4 hover:text-primary">
            Забыли пароль?
          </Link>
        </p>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Нет аккаунта?{" "}
          <Link href="/register" className="underline underline-offset-4 hover:text-primary">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  )
}
