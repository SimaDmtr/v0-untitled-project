import type { Metadata } from "next"
import ProfileClientPage from "./ProfileClientPage"

export const metadata: Metadata = {
  title: "Профиль - SellZilla",
  description: "Управление профилем пользователя",
}

export default function ProfilePage() {
  return <ProfileClientPage />
}
