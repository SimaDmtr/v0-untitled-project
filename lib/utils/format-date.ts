export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  // Форматирование даты в формате "DD.MM.YYYY HH:MM"
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")

  return `${day}.${month}.${year} ${hours}:${minutes}`
}
