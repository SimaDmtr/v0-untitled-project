import type { Metadata } from "next"
import SettingsClientPage from "./SettingsClientPage"

export const metadata: Metadata = {
  title: "Настройки - SellZilla",
  description: "Настройки приложения SellZilla",
}

export default function SettingsPage() {
  return <SettingsClientPage />
}
