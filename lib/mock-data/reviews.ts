export interface Review {
  id: string
  date: string
  rating: number
  text: string
  articleId: string
  productName: string
  brand: string
  account: string
  orderAmount: number
  status: "purchase" | "refusal" | "return"
  userName: string
  contacts: {
    wb: string
    telegram?: string
    whatsapp?: string
    viber?: string
  }
}

export const mockReviews: Review[] = [
  {
    id: "1",
    date: "2023-10-15T14:30:00Z",
    rating: 5,
    text: "Отличный товар! Качество на высоте, доставка быстрая. Буду заказывать еще.",
    articleId: "12345678",
    productName: "Футболка хлопковая",
    brand: "BrandName",
    account: "FashionStyle",
    orderAmount: 1200,
    status: "purchase",
    userName: "Алексей",
    contacts: {
      wb: "user123",
      telegram: "@user123",
    },
  },
  {
    id: "2",
    date: "2023-10-14T10:15:00Z",
    rating: 2,
    text: "Качество не соответствует описанию. Ткань тонкая, швы кривые. Очень разочарован.",
    articleId: "87654321",
    productName: "Джинсы классические",
    brand: "JeansBrand",
    account: "IvanovShop",
    orderAmount: 2500,
    status: "return",
    userName: "Мария",
    contacts: {
      wb: "user456",
      whatsapp: "+79001234567",
    },
  },
  {
    id: "3",
    date: "2023-10-13T16:45:00Z",
    rating: 4,
    text: "В целом хороший товар, но есть небольшие недочеты. Размер немного меньше заявленного.",
    articleId: "23456789",
    productName: "Кроссовки спортивные",
    brand: "SportShoes",
    account: "FashionStyle",
    orderAmount: 3800,
    status: "purchase",
    userName: "Иван",
    contacts: {
      wb: "user789",
      viber: "+79007654321",
    },
  },
  {
    id: "4",
    date: "2023-10-12T09:20:00Z",
    rating: 1,
    text: "Ужасное качество! Товар пришел с дефектами, цвет не соответствует фото. Не рекомендую!",
    articleId: "34567890",
    productName: "Платье вечернее",
    brand: "ElegantDress",
    account: "TextilePlus",
    orderAmount: 4500,
    status: "return",
    userName: "Екатерина",
    contacts: {
      wb: "user101",
      telegram: "@user101",
      whatsapp: "+79009876543",
    },
  },
  {
    id: "5",
    date: "2023-10-11T13:10:00Z",
    rating: 5,
    text: "Прекрасный товар! Все как на фото, качество отличное. Доставка быстрая.",
    articleId: "45678901",
    productName: "Куртка зимняя",
    brand: "WinterStyle",
    account: "KidsWorld",
    orderAmount: 5900,
    status: "purchase",
    userName: "Дмитрий",
    contacts: {
      wb: "user202",
    },
  },
  {
    id: "6",
    date: "2023-10-10T15:30:00Z",
    rating: 3,
    text: "Средний товар. Не плохой, но и не отличный. Есть некоторые недостатки в качестве пошива.",
    articleId: "56789012",
    productName: "Рубашка офисная",
    brand: "OfficeLook",
    account: "PetrovMarket",
    orderAmount: 1800,
    status: "purchase",
    userName: "Ольга",
    contacts: {
      wb: "user303",
      viber: "+79005554433",
    },
  },
  {
    id: "7",
    date: "2023-10-09T11:45:00Z",
    rating: 4,
    text: "Хороший товар за свои деньги. Соответствует описанию.",
    articleId: "67890123",
    productName: "Шапка вязаная",
    brand: "WarmHats",
    account: "KidsWorld",
    orderAmount: 800,
    status: "purchase",
    userName: "Сергей",
    contacts: {
      wb: "user404",
    },
  },
  {
    id: "8",
    date: "2023-10-08T14:20:00Z",
    rating: 2,
    text: "Не понравилось качество материала. Быстро появились катышки после первой стирки.",
    articleId: "78901234",
    productName: "Свитер шерстяной",
    brand: "WoolMaster",
    account: "TextilePlus",
    orderAmount: 2200,
    status: "refusal",
    userName: "Анна",
    contacts: {
      wb: "user505",
      telegram: "@user505",
    },
  },
  {
    id: "9",
    date: "2023-10-07T10:10:00Z",
    rating: 5,
    text: "Отличный товар! Рекомендую всем. Качество супер, цена радует.",
    articleId: "89012345",
    productName: "Пальто демисезонное",
    brand: "SeasonStyle",
    account: "FashionStyle",
    orderAmount: 6500,
    status: "purchase",
    userName: "Наталья",
    contacts: {
      wb: "user606",
      whatsapp: "+79003332211",
    },
  },
  {
    id: "10",
    date: "2023-10-06T16:30:00Z",
    rating: 1,
    text: "Полное разочарование. Товар не соответствует описанию. Верну обратно.",
    articleId: "90123456",
    productName: "Сумка кожаная",
    brand: "LeatherBags",
    account: "IvanovShop",
    orderAmount: 3200,
    status: "return",
    userName: "Владимир",
    contacts: {
      wb: "user707",
      telegram: "@user707",
      viber: "+79001112233",
    },
  },
]
