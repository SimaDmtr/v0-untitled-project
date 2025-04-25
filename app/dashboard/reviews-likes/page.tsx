import type { Metadata } from "next"
import ReviewsLikesClientPage from "./ReviewsLikesClientPage"

export const metadata: Metadata = {
  title: "Отзывы и лайки - SellZilla",
  description: "Просмотр отзывов и лайков на товары",
}

export default function ReviewsLikesPage() {
  return <ReviewsLikesClientPage />
}
