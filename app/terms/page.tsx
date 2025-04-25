import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Оферта - SellZilla",
  description: "Условия использования сервиса SellZilla",
}

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Оферта</h1>
        <p className="text-muted-foreground">Условия использования сервиса SellZilla</p>
      </div>
      <div className="mt-8 space-y-6">
        <p>Здесь будет размещен текст оферты. Пожалуйста, предоставьте текст для размещения.</p>
        {/* Здесь будет текст оферты */}
      </div>
      <div className="mt-8">
        <Link href="/">
          <Button variant="outline">Вернуться на главную</Button>
        </Link>
      </div>
    </div>
  )
}
