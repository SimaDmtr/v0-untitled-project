import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AddAccountForm } from "@/components/accounts/add-account-form"

export const metadata: Metadata = {
  title: "Добавление аккаунта - SellZilla",
  description: "Добавление нового аккаунта Wildberries",
}

export default function AddAccountPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/dashboard/accounts">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Добавление аккаунта</h1>
          <p className="text-muted-foreground">Подключите новый аккаунт Wildberries</p>
        </div>
      </div>
      <div className="mx-auto max-w-2xl">
        <AddAccountForm />
      </div>
    </div>
  )
}
