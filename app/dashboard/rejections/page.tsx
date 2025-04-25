import type { Metadata } from "next"
import RejectionsClientPage from "./RejectionsClientPage"

export const metadata: Metadata = {
  title: "Отказы - SellZilla",
  description: "Анализ отказов от заказов",
}

export default function RejectionsPage() {
  return <RejectionsClientPage />
}
