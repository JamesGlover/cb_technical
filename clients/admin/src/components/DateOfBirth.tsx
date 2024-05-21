function DateOfBirth({date} : {date: string}) {
  const human_readable = new Date(date).toLocaleDateString()
  return <time dateTime={date}>{human_readable}</time>
}

export default DateOfBirth
