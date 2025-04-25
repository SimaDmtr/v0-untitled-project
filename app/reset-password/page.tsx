import Link from "next/link"
import type { Metadata } from "next"

import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export const metadata: Metadata = {
  title: "Восстановление пароля - SellZilla",
  description: "Восстановите доступ к вашему аккаунту SellZilla",
}

export default function ResetPasswordPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Восстановление пароля</h1>
          <p className="text-sm text-muted-foreground">Введите email для восстановления доступа</p>
        </div>
        <ResetPasswordForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/login" className="underline underline-offset-4 hover:text-primary">
            Вернуться к входу
          </Link>
        </p>
      </div>
    </div>
  )
}
