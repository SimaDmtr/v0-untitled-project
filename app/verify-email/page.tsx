import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Подтверждение Email - SellZilla",
  description: "Подтверждение email адреса",
}

export default function VerifyEmailPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Проверьте ваш email</h1>
          <p className="text-sm text-muted-foreground">
            Мы отправили ссылку для подтверждения на ваш email адрес. Пожалуйста, проверьте вашу почту.
          </p>
        </div>
        <div className="grid gap-2">
          <Link href="/login">
            <Button className="w-full">Вернуться к входу</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              На главную
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
