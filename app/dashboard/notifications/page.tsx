import type { Metadata } from "next"
import NotificationsClientPage from "./NotificationsClientPage"

export const metadata: Metadata = {
  title: "Уведомления - SellZilla",
  description: "Уведомления о новых отзывах и лайках",
}

export default function NotificationsPage() {
  return <NotificationsClientPage />
}
