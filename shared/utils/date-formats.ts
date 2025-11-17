export const dayMonthYearFormat = (date: Date) => {
  return date.toLocaleString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const longDateTimeFormat = (value: string | Date) => {
  const dateInstance = value instanceof Date ? value : new Date(value);

  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'long',
    timeStyle: 'short',
    hour12: true,
  }).format(dateInstance);
};
