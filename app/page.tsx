import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export const metadata: Metadata = {
  title: "SellZilla - Сервис аналитики отзывов для селлеров Wildberries",
  description: "Помогаем селлерам Wildberries анализировать отзывы, находить негатив и улучшать репутацию магазина",
  keywords: ["Wildberries", "отзывы", "аналитика", "селлеры", "SellZilla"],
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-primary">Sell</span>Zilla
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden gap-6 md:flex">
            <Link href="/terms" className="text-sm font-medium hover:underline">
              Оферта
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:underline">
              Цены
            </Link>
            <Link href="#contacts" className="text-sm font-medium hover:underline">
              Контакты
            </Link>
          </nav>
          <ThemeToggle />
          <Link href="/login">
            <Button variant="outline" size="sm">
              Войти
            </Button>
          </Link>
          <Link href="/register" className="hidden md:block">
            <Button size="sm">Регистрация</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="container space-y-6 py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">SellZilla</h2>
            <p className="text-xl text-muted-foreground sm:text-2xl">
              Сервис аналитики отзывов для селлеров Wildberries
            </p>
          </div>
          <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm">
              <CheckCircle className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Находим негатив</h3>
              <p className="mt-2 text-muted-foreground">
                Поможем найти, кто льёт негатив на ваши товары и быстро отреагировать
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm">
              <CheckCircle className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Удаляем плохие отзывы</h3>
              <p className="mt-2 text-muted-foreground">
                Поможем удалить плохой отзыв и улучшить репутацию вашего магазина
              </p>
            </div>
          </div>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  Зарегистрироваться
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg">
                  Войти
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section id="pricing" className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl">Тарифы</h2>
            <p className="text-muted-foreground">Выберите подходящий тариф для вашего бизнеса</p>
          </div>
          {/* Здесь будет блок с тарифами */}
        </section>
        <section id="contacts" className="container py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl">Контакты</h2>
            <p className="text-muted-foreground">Свяжитесь с нами, если у вас возникли вопросы</p>
            {/* Здесь будет контактная информация */}
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} SellZilla. Все права защищены.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Оферта
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:underline">
              Цены
            </Link>
            <Link href="#contacts" className="text-sm text-muted-foreground hover:underline">
              Контакты
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
