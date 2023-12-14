export default function formatDate (inputDate: string) {
  const date = new Date(inputDate)

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date)

  return formattedDate
}
