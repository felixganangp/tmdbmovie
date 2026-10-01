export const GetYear = (release_date: string) => {
  return release_date ? release_date.split('-')[0] : 'N/A';
};

export const StringToSlug = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const FormatDateIndo = (
  dateInput: string | Date | number,
  locale: string = 'id-ID',
  options: Intl.DateTimeFormatOptions = {},
): string => {
  if (!dateInput) return '';

  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    return 'Tanggal tidak valid';
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat(locale, defaultOptions).format(date);
};
