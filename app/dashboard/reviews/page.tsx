import type { Metadata } from "next"
import ReviewsClientPage from "./ReviewsClientPage"

export const metadata: Metadata = {
  title: "Отзывы - SellZilla",
  description: "Управление отзывами на товары",
}

export default function ReviewsPage() {
  return <ReviewsClientPage />
}
