export const GetYear = (release_date: string) => {
  return release_date ? release_date.split('-')[0] : 'N/A';
};
