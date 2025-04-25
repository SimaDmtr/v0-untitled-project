export interface WBAccount {
  id: string
  name: string
  shopName: string
  inn: string
  cookieStatus: boolean
  apiStatus: boolean
  createdAt: string
}

export const mockAccounts: WBAccount[] = [
  {
    id: "1",
    name: "ООО Модный Стиль",
    shopName: "FashionStyle",
    inn: "7712345678",
    cookieStatus: true,
    apiStatus: true,
    createdAt: "2023-05-10T14:30:00Z",
  },
  {
    id: "2",
    name: "ИП Иванов И.И.",
    shopName: "IvanovShop",
    inn: "771234567890",
    cookieStatus: true,
    apiStatus: false,
    createdAt: "2023-06-15T09:45:00Z",
  },
  {
    id: "3",
    name: "ООО Текстиль Плюс",
    shopName: "TextilePlus",
    inn: "7709876543",
    cookieStatus: false,
    apiStatus: true,
    createdAt: "2023-07-20T11:20:00Z",
  },
  {
    id: "4",
    name: "ООО Детский Мир",
    shopName: "KidsWorld",
    inn: "7701234567",
    cookieStatus: true,
    apiStatus: true,
    createdAt: "2023-08-05T16:10:00Z",
  },
  {
    id: "5",
    name: "ИП Петров П.П.",
    shopName: "PetrovMarket",
    inn: "772345678901",
    cookieStatus: false,
    apiStatus: false,
    createdAt: "2023-09-12T13:25:00Z",
  },
]
