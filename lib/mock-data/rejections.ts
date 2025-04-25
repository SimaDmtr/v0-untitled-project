export interface Rejection {
  id: string
  date: string
  articleId: string
  productName: string
  brand: string
  account: string
  orderAmount: number
  reason: string
  userName: string
}

export const mockRejections: Rejection[] = [
  {
    id: "1",
    date: "2023-10-15T14:30:00Z",
    articleId: "12345678",
    productName: "Футболка хлопковая",
    brand: "BrandName",
    account: "FashionStyle",
    orderAmount: 1200,
    reason: "Не подошел размер",
    userName: "Алексей",
  },
  {
    id: "2",
    date: "2023-10-14T10:15:00Z",
    articleId: "87654321",
    productName: "Джинсы классические",
    brand: "JeansBrand",
    account: "IvanovShop",
    orderAmount: 2500,
    reason: "Не соответствует описанию",
    userName: "Мария",
  },
  {
    id: "3",
    date: "2023-10-13T16:45:00Z",
    articleId: "23456789",
    productName: "Кроссовки спортивные",
    brand: "SportShoes",
    account: "FashionStyle",
    orderAmount: 3800,
    reason: "Передумал",
    userName: "Иван",
  },
  {
    id: "4",
    date: "2023-10-12T09:20:00Z",
    articleId: "34567890",
    productName: "Платье вечернее",
    brand: "ElegantDress",
    account: "TextilePlus",
    orderAmount: 4500,
    reason: "Брак",
    userName: "Екатерина",
  },
  {
    id: "5",
    date: "2023-10-11T13:10:00Z",
    articleId: "45678901",
    productName: "Куртка зимняя",
    brand: "WinterStyle",
    account: "KidsWorld",
    orderAmount: 5900,
    reason: "Не подошел цвет",
    userName: "Дмитрий",
  },
  {
    id: "6",
    date: "2023-10-10T15:30:00Z",
    articleId: "56789012",
    productName: "Рубашка офисная",
    brand: "OfficeLook",
    account: "PetrovMarket",
    orderAmount: 1800,
    reason: "Не подошел размер",
    userName: "Ольга",
  },
  {
    id: "7",
    date: "2023-10-09T11:45:00Z",
    articleId: "67890123",
    productName: "Шапка вязаная",
    brand: "WarmHats",
    account: "KidsWorld",
    orderAmount: 800,
    reason: "Передумал",
    userName: "Сергей",
  },
  {
    id: "8",
    date: "2023-10-08T14:20:00Z",
    articleId: "78901234",
    productName: "Свитер шерстяной",
    brand: "WoolMaster",
    account: "TextilePlus",
    orderAmount: 2200,
    reason: "Не соответствует описанию",
    userName: "Анна",
  },
  {
    id: "9",
    date: "2023-10-07T10:10:00Z",
    articleId: "89012345",
    productName: "Пальто демисезонное",
    brand: "SeasonStyle",
    account: "FashionStyle",
    orderAmount: 6500,
    reason: "Не подошел размер",
    userName: "Наталья",
  },
  {
    id: "10",
    date: "2023-10-06T16:30:00Z",
    articleId: "90123456",
    productName: "Сумка кожаная",
    brand: "LeatherBags",
    account: "IvanovShop",
    orderAmount: 3200,
    reason: "Брак",
    userName: "Владимир",
  },
]
