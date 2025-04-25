import type { Metadata } from "next"
import AccountsClientPage from "./AccountsClientPage"

export const metadata: Metadata = {
  title: "Аккаунты WB - SellZilla",
  description: "Управление аккаунтами Wildberries",
}

export default function AccountsPage() {
  return <AccountsClientPage />
}
